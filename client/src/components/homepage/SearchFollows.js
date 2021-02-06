import React,{useState} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getSearchFollows} from '../../actions/profile'
import Spinner from '../layout/Spinner'
import './directs.css'

function SearchFollows(props) {
    console.log(props.profile);
    const [text,settext]=useState('')
    const onChange = e =>
        settext(e.target.value);
        
        if(text.length>0){
            props.getSearchFollows(text);
        }
    return (
        !props.profile.loading  ? 
        <div>
            <div className="searchfollows-head">
             <input
                    className="directs-input"
                    type="email"
                    placeholder="Search"
                    value={text}
                    name="direct"
                    onChange={onChange}
                />
            </div>
            {props.profile.profiles.map((profile)=>(
                <div className="searchfollows-details">
                    <img className="searchfollows-image" src={profile.avatar}></img>
                    <h2><b>{profile.name}</b></h2>
                </div>
            ))} 

 
        </div>
        : <Spinner/>
    )
}

SearchFollows.propTypes = {
    getSearchFollows: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
    posts: state.posts
});


export default connect(mapStateToProps ,{getSearchFollows} )(SearchFollows);
