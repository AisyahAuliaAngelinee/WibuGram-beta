const router = require("express").Router();
const Controller = require("../controllers/controller");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.put("/:id", Controller.updateUser);
router.delete("/:id", Controller.deleteUser);

module.exports = router;
