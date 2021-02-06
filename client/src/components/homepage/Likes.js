import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getPost} from '../../actions/posts'
import {getCurrentProfile} from '../../actions/profile'
import Spinner from '../layout/Spinner'
import './comments.css';


function Likes(props) {
    //const [follow,setfollow] = useState([]);
    console.log(props);
    //if(props.profile.currentprofile && props.posts.post){
    //     
    //   props.posts.post.likes.forEach(like => {
    //         props.profile.currentprofile[0].followings.forEach(element => {
    //            if(like.user == element._id){
    //                setfollow(prevarray =>[...prevarray,true])
    //            }else{
    //                setfollow(prevarray =>[...prevarray,true])
    //            }
    //         })
    //   })     
    //}
    //console.log(follow);
    useEffect(() => {
        props.getPost(props.match.params.id);
      },[getPost(props.match.params.id)]);
    useEffect(()=>{
        props.getCurrentProfile();
    },[getCurrentProfile()]);  
    return (
        props.posts.post && !props.posts.loading && props.profile.currentprofile ?
        <div>
             <div className="comments-head">
                <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
                    <path fill-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
                <h1>Likes</h1>
            </div>
            {props.posts.post.likes.map((like,index)=>(
                <div className="likes-details">
                    <img className="text-avatar" src={like.avatar}></img>
                    <h1>{like.name}</h1>
                    {props.profile.currentprofile[0].followings.findIndex((element)=> element._id == like.user) == -1 ?
                    <h2 className="likeduser-follow">Follow</h2> : <h2 className="likeduser-following">Following</h2>
                    }
                </div>
            ))}
           
        </div>
         : <Spinner/> 
        
    )
};

Likes.propTypes = {
    getPost: PropTypes.object.isRequired,
    getCurrentProfile:PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
    posts: state.posts
});


export default connect(mapStateToProps, { getPost,getCurrentProfile })(Likes);
