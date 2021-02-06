const express= require('express');
const router=express.Router();
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');


let top50profiles = undefined;

router.get('/', auth, async (req, res) => {
    try {
      //const posts = await Post.find().sort({date:-1});
      console.log(1);
      let limit = 3  
      const profiles = await Profile.aggregate([
        {
          $addFields: {
            followerslength : {
              $size: "$followers"
            }
          }
        },
        {
          $sort: {
            followerslength: -1
          }},
          {$limit:  limit }, 
      ]);
      //console.log(profiles);
      if(top50profiles == undefined){
        top50profiles = profiles.slice();
      }
      console.log(top50profiles[0])
      let randomindex = Math.floor(Math.random()*(top50profiles.length));
      console.log("random="+randomindex);
      console.log(top50profiles[randomindex])
      const posts=[];
      if(top50profiles.length>0){
        if(top50profiles[randomindex].posts !== undefined ){
          
          for(let k=0;k<top50profiles[randomindex].posts.length;k++){
            let post = await Post.findById( top50profiles[randomindex].posts[k]._id);
            posts.push(post);
            console.log(post);

          }
        }
      }
      top50profiles.splice(randomindex,1);
      console.log("length="+top50profiles.length)
      if(posts.length>0){
        res.json(posts)
      }else{
        res.json([])
      }

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports =router;