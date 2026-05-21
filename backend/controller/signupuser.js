require('dotenv').config()
const { prismacontroller } = require("../lib/prisma.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function CreateUser(req, res) {
  const requestbody = req.body;

  if (!requestbody) {
    return res.status(400).json({ message: "No body was found" });
  }

  if (!requestbody.password || !requestbody.username || !requestbody.email) {
    return res.status(400).json({ message: "Some info is missing" });
  }

  try {
    const encryptedPassword = await bcrypt.hash(requestbody.password, 10);


    await prismacontroller.user.create({
      data: {
        username: requestbody.username,
        password: encryptedPassword,
        email: requestbody.email,
        user_status: 'vistor'
      },
    });

    return res.status(201).json({ message: "Sign up successful" });

  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: "Username or email has already been taken" });
    }
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { CreateUser };


