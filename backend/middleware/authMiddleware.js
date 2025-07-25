//imports
const jwt = require("jsonwebtoken");
require("dotenv").config();

//This is a middleware function that checks if the user is authorized to access the route
const authorize = (req, res, next) => {
  try {
    //locate token in cookie
    const token =
      req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, Token not found" });
    }

    //verify if token is legit
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized, Token invalid" });
    }
    //Attach user info to request object
    // req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Authorization error:", error);
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token has expired" });
    }

    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = authorize;
