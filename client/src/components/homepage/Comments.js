import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import like2 from './like2.png'
import likeicon from './like-icon.png'
import api from '../../utils/api';
import {addComment,getPost} from '../../actions/posts'
import './comments.css'


let params = '';
let reply = {
    text: '',
    postid: '',
    commentid: '',
    addcomment: 0,
    commentindex: -1,
    info: false,
};

function Comments(props) {
    let postinfo = props.location.state.s
    const [text, settext] = useState('');
    const [add,setadd] = useState(false);
    const [commentslen,setcommentslen] = useState(postinfo.comments.length);
    
    const [render, setrender] = useState(false);
    console.log(props,reply);
    let l = text.length;
    useEffect(() => {
        if(params !== props.match.params.id){
            params = props.match.params.id
            reply = {text:'',postid:'',commentid:'',addcomment:0,commentindex:-1,info:false}
        }
        props.getPost(props.match.params.id)
        
      }, [render]);

    async function Comment2() {
        let params = {'text':text}
        let headers = {'x-auth-token':props.auth.token}
        console.log("c2",headers,params,text);
        const res= await api.post(`/posts/comment/${reply.postid}/${reply.commentid}`, params,headers)
        console.log("res=");
        console.log(res.data)
        postinfo.comments=res.data
        console.log(postinfo)
    }
    async function Comment() {
        let params = {'text':text}
        let headers = {'x-auth-token':props.auth.token}
        console.log("c2",headers,params,text);
        const res= await api.post(`/posts/comment/${reply.postid}`, params,headers)
        console.log("res=");
        console.log(res.data)
        postinfo.comments=res.data
        console.log(postinfo)
    }
    useEffect( () => {
        console.log(reply);
        if(reply.info){
            console.log("ccccc")
            
            Comment2();
          

            props.getPost(props.match.params.id)
            console.log(props.posts.post.comments[0])
            //postinfo = props.posts.post;
            reply = { text: '',postid: '',commentid: '',info: false};
            setrender(!render)
           
            
        }else{

            Comment()
            props.getPost(props.match.params.id)
            reply = { text: '',postid: '',commentid: '',info: false};
            setrender(!render)
        }
        settext('')
      }, [add]);
    
      const onChange = e => {settext(e.target.value)}
      const onClick = e => {
          e.preventDefault();
          if(reply.text.length == 0){
            //props.addComment(props.posts.post._id,text)
            reply.postid = props.posts.post._id
          }
    
          setadd(!add);
        }
      function likecomment(postid,commentid,i){
          postinfo.comments[i].likes.unshift({user:props.auth.user._id,name:props.auth.user.name,avatar:props.auth.user.avatar})
          let headers = {'x-auth-token':props.auth.token.toString()}
          api.put(`/posts/like/${postid}/${commentid}`,headers)
          setrender(!render);
          
      } 
      function unlikecomment(postid,commentid,i){
        postinfo.comments[i].likes = postinfo.comments[i].likes.filter(
            ({ user }) => user.toString() !== props.auth.user._id
        );
        let headers = {'x-auth-token':props.auth.token.toString()}
        api.put(`/posts/unlike/${postid}/${commentid}`,headers)
        setrender(!render)
          //props.removeLikeComment(postid,commentid);
      }
      function ReplyComment(name,postid,commentid,i,info){
          console.log("info="+info)
          if(info){
              reply.addcomment=postinfo.comments[i].comments.length
              reply.info = true
              reply.commentindex = i
              console.log("reply.info="+reply.info)
          }else{
              reply.addcomment=postinfo.comments.length
          }
          reply.text = name;
          reply.postid = postid;
          reply.commentid = commentid;
          console.log(typeof(name))
          console.log("replying to "+name)
          console.log(reply);
          setrender(!render);
          //setadd(!add)
      }
      console.log(postinfo);
    return (
        props.posts.post && !props.posts.loading ?
        <div>
            <div className="comments-head">
                <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
                    <path fill-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
                <h1>Comments</h1>
            </div>
            <div className="post-details">
                <img className="text-avatar" src={props.posts.post.avatar}></img>
                <h2 className="postuser-name"><b>{props.posts.post.name}</b></h2>
                <h2>{props.location.state.s.text}</h2>
            </div>
            <br></br>
            {postinfo.comments.map((comment,index)=>(
                <div>
                    <div className="comments-head">
                        <img className="text-avatar" src={comment.avatar}></img>
                        <div className="comments-flex">
                            <div className="comments-details">
                                <h2><b>{comment.name}</b></h2>
                                <h2 className="comments-text">{comment.text}</h2>
                                {console.log(postinfo.comments[index].likes.findIndex((element)=> element.user == props.auth.user._id))}
                                {postinfo.comments[index].likes.findIndex((element)=> element.user == props.auth.user._id)  == -1 ?
                               
                                <button className="liketocomment-button"><img className="like-comment" src={like2} onClick={()=> likecomment(props.posts.post._id,comment._id,index)}></img></button>
                                : <button className="liketocomment-button"><img className="like-comment" src={likeicon} onClick={()=>unlikecomment(props.posts.post._id,comment._id,index)}></img></button>}
                            </div>
                            <button value={index} className="reply-button" onClick={()=>ReplyComment(comment.name,props.posts.post._id,comment._id,index,true)}><b>Reply</b></button>
                        </div>
                    </div>
                    {postinfo.comments[index].comments.length>0 &&
                    postinfo.comments[index].comments.map((Comment)=>(
                    <div className="comment-of-comment">
                        <img className="text-avatar" src={Comment.avatar}></img>
                        <div className="comments-flex">
                            <div className="comments-details">
                                <h2><b>{Comment.name}</b></h2>
                                <h2 className="comments-text">{Comment.text}</h2>
                            </div>
                        </div>
                    </div>
                    ))
                    }
                </div>

                
            ))}
            {reply.text.length>0 && 
            <h1>replying to {reply.text}...</h1> 
            }
            <div className="input-of-comment">
                <img className="text-avatar" src={props.posts.post.avatar}></img>
                <input
                    className="comment-input"
                    type="email"
                    placeholder="Comment"
                    name="comment"
                    value={text}
                    onChange={onChange}
                />
                <button className="post-comment" onClick={onClick}>Post</button>
            </div>

        </div>
        : <Spinner/>
    )
};

Comments.propTypes = {
    getPost: PropTypes.func.isRequired,
    addComment : PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
    posts: state.posts
});


export default connect(mapStateToProps, { getPost,addComment})(Comments);
