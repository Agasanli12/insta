import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
//import Alert from '../layout/Alert';
//import Dashboard from '../dashboard/Dashboard';
//import ProfileForm from '../profile-forms/ProfileForm';
//import AddExperience from '../profile-forms/AddExperience';
//import AddEducation from '../profile-forms/AddEducation';
//import Profiles from '../profiles/Profiles';
import Userprofile from '../profile/Userprofile';
import Homepage from '../homepage/Homepage';
import Searchpage from '../searchpage/Search';
import ProfileFollowers from '../profile/ProfileFollowers';
import ProfileFollowings from '../profile/ProfileFollowings';
import ProfilePost from '../profile/ProfilePost';
import HomepageProfile from '../homepage/HomePageProfile';
import SearchPagePosts from '../searchpage/SearchPagePost';
import SearchPostProfile from '../searchpage/SearchPostProfile';
import SearchProfiles from '../searchpage/SearchProfiles';
import SearchTags from '../searchpage/SearchTags';
import SearchTagPosts from '../searchpage/SearchTagPosts';
import SearchTagPost from '../searchpage/SearchTagPost';
import CommentToPosts from '../homepage/Comments';
import LikesToPosts from '../homepage/Likes';
import Directs from '../homepage/Directs';
import Direct from '../homepage/Direct';
import SearchFollows from '../homepage/SearchFollows'
import ActivityPage from '../activitypage/ActivityPage'
import FollowRequests from '../activitypage/FollowRequests'

//import Posts from '../posts/Posts';
//import Post from '../post/Post';
//import NotFound from '../layout/NotFound';
//import PrivateRoute from '../routing/PrivateRoute';
import Test from '../Test/Test';
const Routes = props => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Userprofile} />
        <Route exact path="/homepage" component={Homepage} />
        <Route exact path="/searchpage" component={Searchpage} />
        <Route exact path="/profilefollowers" component={ProfileFollowers} />
        <Route exact path="/profilefollowings" component={ProfileFollowings} />
        <Route exact path="/profileposts" component={ProfilePost} />
        <Route exact path="/homepageprofiles/:id" component={HomepageProfile} />
        <Route exact path="/searchpageposts" component={SearchPagePosts} />
        <Route exact path="/searchpageprofile/:id" component={SearchPostProfile} />
        <Route exact path="/searchprofiles" component={SearchProfiles} />
        <Route exact path="/searchtags" component={SearchTags} />
        <Route exact path="/searchtagposts" component={SearchTagPosts} />
        <Route exact path="/searchtagpost" component={SearchTagPost} />
        <Route exact path="/addcomment/:id" component={CommentToPosts} />
        <Route exact path="/addlike/:id" component={LikesToPosts} />
        <Route exact path="/homepage/directs" component={Directs} />
        <Route exact path="/homepage/directs/:id" component={Direct} />
        <Route exact path="/searchfollows" component={SearchFollows} />
        <Route exact path="/activitypage" component={ActivityPage} />
        <Route exact path="/activitypage/followrequests" component={FollowRequests} />
        <Route exact path="/test" component={Test} />
      </Switch>
    </section>
  );
};

export default Routes;