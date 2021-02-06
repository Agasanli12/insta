import React,{Fragment,useEffect,useState} from 'react'
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getSearchProfiles} from '../../actions/profile';
import './searchprofiles.css';

function SearchProfiles({getSearchProfiles,profile,auth}) {
    const [text, settext] = useState('');
    
      
    const onChange = e =>
        settext(e.target.value);
        console.log(text.length,profile);
        if(text.length>0){
            getSearchProfiles(text);
        }

    return (
        <div>
            <div className="search-top">
                <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
                    <path fill-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
                <input
                className="search-input"
                type="email"
                placeholder="Search"
                name="Search"
                value={text}
                onChange={onChange}
              />
            </div>
            {profile.profiles.length>0 &&
            profile.profiles.map((profile)=> (
                <Link to={{pathname:`/searchpageprofile/${profile[0]._id}`}}>
                <div className="search-profiles">
                    <img className="round-image" src={profile[0].avatar}></img>
                    <h1>{profile[0].name}</h1>
                </div>
                </Link>
            ))
            } 
        </div>
    )
};

SearchProfiles.propTypes = {
    getProfileFollowers: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getSearchProfiles })(SearchProfiles);

