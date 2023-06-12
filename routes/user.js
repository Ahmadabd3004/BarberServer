const router = require("express").Router();
const Controller = require("../controllers/userController");

router.post("/register", Controller.userRegister);
router.post("/login", Controller.userLogin);
router.put("/userUpdate", Controller.userUpdate);
router.delete("/userDelete", Controller.userDelete);

module.exports = router;
