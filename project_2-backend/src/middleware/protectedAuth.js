import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const restrictedProtection = asyncHandler(async (req, res, next) => {
  let token = "";
  let isAllowed = false;
  let decodedToken = null;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      if (decodedToken.role == "professor") isAllowed = true;
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }

  if (isAllowed) {
    const user = await User.findById(decodedToken.id).select("-password");
    req.user = user;
    next();
  } else {
    res.status(403);
    throw new Error("You are not allowed to do this");
  }
});

export default restrictedProtection;
