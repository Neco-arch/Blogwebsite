require('dotenv').config()
const { prismacontroller } = require("../lib/prisma.js");
const bcrypt = require("bcrypt");
const e = require('express');
const jwt = require("jsonwebtoken");

async function CreateUser(req, res) {
  const requestbody = req.body;

  if (req.body === undefined) {
    res.json("No body was found")
  }
  if (req.body.password === undefined || requestbody.username === undefined || requestbody.email === undefined) {
    res.json("Someinfo is missing")
  }
  const eycrptedpasword = await bcrypt.hash(req.body.password, 10);
  const vaildateEmail_User = await prismacontroller.user.findFirst({
    where: {
      username: requestbody.username,
      email: requestbody.email,
    },
  });



  if (vaildateEmail_User === null) {
    await prismacontroller.user.create({
      data: {
        username: requestbody.username,
        password: eycrptedpasword,
        email: requestbody.email,
        user_status: 'vistor',
      },

    });

    res.json("Sign up successful")
  } else {
    res.json({
      massage: "username or email has been taken",
    });
  }

}

module.exports = { CreateUser };
