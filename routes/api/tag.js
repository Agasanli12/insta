const express= require('express');
const router=express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Post');
const Tag = require('../../models/Tag');

router.get('/', auth, async (req, res) => {
    try {
      const tags = await Tag.find().sort({ date: -1 });
      res.json(tags);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/:id', auth, async (req, res) => {
    try {
      const TAG = await Tag.findOne({ _id: req.params.id });
      const posts = [];
      for(let i=0;i<TAG.tag.length;i++){
          const post = await Post.findById(TAG.tag[i]);
          posts.push(post);
      }

      res.json(posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.post('/search', [ auth, [check('text', 'Text is required').not().isEmpty()]], async (req, res) => {
  try {
    const search = req.body.text;
    const tags = await Tag.find({name : new RegExp(search,'i')});
    const searchedtagposts = [];
    for(let i=0;i<tags.length;i++){
      const searchedtagpost = [];
      searchedtagpost.push(tags[i]);
      const posts = [];
      for(let j=0;j<tags[i].tag.length;j++){
        const post = await Post.findById(tags[i].tag[j]);
        posts.push(post);
      }
      searchedtagpost.push(posts);
      searchedtagposts.push(searchedtagpost);
    }
    res.json(searchedtagposts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);

module.exports =router;