require("dotenv").config();
const { prismacontroller } = require("../lib/prisma");

async function VistBlogpanel(req, res) {
  res.json("Welcome back owner" );
}



async function Createpost(req, res) {
  try {
    const reqbody = req.body;

    const vaildate = await prismacontroller.post.findUnique({
      where: {
        title: reqbody.title,
      },
    });
    if (!vaildate) {
      res.status(409);
    }

    const result = await prismacontroller.post.create({
      data: {
        author: reqbody.username,
        title: reqbody.title,
        poststatus: "draft",
        text: reqbody.content,
        user: {
          connect: reqbody.userid,
        },
      },
    });

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    res.status(400);
  }
}

async function Editpost(req, res) {
  try {
    const reqbody = req.body;
    const result = await prismacontroller.post.update({
      where: {
        postid: reqbody.postid,
      },
      data: {
        title: reqbody.newtitle,
        text: reqbody.newcontent,
      },
    });
    res.status(100).json(result);
  } catch (error) {
    res.status(400);
  }
}

async function Deletepost(req, res) {
  try {
    const reqbody = req.body;
    const result = await prismacontroller.post.delete({
      where: {
        postid: reqbody.postid,
      },
    });
  } catch (error) {
    res.status(400);
  }
}

async function ReleasePost(req, res) { 
    const reqbody = req.body;    
    const result = await prismacontroller.post.update({
      where: {
        postid: reqbody.postid,
      },
      data : {
        poststatus : 'publish'
      }
    });

    res.sendStatus(201)
}

module.exports = {
  Createpost,
  Editpost,
  Deletepost,
  ReleasePost,
  VistBlogpanel,
};
