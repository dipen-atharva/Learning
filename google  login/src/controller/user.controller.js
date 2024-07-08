import passport from "passport";

const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      return res.status(200).json({ message: "Logged in successfully" });
    });
  })(req, res, next);
};

const getCurrentUser = (req, res) => {
  const { user } = req;

  return res.status(200).json({
    message: "user data featch successfully",
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
};

const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
};

export { loginUser, getCurrentUser, logoutUser };
