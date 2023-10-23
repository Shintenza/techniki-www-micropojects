import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

const postRegister = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  if (!firstName || !lastName || !username || !password) {
    res.status(400);
    throw new Error("Missing register data");
  }

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("User with given username already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    lastName,
    role: "student",
    username,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      role: user.role,
      token: generateToken(user.id, user.role),
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

const postLogin = asyncHandler(async (req, res)=> {
  const {username, password}  = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("Missing login credentials");
  }

  const user = await User.findOne({username});
  
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      role: user.role,
      token: generateToken(user.id, user.role),
    })
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
})

export { postRegister, postLogin };
