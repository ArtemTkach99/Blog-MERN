import PostModel from "../models/Post.js";

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts.map((obj) => obj.tags.flat().slice(0, 5));

    res.json(tags);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Can't get all article",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    res.json(posts);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Can't get all article",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      avatarUrl: req.body.avatarUrl,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Can't create article",
    });
  }
};

export const getArticle = async (req, res) => {
  try {
    const postsId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postsId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Can't return article",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Article undefine",
          });
        }

        res.json(doc);
      }
    );
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Can't get one article",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postsId = req.params.id;

    PostModel.findOneAndDelete(
      {
        _id: postsId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Can't delete article",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "Article undefine",
          });
        }

        res.json({ success: true });
      }
    );
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Can't delete one article",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postsId = req.params.id;

    PostModel.updateOne(
      {
        _id: postsId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Can't update article",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "Article undefine",
          });
        }

        res.json({ success: true });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Can't update one article",
    });
  }
};
