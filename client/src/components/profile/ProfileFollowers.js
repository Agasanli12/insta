import React,{Fragment,useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getProfileFollowers} from '../../actions/profile';
import './profilefollowers.css';


function ProfileFollowers({getProfileFollowers,auth,profile}) {
    console.log(getProfileFollowers)
    console.log(profile);
    useEffect(() => {
        getProfileFollowers();
    }, [getProfileFollowers]);

    return (
        profile.profiles.length>0 &&
        <div>
            <h1>{profile.profile[0].user.name}</h1>
            <h2 className="followersnum">{profile.profile[0].followers.length} Followers</h2>
            <h1>All Followers</h1>
            {profile.profiles.map((profile) => (
            <div className="followers">
                <img className="round-image" src={profile.avatar}></img>
                <h2 className="followername"> { profile.name } </h2>
                <div className="flex-end">
                    <h3 className="removefollower">Remove</h3>
                </div>
                
            </div>
            ))}
        </div>              

    )
};

ProfileFollowers.propTypes = {
    getProfileFollowers: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfileFollowers })(ProfileFollowers);

