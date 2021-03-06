const response = require("../response");
var PizZip = require("pizzip");
var Docxtemplater = require("docxtemplater");
var fs = require("fs");
var path = require("path");
var izinController = require("../controllers/izinController");
const Izin = require("../models/izin.model");



function replaceErrors(key, value) {
  if (value instanceof Error) {
    return Object.getOwnPropertyNames(value).reduce(function (error, key) {
      error[key] = value[key];
      return error;
    }, {});
  }
  return value;
}

function errorHandler(error) {
  console.log(JSON.stringify({ error: error }, replaceErrors));

  if (error.properties && error.properties.errors instanceof Array) {
    const errorMessages = error.properties.errors
      .map(function (error) {
        return error.properties.explanation;
      })
      .join("\n");
    console.log("errorMessages", errorMessages);
    // errorMessages is a humanly readable message looking like this :
    // 'The tag beginning with "foobar" is unopened'
  }
  throw error;
}

exports.list = (req, res) => {
  Izin.findById(req.params.izin_id)
    .populate("personelBy")
    .exec((err, izin1) => {
      if (err) {
        return new response(null, err).error500(res);
      }
      if (izin1) {
        //Load the docx file as a binary
        var content = fs.readFileSync(
          path.resolve(__dirname, "doc.docx"),
          "binary"
        );

        var zip = new PizZip(content);
        var doc;
        try {
          doc = new Docxtemplater(zip);
        } catch (error) {
          // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
          errorHandler(error);
        }
       // console.log(izin1);

        let ts = Date.now();
        let date_ob = new Date(ts);
        //set the templateVariables
        doc.setData({
          isim: izin1.personelBy.isim,
          bastarih: izin1.basTarih.getDate() +'/' + (izin1.basTarih.getMonth() + 1) +'/' + izin1.basTarih.getFullYear(),
          adres: izin1.adres,
          telefon: izin1.telefon,
          yetkilikisi: izin1.personelBy.yetkiliKisi,
          izinsuresi: izin1.izinSuresi,
          tarih: date_ob.getDate() +'/' + (date_ob.getMonth() + 1) +'/' + date_ob.getFullYear(),
        });

        try {
          // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
          doc.render();
        } catch (error) {
          // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
          errorHandler(error);
        }
        //console.log(__dirname);
        var buf = doc.getZip().generate({ type: "base64", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", download:true });


      
        fs.writeFileSync("result_document1.docx", buf, "base64", (error) => {
          if (error) throw error;
          console.log("Doc saved!");
        });
     

         res.download('result_document1.docx', 'report.docx');

        // var file = fs.readFile('result_document1.docx');


      //   fs.readFile('result_document1.docx', (err, data) => {
      //     if (err) res.status(500).send(err);
      //     res.contentType('application/vnd.openxmlformats-officedocument.wordprocessingml.document')
      //        .send(`data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${new Buffer.from(data).toString('base64')}`);
      // });


//  res.setHeader('Content-Length', stat.size);
// res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
// res.setHeader('Content-Disposition', 'attachment; filename=your_file_name');
// res.write(file, 'binary');
// res.end();

        // var dd = new response();
        // dd.setHeader'Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        // dd.setData(buf);
        // return dd;
      //   var ss = new response(buf, null).success(res);
      //   ss.contentType('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      // return ss;
        //return res.status(200).send(buf);
      }
    });

  };
