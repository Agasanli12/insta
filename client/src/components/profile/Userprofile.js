import React , {Fragment, useEffect}  from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from './Navbar'
import ProfileTop from './ProfileTop'
import { getCurrentProfile } from '../../actions/profile'
import './userprofile.css';

function Userprofile  ({ getCurrentProfile, profile, auth, match })  {
    console.log(profile)
    useEffect(() => {
        getCurrentProfile();
      }, [getCurrentProfile]);
    return (
        auth.isAuthenticated && auth.user && profile.profile ?
        <div>
            <Fragment>
                <Navbar username={auth.user.name}/>
                
                <ProfileTop followings={profile.profile[0].followings} followers={profile.profile[0].followers} 
                posts={profile.profile[0].posts} images={profile.profile[1]}/>
            </Fragment> 
            
        </div>
        : <h4>sdrf</h4>
    )
};


Userprofile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});


export default connect(mapStateToProps, { getCurrentProfile })(Userprofile);
