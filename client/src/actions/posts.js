import api from '../utils/api';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  GET_SEARCH_POSTS,
  GET_SEARCH_TAGS,
  ADD_COMMENT2,
  UPDATE_LIKES_COMMENT,
} from './types';

// Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await api.get('/posts');
    console.log(res.data);
   
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get search posts
export const getSearchPosts = () => async dispatch => {
    try {
        const res = await api.get('/search');
        console.log(res.data);

        dispatch({
            type: GET_SEARCH_POSTS,
            payload: res.data
        });

    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });
    }
};

// Add like
export const addLike = id => dispatch => {
  try {
    const res =  api.put(`/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like to comment
export const addLikeComment = (postid,commentid) => async dispatch => {
  try {
    const res = await api.put(`/posts/like/${postid}/${commentid}`);
    console.log(res.data);

    dispatch({
      type: UPDATE_LIKES_COMMENT,
      payload: { commentid, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await api.put(`/posts/unlike/${id}`);
    console.log(res.data);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like of comment
export const removeLikeComment = (postid,commentid) => async dispatch => {
  try {
    const res = await api.put(`/posts/unlike/${postid}/${commentid}`);
    console.log(res.data);

    dispatch({
      type: UPDATE_LIKES_COMMENT,
      payload: { commentid, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete post
export const deletePost = id => async dispatch => {
  try {
    await api.delete(`/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add post
export const addPost = formData => async dispatch => {
  try {
    const res = await api.post('/posts', formData);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get post
export const getPost = id => async dispatch => {
  try {
    
    const res = await api.get(`/posts/${id}`);
    console.log(res.data);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async dispatch => {
  try {
    console.log(formData)
    const params = {'text':formData}
    const res = await api.post(`/posts/comment/${postId}`, params);
    console.log(res.data);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment to comment
export const addComment2 = (postId,commentId,formData) => async dispatch => {
  try {
    console.log(formData)
    const params = {'text':formData}
    const res = await api.post(`/posts/comment/${postId}/${commentId}`, params);
    console.log(res.data);

    dispatch({
      type: ADD_COMMENT2,
      payload: res.data,
    });

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await api.delete(`/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get search tags
export const getSearchTags = (text) => async dispatch => {
  try {
    const params = {'text':text}
    const res = await api.post('/tag/search',params);
    console.log(res.data);


    dispatch({
      type: GET_SEARCH_TAGS,
      payload: res.data
    });

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};