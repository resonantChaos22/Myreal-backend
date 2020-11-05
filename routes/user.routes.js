const express = require("express");
const router = express.Router();
const verify = require("../functions/verifyFunc");

const user = require("../controllers/user_management");

router.post("/add", user.crud.add);
router.get("/all", user.crud.getAll);
router.get("/", user.crud.get);
router.put("/update", user.crud.update);
router.delete("/delete", user.crud.delete);

module.exports = router;
