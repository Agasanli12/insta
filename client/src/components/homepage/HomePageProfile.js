import React, {Fragment,useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getProfileById} from '../../actions/profile'
import Spinner from '../layout/Spinner';
import './homepageprofiles.css';

function HomePageProfile({getProfileById,profile,auth,match}) {
    useEffect(() => {
        getProfileById(match.params.id);
      }, [getProfileById(match.params.id)]);
    console.log(profile);
    const bas64images= [];
    if(profile.profile && profile.profile.length == 2){
        profile.profile[1].forEach(image => { 
            bas64images.push(btoa(
            new Uint8Array(image.image.data.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
            )
        )});
    }
    console.log(bas64images);
    return (
        profile.profile ?
        <div>
            <div className="post-navbar">
                <svg width="4em" height="4em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
                    <path fill-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
                <h1 className="navbar-h1">{profile.profile[0].user.name}</h1>
            </div>
            <div className="requiredprofile-top">
                <img className="profile-image" src={profile.profile[0].user.avatar}></img>
                <div className="rprofile-posts dddd">
                    <h1 className="rnumposts">{profile.profile[0].posts.length}</h1>
                    <h3 className="rnum-posts">Posts</h3>
                </div>
                <div className="rprofile-posts">
                    <h1 className="rnumposts">{profile.profile[0].followers.length}</h1>
                    <h3 className="rnum-posts">Followers</h3>
                </div>
                <div className="rprofile-posts">
                    <h1 className="rnumposts">{profile.profile[0].followings.length}</h1>
                    <h3 className="rnum-posts">Followings</h3>
                </div>
            </div>
            <h1>{profile.profile[0].user.name}</h1>
            <h3 className="rprofile-bio">{profile.profile[0].bio}</h3>
            <h1 className="rprofile-followingbox">Following</h1>

            {bas64images.length == profile.profile[0].posts.length &&
            bas64images.map((image,index) => (
                <img className="image" src={`data:image/jpeg;base64,${image}`} ></img>
            ) )
            }
            
        </div>:
        <Spinner/>
    )
};

HomePageProfile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
});


export default connect(mapStateToProps, { getProfileById })(HomePageProfile);

