import React,{Fragment,useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getProfileFollowings} from '../../actions/profile';
import './profilefollowings.css';


function ProfileFollowings({getProfileFollowings,auth,profile}) {
    console.log(getProfileFollowings)
    console.log(profile);
    useEffect(() => {
        getProfileFollowings();
    }, [getProfileFollowings]);

    return (
        profile.profiles.length>0 &&
        <div>
            <h1>{profile.profile[0].user.name}</h1>
            <h2 >{profile.profile[0].followings.length} Followers</h2>
            <h1>All Followers</h1>
            {profile.profiles.map((profile) => (
            <div >
                <img  src={profile.avatar}></img>
                <h2> { profile.name } </h2>
                <div>
                    <h3>Remove</h3>
                </div>
                
            </div>
            ))}
        </div>              

    )
};

ProfileFollowings.propTypes = {
    getProfileFollowings: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfileFollowings })(ProfileFollowings);