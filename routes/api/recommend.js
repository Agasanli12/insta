const express= require('express');
const router=express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

router.get('/', auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({user: req.user.id}); 
      console.log(profile.followings);
      const recommendedprofiles=[];
      for(let i=0;i<profile.followings.length;i++){
        const followedprofile = await Profile.findOne({user: profile.followings[i]._id});
        const user = await User.findOne({ _id: followedprofile.user});
        const description = "followed by " + user.name
        //console.log(followedprofile,user,description);
        for(let j=0;j<followedprofile.followings.length;j++){
            //console.log(followedprofile.followings[j]._id,req.user.id);
            if(followedprofile.followings[j]._id.toString() !== req.user.id){
                const recommendedprofile = await Profile.findOne({ user: followedprofile.followings[j]._id })
                if(!profile.followings.some((f)=> f._id == recommendedprofile.user.toString())){
                  const suggesteduser = await User.findById(recommendedprofile.user)
                  recommendedprofiles.push({profile: recommendedprofile,description: description,user:suggesteduser})
                }
            }
        }
      }
      res.json(recommendedprofiles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports =router;