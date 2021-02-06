import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import direct from './directicon.png';
import likeicon from './like-icon.png';
import api from '../../utils/api';
import {getPosts} from '../../actions/posts';
import './post.css';

//var likess=[];
let postss = [];

function Post (props) {
    //console.log(props.Posts.posts)
    props.getPosts();
    postss.push(...props.Posts.posts);
    //const len = props.Posts.posts.length;
    const len = postss.length;
    const likes = new Array(len).fill(false);
    console.log(postss.length,postss)
    //if(props.Posts.posts.length>0){
    //    for(let i=0;i<len;i++){
    //        for(let j=0;j<props.Posts.posts[i][0].likes.length;j++){
    //            //console.log(props.posts.posts[i]);
    //            if(props.Posts.posts[i][0].likes[j].user == props.auth.user._id ){
    //                likes[i] = true;
    //            }
    //        }
    //    }
    //}
    if(postss.length>0){
        for(let i=0;i<len;i++){
            for(let j=0;j<postss[i][0].likes.length;j++){
                //console.log(props.posts.posts[i]);
                if(postss[i][0].likes[j].user == props.auth.user._id ){
                    likes[i] = true;
                }
            }
        }
    }
    //console.log(likes);

    const bas64images= [];
    //props.Posts.posts.forEach
    postss.forEach(post => { 
        bas64images.push(btoa(
         new Uint8Array(post[0].image.data.data)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
    )});
    console.log(bas64images,props);
    function like(postid,i) {
       //console.log(postid,i)
       console.log(props.auth.user)
       //likes[i] = true;
       postss[i][0].likes.push({user: props.auth.user._id,name: props.auth.user.name,avatar:props.auth.user.avatar});
       const headers = {'x-auth-headers' : props.auth.token.toString()}
       api.put(`/posts/like/${postid}`,headers);
     
       
    };
    function unlike(postid,i) {
        console.log(postid,i)
        //likes[i] = false;
        //postss[postid][0].likes.push(props.auth);
        postss[i][0].likes = postss[i][0].likes.filter(
            ({ user }) => user.toString() !== props.auth.user._id
        );
        const headers= {'x-auth-token': props.auth.token.toString()};
        api.put(`/posts/unlike/${postid}`,headers)
     };
    return (
        !props.posts.loading &&
        //props.Posts.posts.map
        <div>
            { postss.map((post,index) => (
                <div className="postdiv">
                    <div className="divv3">
                        <div className="divv2">
                            <img className="imgg" src="//www.gravatar.com/avatar/d08dcbb842bca841f4aecd45a7e88b8f?s=200&r=pg&d=mm" alt="image"></img>
                            <Link to={{ pathname: `/homepageprofiles/${post[1]._id}`, state:{i:post[1]._id}}}>
                            <h2 className="H2">{post[1].name}</h2>
                            </Link>
                        </div>
                        <div>
                            <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-three-dots-vertical" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                            </svg>
                        </div> 
                    </div>
                    <div>
                        <img className="immg" src={`data:image/jpeg;base64,${bas64images[index]}`} alt="img"></img>
                    </div>
                    <div className="svgdiv2">
                        <div className="svgdiv">
                            { post[0].likes.findIndex((element)=> element.user == props.auth.user._id) == -1 ? 
                            <button className="like-button" onClick={()=> like(postss[index][0]._id,index)}>
                                <svg width="4em" height="4em" viewBox="0 0 16 16" class="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                </svg>
                            </button> :
                            <button className="like-button" type="button"><img className="like-icon" src={likeicon} onClick={()=>unlike(postss[index][0]._id,index)}></img></button>
                            } 
                            <Link to={{pathname:`/addcomment/${post[0]._id}`, state: {s:post[0]}}}>
                            <svg width="4em" height="4em" viewBox="0 0 16 16" class="bi bi-chat-dots" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                                <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                            </svg>
                            </Link>
                                
                            <img className="direct2" src={direct} alt="direct"></img>
                        </div>
                        <div>
                            <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-bookmark" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 12l5 3V3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10.234z"/>
                            </svg>
                        </div>
        
                    </div>
                    <Link to={{pathname:`/addlike/${post[0]._id}`}}>
                    <h1 className="likes"><span>{post[0].likes.length}</span> likes</h1>
                    </Link>
                    <h1 ><span className="boldd">{post[1].name}</span> {post[0].text}</h1>
                    <h2 className="fontclass">View all <span>{post[0].comments.length}</span> comments</h2>
                </div>
            ))}
        </div>
        
       

        
    )
};

Post.propTypes = {
    getPosts: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
    posts: state.posts,
});


export default connect(mapStateToProps , {getPosts})(Post);

