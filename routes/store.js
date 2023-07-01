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
router.get("/barbershop/:id", Controller.barberGetDetailData);
router.post("/barbershop", Controller.barberCreate);
router.put("/barbershop", Controller.barberUpdate);
router.delete("/barbershop", Controller.barberDelete);

router.get("/barbershop/:id/reviews", Controller.barberGetReviews);
router.post("/barbershop/reviews", Controller.barberCreateReviews);

router.get("/barbershop/:id/layanan", Controller.barberGetLayanan);
router.get("/barbershop/:id/statistik", Controller.barberGetStatistic);
router.post("/barbershop/layanan", Controller.barberCreateLayanan);

router.get("/barbershop/:id/kapster", Controller.getKapster);
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

router.get("/barbershop/:id/jadwal", Controller.getJadwalBarber);
router.post("/barbershop/jadwal", Controller.createJadwalBarber);

router.get("/barbershop/:id/photo-barber", Controller.getPhotoBarber);
router.post(
  "/barbershop/photoBarber",
  uploads.array("files"),
  Controller.createPhotoBarber
);
router.get("/barbershop/:userId/userBooking", Controller.getBookingByUser);
router.get("/barbershop/:id/booking", Controller.getBookingByBarber);
router.post("/barbershop/booking", Controller.bookingBarber);
router.put("/barbershop/booking", Controller.bookingUpdate);

module.exports = router;
