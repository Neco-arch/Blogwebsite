require("dotenv").config();
const { prismacontroller } = require("../lib/prisma");

async function VistBlogpanel(req, res) {
  res.json({ message: "Welcome back owner" });
}

async function Createpost(req, res) {
  try {
    const { username, userid, title, content } = req.body;

    if (!username || !userid || !title || !content) {
      return res.status(400).json({ message: "Body request is incomplete or missing" });
    }

    if (isNaN(parseInt(userid))) {
      return res.status(400).json({ message: "userid must be a number" });
    }

    const finduserid = await prismacontroller.user.findFirst({
      where: { Userid: userid },
    });

    if (!finduserid) {
      return res.status(404).json({ message: "User not found" });
    }

    const duplicate = await prismacontroller.post.findFirst({
      where: { title: title },
    });

    if (duplicate) {
      return res.status(409).json({ message: "A post with this title already exists" });
    }

    const result = await prismacontroller.post.create({
      data: {
        author: username,
        title: title,
        poststatus: "draft",
        content: content,
        user: {
          connect: { Userid: userid },
        },
      },
    });

    return res.status(201).json({ data: result });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create post" });
  }
}

async function editPost(req, res) {
  try {
    const { postid } = req.params;
    const { newtitle, newcontent } = req.body;

    // Validation
    if (!postid) {
      return res.status(400).json({ message: "Post ID is missing" });
    }

    const convertedPostId = parseInt(postid);
    if (isNaN(convertedPostId)) {
      return res.status(400).json({ message: "Post ID must be a number" });
    }

    if (!newtitle && !newcontent) {
      return res.status(400).json({ message: "No updates provided" });
    }

    const data = {};
    if (newtitle) data.title = newtitle;
    if (newcontent) data.content = newcontent;

    const result = await prismacontroller.post.update({
      where: { postid: convertedPostId },
      data,
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

    if (postid === undefined) {
      res.json("Post id is missing");
    }

    if (typeof parseInt(postid) !== "number") {
      res.json("Post id isn't a number");
    }

    const converted = parseInt(postid);

    await prismacontroller.post.delete({
      where: { postid: converted },
    });

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to delete post" });
  }
}

async function ReleasePost(req, res) {
  try {
    const { postid } = req.params;

    if (postid === undefined) {
      res.json("Post id is missing");
    }

    if (typeof parseInt(postid) !== "number") {
      res.json("Post id isn't a number");
    }

    const converted = parseInt(postid);

    await prismacontroller.post.update({
      where: { postid: converted },
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
  editPost,
  Deletepost,
  ReleasePost,
  VistBlogpanel,
};
