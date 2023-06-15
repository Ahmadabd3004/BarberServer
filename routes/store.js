const router = require("express").Router();
const Controller = require("../controllers/storeController");
const multer = require("multer");
const { dirname } = require("path");
const path = require("path");
const fs = require("fs");
const appDir = dirname(require.main.filename);
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, appDir + "/uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
// const uploads = multer({ dest: __dirname + "/uploads" });
const uploads = multer({ storage: storage });

router.get("/barbershop", Controller.barberGetAllData);
router.post("/barbershop", Controller.barberCreate);
router.put("/barbershop", Controller.barberUpdate);
router.delete("/barbershop", Controller.barberDelete);

router.get("/barbershop/reviews", Controller.barberGetReviews);
router.post("/barbershop/reviews", Controller.barberCreateReviews);

router.get("/barbershop/layanan", Controller.barberGetLayanan);
router.post("/barbershop/layanan", Controller.barberCreateLayanan);

router.get("/barbershop/kapster", Controller.getKapster);
router.post(
  "/barbershop/kapster",
  uploads.single("files"),
  Controller.createKapster
);
router.put(
  "/barbershop/kapster",
  uploads.single("files"),
  Controller.updateKapster
);

router.get("/barbershop/jadwal", Controller.getJadwalBarber);
router.post("/barbershop/jadwal", Controller.getJadwalBarber);

router.post(
  "/barbershop/photoBarber",
  uploads.array("files"),
  Controller.createPhotoBarber
);

router.post("/barbershop/booking", Controller.bookingBarber);
router.put("/barbershop/booking", Controller.bookingUpdate);

// //joining path of directory
// const directoryPath = path.join(appDir + "/uploads");
// //passsing directoryPath and callback function
// fs.readdir(directoryPath, function (err, files) {
//   //handling error
//   if (err) {
//     return console.log("Unable to scan directory: " + err);
//   }
//   //listing all files using forEach
//   files.forEach(function (file) {
//     // Do whatever you want to do with the file
//     console.log(file);
//   });
// });

// router.get("/barbershop/kapster", (req, res) => {});

module.exports = router;
