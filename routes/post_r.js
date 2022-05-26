const express = require("express");
const Posts = require("../schemas/posts");
const User = require("../schemas/user");
const router = express.Router();

/*router.get("/", (req, res) => {
    Posts.find({}).sort("-today");
    console.log(Posts.find({}).sort("today"));
    res.send("this is home page");
});*/


router.get("/", function (req, res) {
  Posts.find({}) 
    .sort("-today") 
    .exec(function (err, posts) {
      
      if (err) return res.json(err);
        res.render("posts/index", { posts: posts });
        console.log();
    });
});

router.get("/posts", async (req, res) => {
  

  const posts = await Posts.find();

  res.json({
      posts,
      
  });
    
});

router.get("/posts/:postsId", async (req, res) => {
  const { postsId } = req.params;

  const [posts] = await Posts.find({ postsId: Number(postsId) });

  res.json({
    posts,
  });
    
});

router.post("/posts", async (req, res) => {
  const { postsId, title, userId, password, thumbnailUrl, today, body } = req.body;

  const posts = await Posts.find({ postsId });

  if (posts.length) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "이미 있는 데이터입니다." });
  }

  const createdPosts = await Posts.create({
      postsId,
      title,
    userId,
    password,
    thumbnailUrl,
    today,
    body,
  });

  res.json({ posts: createdPosts });
});

router.delete("/posts/:postsId/", async (req, res) => {
  const { postsId } = req.params;

  const existsCarts = await Posts.find({ postsId: Number(postsId) });
  if (existsCarts.length) {
    await Posts.deleteOne({ postsId: Number(postsId) });
  }

  res.json({ success: true });
});

router.put("/posts/:postsId/", async (req, res) => {
    const { postsId } = req.params;
    const { title, userId, password, thumbnail, body } = req.body;
    const existsPosts = await Posts.find({ postsId: Number(postsId) });

  
  console.log(existsPosts.key(existsPosts[0]));
    
    
  if (!existsPosts.length) {
    await Posts.create({ postsId: Number(postsId) });
  } else {
    await Posts.updateMany(
      { postsId: Number(postsId) },
      { $set: { title, userId, thumbnail, body } }
    );
  }
    res.json({ seccess: true });
    
});


module.exports = router;