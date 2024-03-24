const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirecUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");
const listingController = require("../controllers/listings.js");

// signup
router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));

// Login

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirecUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );
router.get("/", listingController.index);

router.get("/logout", userController.logout);

module.exports = router;
