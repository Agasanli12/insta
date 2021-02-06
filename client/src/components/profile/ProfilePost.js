import React from 'react';
import './profilepost.css'
//import PropTypes from 'prop-types';
//import { connect } from 'react-redux';

export default function ProfilePost(props,profile) {
    console.log(props.location.state);
    const requiredpost= props.location.state.i;
    const image = btoa(
        new Uint8Array(requiredpost.image.data.data)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    console.log(image);
    
    return (
        <div>
            <div className="post-navbar">
                <svg width="4em" height="4em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
                    <path fill-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
                <h1 className="navbar-h1">Posts</h1>
            </div>
            <div className="post-head">
                <img className="profile-image" src={requiredpost.avatar}></img>
                <h1 className="user-nname">{requiredpost.name}</h1>
            </div>
            <img className="required-image" src={`data:image/jpeg;base64,${image}`}></img>
            <div className="svgs-div">
                <svg width="4em" height="4em" viewBox="0 0 16 16" class="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                     <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>
                <svg width="4em" height="4em" viewBox="0 0 16 16" class="bi bi-chat-dots" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                    <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>
            </div>
            <h1 className="required-likes">{requiredpost.likes.length}  Likes</h1>
            <div className="post-bottom">
                <h1><b>{requiredpost.name}</b></h1>
                <h1 className="required-text"> {requiredpost.text}</h1>
            </div>
            <h1 className="required-comments">Wiev all {requiredpost.comments.length} comments</h1>

        </div>
    )
};



