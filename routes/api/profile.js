const express= require('express');
const auth = require('../../middleware/auth');
const router=express.Router();
const moment = require('moment')
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

router.get('/me', auth, async (req,res)=> {
    try {
      const userprofile = [];
      const profile = await Profile.findOne({
        user: req.user.id
      }).populate('user', ['name', 'avatar']);
      userprofile.push(profile);

      const posts = await Post.find({ user: req.user.id});
      userprofile.push(posts);
  
      if (!profile) {
        return res.status(400).json({ msg: 'There is no profile for this user' });
      }
  
      res.json(userprofile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    } 
  }
);
router.post('/',[
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
    const {
        location,
        website,
        bio,
        skills,
        status,
    } = req.body;
    const profilefields={};
    if(website) profilefields.website=website;
    if(location) profilefields.location=location;
    if(status) profilefields.status=status;
    if(bio) profilefields.bio=bio;
    if(skills){
        profilefields.skills=skills.split(',').map(skill=> skill.trim());
    }

    //console.log(profilefields.skills,req.user);
        //let profile = await Profile.findOne({ user: req.user.id});
      try{
        let profile = await Profile.findOne({ user: req.user.id});
        if(profile){
          profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profilefields },
          { new: true, upsert: true }
          );
          await profile.save();
          res.json(profile);
        }else{
        console.log(1);
        //profilefields.user=req.user;
        profilefields.user={};
        profilefields.user._id=req.user.id;
        profile= new Profile(profilefields);
        await profile.save();
        res.json(profile);
      }
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    




    }
);

router.get('/', async(req,res)=>{
    try {
      const profiles = await Profile.find().populate('user', ['name', 'avatar']);
      res.json(profiles);
      //res.json(1);
      //const a = [1,2,3];
      //const b = [4,5,6];
      //res.write(a.toString() + ",");
      //res.write(b.toString());
      //res.end();
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.post('/search',
  [ auth, [check('text', 'Text is required').not().isEmpty()]
  ],
 async (req,res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try{
    const search = req.body.text;
    const users = await User.find({name : new RegExp(search,'i')});
    const searchedprofiles = [];
    for(let i=0;i<users.length;i++){
      const searchedprofile = [];
      searchedprofile.push(users[i]);
      const profile = await Profile.findOne({user: users[i]._id});
      searchedprofile.push(profile);
      searchedprofiles.push(searchedprofile);
    }
    res.json(searchedprofiles);
  }catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

}                                                            
);

router.get('/user/:user_id', async(req,res)=>{
    try {
      const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);
      if(!profile) return res.status(400).json({msg:'there is no profile for this user'});
      const userprofile = [];
      userprofile.push(profile);
      const posts = await Post.find({ user: req.params.user_id});
      userprofile.push(posts);
      res.json(userprofile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
router.delete('/',auth, async(req,res)=>{
    try {
      await Profile.findOneAndRemove({user: req.user.id});
      await User.findOneAndRemove({_id: req.user.id});
      
      res.send('user deleted');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//<----------------------------------------------------------------------------------------------->

router.put('/follow/:_id',auth, async (req,res) =>{
  try{
    const followedprofile = await Profile.findById(req.params._id);
  
    const profile = await Profile.findOne( { user: req.user.id } );

    if(!profile){
      return res.status(400).json({ msg: 'you have not profile' });
    }
    if(followedprofile.private){
      followedprofile.followrequests.push(profile.user)
      followedprofile.activities.unshift({user:profile.user,activity_type:'request'})
    }else{
      profile.followings.push(followedprofile.user);
      followedprofile.followers.push(profile.user);
    }
    followedprofile.save();
    profile.save();
    res.json(profile);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

} 
);

//<-------------------------------------------------------------------------------------------------->

router.put('/confirmfollow/:_id',auth, async (req,res) =>{
  try{
    const profile = await Profile.findOne({user: req.user.id});
  
    const confirmedprofile = await Profile.findById( req.params._id  );
    console.log(confirmedprofile,profile,typeof(confirmedprofile.user),confirmedprofile.user)

    if(!profile){
      return res.status(400).json({ msg: 'you have not profile' });
    }
    if(!profile.followrequests.some((f)=>f._id == confirmedprofile.user.toString())){
      console.log("cannot find")
      res.json({})
    }else{
      profile.followers.push(confirmedprofile.user)
      console.log(1)
      profile.followrequests = profile.followrequests.filter((f)=>f.id !== confirmedprofile.user.toString());
      confirmedprofile.followings.push(profile.user)
      profile.save()
      confirmedprofile.save()
      res.json(profile)
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

} 
);

router.get('/followrequests', auth, async (req,res) =>{
  try{
    console.log(1)
    const profile = await Profile.findOne({user:req.user.id})
    const requests = []
    for(let i=0;i<profile.followrequests.length;i++){
      const request = []
      const user = await User.findById(profile.followrequests[i]._id)
      const requestprofile = await Profile.findOne({user:profile.followrequests[i]._id})
      request.push(user)
      request.push(requestprofile)
      requests.push(request)
    }
    res.json(requests)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
} 
);


router.put('/unfollow/:_id',auth, async (req,res) =>{
  try{
    const unfollowedprofile = await Profile.findById(req.params._id);
  
    const profile = await Profile.findOne( { user: req.user.id } );
    if(!unfollowedprofile){
      return res.status(400).json({ msg: 'User does not exist' });
    }

    if(!profile){
      return res.status(400).json({ msg: 'you have not profile' });
    }
    profile.followings.pop(unfollowedprofile.user);
    unfollowedprofile.followers.pop(profile.user);
    unfollowedprofile.save();
    profile.save();
    res.json(profile);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

} 
);

router.post('/direct/:_id',
  [ auth, [check('text', 'Text is required').not().isEmpty()]
  ],
 async (req,res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try{
  const profile1 = await Profile.findById(req.params._id);
  const profile2 = await Profile.findOne( { user: req.user.id } );
    if(!profile1){
      return res.status(400).json({ msg: 'User does not exist' });
    }

    if(!profile2){
      return res.status(400).json({ msg: 'you have not profile' });
    }

    let j= profile2.directs.findIndex( user => req.user.id );
    //console.log(profile2.directs[j].sendingtext)
    if(j == -1){
      profile2.directs.push({ user: profile1.user , direct: {text:req.body.text,texttype:"s"} });
      profile1.directs.push({ user: profile2.user , direct: {text:req.body.text,texttype:"r"} });
    }else{
      profile2.directs[j].direct.push({text:req.body.text,texttype:"s"});
      profile1.directs[j].direct.push({text:req.body.text,texttype:"r"});
    }
    console.log(profile1.directs,profile2.directs)
    profile1.save();
    profile2.save();
    res.json(profile2);
  }catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error'); 
  }

} 
);

router.put('/private/:id', auth , async(req,res) => {
  try{
    const profile = await Profile.findById(req.params.id);

    const boolvalue= profile.private;
    profile.private= !boolvalue
    await profile.save();
    res.json(profile);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);

router.get('/followers', auth , async(req,res) => {
  try{
    const profile = await Profile.findOne({user: req.user.id});
    const followedusers= [];
    for(let i=0;i<profile.followers.length;i++){
      const user = await User.findOne({_id : profile.followers[i]._id});
      followedusers.push(user);
    }
    res.json(followedusers);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);

router.post('/followers/', auth , async(req,res) => {
  try{
    const profile = await Profile.findOne({user: req.user.id});
    const regex = new RegExp(req.body.text)
    const users = [];
    const requiredusers = [];
    for(let i=0;i<profile.followings.length;i++){
      const user = await User.findById(profile.followings[i]._id);
      const userdetails ={}
      userdetails.name=user.name;
      userdetails.avatar=user.avatar;
      users.push(userdetails);
    }
    console.log(users);
    for(let j=0;j<users.length;j++){
      if(users[j].name.match(regex)){
        requiredusers.push(users[j]);
      }
    }
    //var followedusersregex = users.filter(function(pattern) {
    //  return new RegExp(pattern).test(text);
    //})
    res.json(requiredusers);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);

router.get('/followings', auth , async(req,res) => {
  try{
    const profile = await Profile.findOne({user: req.user.id});
    const followingusers= [];
    for(let i=0;i<profile.followings.length;i++){
      const user = await User.findOne({_id : profile.followings[i]._id});
      followingusers.push(user);
    }
    res.json(followingusers);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);

router.get('/directs', auth , async(req,res) => {
  try{
    const profile = await Profile.findOne({user: req.user.id});
    const profiledirects = [];
    for(let i=0;i<profile.directs.length;i++){
      const profiledirect = [];
      const user = await User.findOne({_id : profile.directs[i].user});
      profiledirect.push(user);
      profiledirect.push(profile.directs[i].direct);
      profiledirects.push(profiledirect);
    }
    res.json(profiledirects);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);

router.post('/direct', [ auth, [check('num', 'Num is required').not().isEmpty()]],async(req,res) => {
  try{
    const profile = await Profile.findOne({user: req.user.id});
    const i= req.body.num;
    const profiledirect = [];
    const direct = profile.directs[i];
    const user= await User.findById(direct.user);
    profiledirect.push(direct);
    profiledirect.push(user);
    res.json(profiledirect);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);

router.get('/today', auth,async(req,res) => {
  try{
    const profile = await Profile.findOne({user: req.user.id})
    const now = moment()
    const responses = []
    let activities = profile.activities
    console.log(activities)
    activities = activities.filter((a)=>a.date > now.startOf('day') && a.date < now.endOf('day'))
    for(let i=0;i<activities.length;i++){
      const response = [];
      const user = await User.findById(activities[i].user)
      if(activities[i].activity_type == 'request'){
        response.push(user)
        response.push(activities[i].activity_type)
        responses.push(response)
      }else if(activities[i].activity_type == 'comment' || activities[i].activity_type == 'like'){
        const post = await Post.findById(activities[i].postid)
        response.push(user)
        response.push(post.image)
        response.push(activities[i].activity_type)
        responses.push(response)
      }
    }
    console.log(1,activities)
    res.json(responses)

  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);

router.get('/yesterday', auth,async(req,res) => {
  try{
    const profile = await Profile.findOne({user: req.user.id})
    const now = moment().subtract(1, 'day');
    const responses = []
    let activities = profile.activities
    console.log(activities)
    activities = activities.filter((a)=>a.date > now.startOf('day') && a.date < now.endOf('day'))
    for(let i=0;i<activities.length;i++){
      const response = []
      const user = await User.findById(activities[i].user)
      if(activities[i].activity_type == 'request'){
        response.push(user)
        response.push(activities[i].activity_type)
        responses.push(response)
      }else if(activities[i].activity_type == 'comment' || activities[i].activity_type == 'like'){
        const post = await Post.findById(activities[i].postid)
        response.push(user)
        response.push(activities[i].activity_type)
        response.push(post.image)
        responses.push(response)
      }
    }
    console.log(1,activities)
    res.json(responses)

  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);

router.get('/week', auth,async(req,res) => {
  try{
    const profile = await Profile.findOne({user: req.user.id})
    const now1 = moment().subtract(7, 'day');
    const now2 = moment().subtract(1,'day');
    const responses = []
    let activities = profile.activities
    //console.log(activities)
    activities = activities.filter((a)=>a.date > now1.startOf('day') && a.date < now2.startOf('day'))
    console.log(activities)
    for(let i=0;i<activities.length;i++){
      const response = [];
      const user = await User.findById(activities[i].user)
      if(activities[i].activity_type == 'request'){
        response.push(user)
        response.push(activities[i].activity_type)
        responses.push(response)
      }else if(activities[i].activity_type == 'comment' || activities[i].activity_type == 'like'){
        const post = await Post.findById(activities[i].postid)
        response.push(user)
        response.push(activities[i].activity_type)
        response.push(post.image)
        responses.push(response)
      }
    }
    //console.log(1,activities)
    res.json(responses)

  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);

router.get('/month', auth,async(req,res) => {
  try{
    const profile = await Profile.findOne({user: req.user.id})
    const now1 = moment().subtract(30, 'day');
    const now2 = moment().subtract(7, 'day');
    const responses = []
    let activities = profile.activities
    console.log(activities)
    activities = activities.filter((a)=>a.date > now1.startOf('day') && a.date < now2.startOf('day'))
    for(let i=0;i<activities.length;i++){
      const user = await User.findById(activities[i].user)
      const response=[]
      if(activities[i].activity_type == 'request'){
        response.push(user)
        response.push(activities[i].activity_type)
        responses.push(response)
      }else if(activities[i].activity_type == 'comment' || activities[i].activity_type == 'like'){
        const post = await Post.findById(activities[i].postid)
        response.push(user)
        response.push(activities[i].activity_type)
        response.push(post.image)
        responses.push(response)
      }
    }
    console.log(1,activities.length)
    res.json(responses)

  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);

module.exports =router;