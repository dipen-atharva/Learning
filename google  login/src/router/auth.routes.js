import express from "express";
import passport from "../utils/passportConfig.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", (err, user) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      return res.json({ message: "login sucessfully", user });
    });
  })(req, res, next);
});

export default router;
