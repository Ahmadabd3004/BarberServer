const router = require("express").Router();
const Controller = require("../controllers/storeController");
const multer = require("multer");
const upload = multer();

router.get("/barbershop", Controller.barberGetAllData);
router.post("/barbershop", Controller.barberCreate);
router.put("/barbershop", Controller.barberUpdate);
router.delete("/barbershop", Controller.barberDelete);

router.get("/barbershop/reviews", Controller.barberGetReviews);
router.post("/barbershop/reviews", Controller.barberCreateReviews);

router.get("/barbershop/layanan", Controller.barberGetLayanan);
router.post(
  "/barbershop/layanan",
  upload.array(),
  Controller.barberCreateLayanan
);

module.exports = router;
