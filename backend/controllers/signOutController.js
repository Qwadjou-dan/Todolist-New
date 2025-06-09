//controller
const signOut = (req, res) => {
  try {
    res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({
        message: "Logout successful",
      });
  } catch (error) {
    res.status(500).json({
      message: "Logout error",
    });
  }
};

//exports
module.exports = signOut;
