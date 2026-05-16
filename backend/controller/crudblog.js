require("dotenv").config();
const { prismacontroller } = require("../lib/prisma");

async function VistBlogpanel(req, res) {
  res.json({ message: "Welcome back owner" });
}

async function Createpost(req, res) {
  try {
    const { username, userid, title, content } = req.body;

    const duplicate = await prismacontroller.post.findUnique({
      where: { title },
    });

    if (duplicate) {
      return res.status(409).json({ message: "A post with this title already exists" });
    }

    const result = await prismacontroller.post.create({
      data: {
        author:     username,
        title:      title,
        poststatus: "draft",
        text:       content,
        user: {
          connect: { id: userid },  
        },
      },
    });

    return res.status(201).json({ data: result });

  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to create post" });
  }
}

async function Editpost(req, res) {
  try {
    const { postid, newtitle, newcontent } = req.body;

    const result = await prismacontroller.post.update({
      where: { postid },
      data: {
        title: newtitle,
        text:  newcontent,
      },
    });

    return res.status(200).json({ data: result }); 

  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to edit post" });
  }
}

async function Deletepost(req, res) {
  try {
    const { postid } = req.params; 
    await prismacontroller.post.delete({
      where: { postid },
    });

    return res.status(200).json({ message: "Post deleted successfully" }); 

  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to delete post" });
  }
}

async function ReleasePost(req, res) {
  try {
    const { postid } = req.params; // same here

    await prismacontroller.post.update({
      where: { postid },
      data: { poststatus: "publish" },
    });

    return res.status(200).json({ message: "Post published successfully" }); 

  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to release post" });
  }
}

module.exports = {
  Createpost,
  Editpost,
  Deletepost,
  ReleasePost,
  VistBlogpanel,
};