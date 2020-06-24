let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require("cors");
const dotEnv = require("dotenv");
const apiRouter = require("./api-router");

dotEnv.config();
let port = process.env.port
let dbCon = process.env.cloud_mongodb_con

let app = new express();
app.use(cors());

// app.use(express.static("upload"));  //klasör dış dünyaya açıldı

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.connect(dbCon, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var con = mongoose.connection;

if (!con)
    console.log("veri tabanı bağlantısı başarısızz")
else
    console.log("veri tabanı bağlantısı başarılıııı")


app.use("/api", apiRouter); //http://localhost/api api içeren bir adres gelirse router devreye girsin

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log("node js server çalışıyor...")
})

