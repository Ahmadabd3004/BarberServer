const router = require("express").Router();
const Controller = require("../controllers/userController");
const multer = require("multer");
const { dirname } = require("path");
const appDir = dirname(require.main.filename);
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, appDir + "/uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const uploads = multer({ storage: storage });
router.post("/register", Controller.userRegister);
router.post("/login", Controller.userLogin);
router.post("/user/photo", uploads.single("files"), Controller.uploadPhoto);
router.put("/userUpdate", Controller.userUpdate);
router.delete("/userDelete", Controller.userDelete);

module.exports = router;
