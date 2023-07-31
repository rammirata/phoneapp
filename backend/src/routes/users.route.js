const express = require("express");
const { body, param } = require("express-validator");
const middleware = require("../middleware");
const controllers = require("../controllers");
const router = express.Router();

router.post("/register",
  body("name").isLength({ min: 1 }).withMessage("Invalid Resource: name"),
  body("email").isEmail().withMessage("Invalid Resource: email"),
  body("password").isLength({ min: 8 }).withMessage("Invalid Resource: password"),
  middleware.validateParams,
  middleware.users.checkIsDuplicated,
  controllers.users.register
);

router.post("/login",
  body("identifier").exists().withMessage("Invalid Resource: username or email"),
  body("password").isLength({ min: 8 }).withMessage("Invalid Resource: password"),
  middleware.validateParams,
  middleware.users.getTargetUser,
  middleware.users.checkPassword,
  controllers.users.login
);

router.get("/get-target-user/:identifier",
  param("identifier").exists().withMessage("Invalid Resource: username or email"),
  middleware.auth.checkAuthenticationToken,
  middleware.users.getUser,
  middleware.users.getTargetUser,
  controllers.users.getTargetUser
);

module.exports = router;