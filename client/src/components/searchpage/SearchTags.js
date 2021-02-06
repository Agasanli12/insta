import React,{Fragment,useEffect,useState} from 'react'
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getSearchTags} from '../../actions/posts';
import symbol from './symbol.png'
import './searchprofiles.css';

function SearchTags({getSearchTags,posts,auth}) {
    const [text, settext] = useState('');
    
      
    const onChange = e =>
        settext(e.target.value);
        console.log(text.length,posts);
        if(text.length>0){
            getSearchTags(text);
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
            {posts.tag && posts.posts.length>0 &&
            posts.posts.map((post) => (
                <Link to={{pathname:'/searchtagposts', state:{i:post[1],j:post[0].name}}}> 
                <div className="search-profiles">
                    <img className="symbol-image" src={symbol}></img>
                    <div>
                        <h4>#{post[0].name}</h4>
                        <h5>{post[1].length} posts</h5>
                    </div>

                </div>
                </Link>
            ))
            }
        </div>
    )
};

SearchTags.propTypes = {
    getSearchTags: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    posts: state.posts,
    auth: state.auth
});

export default connect(mapStateToProps, { getSearchTags })(SearchTags);