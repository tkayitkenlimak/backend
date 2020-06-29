let router = require("express").Router();
const personelController = require("./controllers/personelController");
const izinController = require("./controllers/izinController");
const izinHakedisController = require("./controllers/izinHakedisController");
const izinTipiController = require("./controllers/izinTipiController");
const pdfController = require("./controllers/pdfController");
const unvanController = require("./controllers/unvanController");

const { check } = require("express-validator");

var personelValidation  = new Array(
    check("isim").notEmpty().withMessage("isim boş geçilemez"),
    check("unvan").notEmpty().withMessage("ünvan boş geçilemez"),

);

router.route("/personel").get(personelController.list);
router.route("/personel").post([personelValidation], personelController.create);
router.route("/personel/:personel_id").get(personelController.getPersonelById);
router.route("/personel/:personel_id").put([personelValidation], personelController.update).delete(personelController.delete);


var izinValidation  = new Array(
    check("izinSuresi").notEmpty().withMessage("izin süresi geçilemez").isNumeric().withMessage("izin süresi numerik olmalıdır."),
    check("basTarih").notEmpty().withMessage("baş tarih boş geçilemez"),
    check("sonTarih").notEmpty().withMessage("son tarih boş geçilemez"),
    check("personelBy").notEmpty().withMessage("personel boş geçilemez"),

);

router.route("/izin").get(izinController.list).post([izinValidation],izinController.create);
router.route("/izin/:izin_id").get(izinController.getIzinById).put([izinValidation],izinController.update).delete(izinController.delete);
router.route("/izinler/:personel_id").get(izinController.listByPersonelId);



var izinHakedisValidation  = new Array(
    check("kalanIzin").notEmpty().withMessage("isim boş geçilemez").isNumeric().withMessage("izin süresi numerik olmalıdır."),
    check("personelBy").notEmpty().withMessage("personel boş geçilemez"),

);

router.route("/izinHakedis").get(izinHakedisController.list).post([izinHakedisValidation],izinHakedisController.create);
router.route("/izinHakedis/:izin_id").get(izinHakedisController.getIzinHakedisById).put([izinHakedisValidation],izinHakedisController.update).delete(izinHakedisController.delete);
router.route("/izinHakedisler/:personel_id").get(izinHakedisController.listByPersonelId);



var izinTipiValidation  = new Array(
    check("izinTip").notEmpty().withMessage("İzin tipi boş geçilemez"),
);

router.route("/izinTipi").get(izinTipiController.list).post([izinTipiValidation],izinTipiController.create);

router.route("/pdf/:izin_id").get(pdfController.list);

var unvanValidation  = new Array(
    check("unvanAd").notEmpty().withMessage("Unvan boş geçilemez"),
);

router.route("/unvan").get(unvanController.list).post([unvanValidation],unvanController.create);


module.exports = router;