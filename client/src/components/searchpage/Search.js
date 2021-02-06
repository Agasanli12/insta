import React , {Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getSearchPosts} from '../../actions/posts';
import './search.css';
import searchicon from './54481.svg';
import { post } from 'request';

function Search({ getSearchPosts,auth,profile,posts }) {
    useEffect(() => {
        getSearchPosts();
    }, [getSearchPosts]);
    console.log(posts);

    const bas64images= [];
    posts.posts.forEach(post => { 
        bas64images.push(btoa(
         new Uint8Array(post.image.data.data)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
    )});
    return (
       
        auth.isAuthenticated ?
        <div>
            <Link to='/searchtags' style={{ color: 'black' }}>
            <div className="searchpage-navbar">
                <img className="search-icon" src={searchicon}></img>
                <h1 className="search-text">Search</h1>
            </div>
            </Link>   
            <div className="images">
                {posts.posts.map((post,index) =>(
                <Link to={{pathname: '/searchpageposts', state:{i:post}}}>
                <img className="searchimage" src={`data:image/jpeg;base64,${bas64images[index]}`} ></img>
                </Link>
                ))}
            </div>
        </div> :
            <h1>ddjfkk</h1>
            

        
       
    )
};

Search.propTypes = {
    getSearchPosts: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
    posts: state.posts
});

export default connect(mapStateToProps, { getSearchPosts })(Search);
