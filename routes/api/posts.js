const express= require('express');
const router=express.Router();
const bodyParser= require('body-parser');
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const request = require('request');
const rest = require('restler');
const {parse, stringify} = require('flatted');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json({ extended: true }));

const Post = require('../../models/Post');
const User = require('../../models/User');
const Tag = require('../../models/Tag');
const Profile = require('../../models/Profile');

let c =0 ;
let d =0 ;
let Token = '';

//const getApiAndEmit = socket => {
//  const response = new Date();
  // Emitting a new message. Will be consumed by the client
//  socket.emit("FromAPI", response);
//};

router.post('/',upload.single('image'), [auth, [check('text', 'Text is required').not().isEmpty()]],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');
    const profile = await Profile.findOne({user: req.user.id});
    const newtags=req.body.tags.split(' ').map(tag=> tag.trim());
    const allTags = await Tag.find();
    const image = {};
    console.log(req.file);
    image.data = req.file.buffer;
    image.contentType = "image/jpg";
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
      tags: newtags,
      image: image   
    });
    profile.posts.push(newPost);
    profile.save();
    console.log(allTags);
    for (let tag of newtags){
      if(allTags.length == 0){
        let newTag = new Tag({ name: tag , tag: newPost});
        //newTag.push({ name: tag , tag: newPost});
        await newTag.save();
      }else{
        let i=allTags.findIndex( t => t.name == tag);
        console.log(i);
        let TAG;
        if(i !== -1){
          TAG = await Tag.findOne({name: tag});
          console.log(TAG);
          TAG.tag.push(newPost);
          await TAG.save();
        }else{
          TAG = new Tag({name: tag, tag: newPost});
          //TAG.tags.push({name: tag, tag: newPost});
          await TAG.save();
        }

      }
    }

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);


router.get('/', auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({user: req.user.id});
      const token = req.headers['x-auth-token'];
      console.log(token);
      if( token !== Token){
        Token=token;
        c=0;
      }
      console.log(Token);
      //console.log(profile);
      profollowings= [];
      for(let k=0;k<profile.followings.length;k++){
        profollowings.push(profile.followings[k]);
      }
      //console.log(profollowings)
      const lengthofposts = await Post.find({user : {$in : [...profile.followings]}}).sort({date:-1}).select('id');
      const posts = await Post.find({user : {$in : [...profile.followings]}}).skip(c).limit(3).sort({date:-1});
      let l = lengthofposts.length;
      console.log("c="+c);
      if(d !== l){
        console.log(4);
        d=l;
        c=0
      }
      if(c <= d ){
        c=c+3;
      }
      console.log("d="+d,lengthofposts);
      //const posts = await Post.find().sort({date:-1});
      console.log(1,posts.length);
      const followingsposts= [];
        //console.log(posts[6].user._id,profile.followings[0]._id)
        for(let i=0;i<posts.length;i++){
          const followingspost = [];
          followingspost.push(posts[i]);              
          const user = await User.findById(posts[i].user._id);
          const profile = await Profile.findOne({user: posts[i].user._id});
          followingspost.push(user);
          followingspost.push(profile);           
          followingsposts.push(followingspost)
          //console.log(2);
         
          
        }
      console.log(3);
      res.json(followingsposts);


      //<------------------------------------------------------------------------->

     
     
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


router.get('/:id',auth , async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' })
      }
  
      res.json(post);
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  }
);

router.delete('/:id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
  
      // Check user
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      await post.remove();
  
      res.json({ msg: 'Post removed' });
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  }
);

router.put('/like/:id', auth , async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const profile = await Profile.findOne({user: post.user._id.toString()})

    // Check if the post has already been liked
    if (post.likes.some(like => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    const user = await User.findById(req.user.id)
    console.log(user);
    newlike={
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    }

    post.likes.unshift(newlike);
    profile.activities.unshift({user: user,activity_type:'like',postid:post._id.toString()})

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);

router.put('/unlike/:id', auth , async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has not yet been liked
    if (!post.likes.some(like => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // remove the like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);

router.post(
  '/comment/:id',
  [
    auth,
    [check('text', 'Text is required').not().isEmpty()]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);
      const profile = await Profile.findOne({user: post.user._id.toString()})
      console.log(profile);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);
      profile.activities.unshift({user: user,activity_type:'comment',postid:post._id.toString()})

      await post.save();
      await profile.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
}
);

router.put('/like/:id/:comment_id', auth , async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    let i;
    for(i=0;i<post.comments.length;i++){
      if(post.comments[i]._id == req.params.comment_id){
        console.log(post.comments[i]._id,post.comments[i]._id)
        break;
      }
    }
    console.log(post.comments[0].likes,i);
    

    // Check if the post has already been liked
    if (post.comments[i].likes.some(like => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Comment already liked' });
    }
    const user = await User.findById(req.user.id)
    newlike={
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    }
    //console.log(newlike);

    post.comments[i].likes.unshift(newlike);
    //console.log(post.comments[i].likes[0])

    await post.save();

    return res.json(post.comments[i].likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);

router.put('/unlike/:id/:comment_id', auth , async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    let i;
    for(i=0;i<post.comments.length;i++){
      if(post.comments[i]._id == req.params.comment_id){
        //console.log(post.comments[i]._id,post.comments[i]._id)
        break;
      }
    }

    // Check if the post has not yet been liked
    if (!post.comments[i].likes.some(like => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // remove the like
    post.comments[i].likes = post.comments[i].likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await post.save();

    return res.json(post.comments[i].likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);

router.post(
  '/comment/:id/:comment_id',
  [
    auth,
    [check('text', 'Text is required').not().isEmpty()]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };
      let i;
      for(i=0;i<post.comments.length;i++){
        if(post.comments[i]._id == req.params.comment_id){
          break;
        }
      }

      post.comments[i].comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.delete('/comment/:id/:comment1_id/:comment2_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //console.log(post.comments,req.params.comment1_id);

    // Pull out comment index
    let j = post.comments.findIndex(
      comment => 
      comment._id==req.params.comment1_id
    ); 
    //console.log(j);
    // Make sure comment exists
    if (j == -1) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    //console.log(post.comments[j].comments[0]);
    
    const comment = post.comments[j].comments.find(
      comment => comment._id==req.params.comment2_id
    );
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    //console.log(comment,req.user.id);
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    //console.log(post.comments[j]);

    let i = post.comments[j].comments.findIndex(
      comment => 
      comment.id==req.params.comment2_id
    );
    if (i == -1) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    post.comments[j].comments = post.comments[j].comments.filter(
      ({ id }) => id !== req.params.comment2_id
    );

    await post.save();

    return res.json(post.comments[i].comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
}
);

router.put('/like/:id/:comment1_id/:comment2_id', auth , async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    let i;
    for(i=0;i<post.comments.length;i++){
      if(post.comments[i]._id == req.params.comment1_id){
        break;
      }
    }
    const comment= post.comments.find( comment=> comment._id == req.params.comment1_id);
    //console.log(post.comments[0].likes,i);
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    const comment2= comment.comments.find( comment => comment._id == req.params.comment2_id );
    if (!comment2) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    let j;
    for(j=0;j<post.comments[i].comments.length;j++){
      if(post.comments[i].comments[j]._id == req.params.comment2_id){
        //console.log(post.comments[i]._id,post.comments[i]._id)
        break;
      }
    }
    // Check if the post has already been liked
    if (post.comments[i].comments[j].likes.some(like => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Comment already liked' });
    }

    post.comments[i].comments[j].likes.unshift({ user: req.user.id });

    await post.save();

    return res.json(post.comments[i].comments[j].likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);

router.put('/unlike/:id/:comment1_id/:comment2_id', auth , async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    let i;
    for(i=0;i<post.comments.length;i++){
      if(post.comments[i]._id == req.params.comment1_id){
        //console.log(post.comments[i]._id,post.comments[i]._id)
        break;
      }
    }

    const comment= post.comments.find( comment=> comment._id == req.params.comment1_id);
    
    //console.log(post.comments[0].likes,i);
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    

    const comment2= comment.comments.find( comment => comment._id == req.params.comment2_id );
    if (!comment2) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    

    let j;
    for(j=0;j<post.comments[i].comments.length;j++){
      if(post.comments[i].comments[j]._id == req.params.comment2_id){
        //console.log(post.comments[i]._id,post.comments[i]._id)
        break;
      }
    }

    // Check if the post has not yet been liked
    if (!post.comments[i].comments[j].likes.some(like => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // remove the like
    post.comments[i].comments[j].likes = post.comments[i].comments[j].likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await post.save();

    return res.json(post.comments[i].comments[j].likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);




module.exports =router;