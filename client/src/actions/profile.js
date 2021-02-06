import api from '../utils/api';
import setAuthToken from '../utils/setAuthToken';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILE_FOLLOWERS,
  GET_PROFILE_FOLLOWINGS,
  GET_SEARCH_PROFILES,
  GET_CURRENT_PROFILE,
  GET_DIRECTS_OF_PROFILE,
  GET_SEARCH_FOLLOWS,
  GET_TODAY_ACTIVITIES,
  GET_YESTERDAY_ACTIVITIES,
  GET_LASTWEEK_ACTIVITIES,
  GET_LASTMONTH_ACTIVITIES,
  GET_RECOMMENDED_PROFILES,
  GET_FOLLOW_REQUESTS,
} from './types';


// Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await api.get('/profile/me');
    console.log(res.data);

    dispatch({
      type: GET_CURRENT_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get directs of users profile
export const getDirectsProfile = () => async dispatch => {
  try {
    const res = await api.get('/profile/directs');
    console.log(res.data);

    dispatch({
      type: GET_DIRECTS_OF_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get direct of users profile
export const getDirectProfile = (number) => async dispatch => {
  try {
    const params = {'num': number.toString()}
    const res = await api.post('/profile/direct',params);
    console.log(res.data);

    dispatch({
      type: GET_DIRECTS_OF_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get follows of user profile
export const getSearchFollows = (text) => async dispatch => {
  try {
    console.log(1);
    const params = {'text': text}
    const res = await api.post('/profile/followers/',params);
    console.log(res.data);

    dispatch({
      type: GET_SEARCH_FOLLOWS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await api.get('/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get followers of profile
export const getProfileFollowers = () => async dispatch => {
  try{
    const res = await api.get('/profile/followers');
    console.log(res.data);

    dispatch({
      type: GET_PROFILE_FOLLOWERS,
      payload: res.data
    });
  }catch(err){
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get followings of profile
export const getProfileFollowings = () => async dispatch => {
  try{
    const res = await api.get('/profile/followings');
    console.log(res.data);

    dispatch({
      type: GET_PROFILE_FOLLOWINGS,
      payload: res.data
    });
  }catch(err){
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get profile by ID
export const getProfileById = userId => async dispatch => {
  try {
    const res = await api.get(`/profile/user/${userId}`);
    console.log(res.data);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const res = await api.post('/profile', formData);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;


    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// Delete account & profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await api.delete('/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      //dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Get profiles by search
export const getSearchProfiles = (search) => async dispatch => {
  {
    try {
      const params ={'text': search}
      const res = await api.post('/profile/search',params);
     
      dispatch({
        type: GET_SEARCH_PROFILES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Get today activities
export const getTodayActivities = () => async dispatch => {
  try{
    const res = await api.get('/profile/today');
    console.log(res.data);

    dispatch({
      type: GET_TODAY_ACTIVITIES,
      payload: res.data
    });
  }catch(err){
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get yesterday activities
export const getYesterdayActivities = () => async dispatch => {
  try{
    const res = await api.get('/profile/yesterday');
    console.log(res.data);

    dispatch({
      type: GET_YESTERDAY_ACTIVITIES,
      payload: res.data
    });
  }catch(err){
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get today activities
export const getLastweekActivities = () => async dispatch => {
  try{
    const res = await api.get('/profile/week');
    console.log(res.data);

    dispatch({
      type: GET_LASTWEEK_ACTIVITIES,
      payload: res.data
    });
  }catch(err){
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get today activities
export const getLastmonthActivities = () => async dispatch => {
  try{
    const res = await api.get('/profile/month');
    console.log(res.data);

    dispatch({
      type: GET_LASTMONTH_ACTIVITIES,
      payload: res.data
    });
  }catch(err){
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get recommended profiles
export const getRecommendedProfiles = () => async dispatch => {
  try{
    const res = await api.get('/recommend/');
    console.log(res.data);

    dispatch({
      type: GET_RECOMMENDED_PROFILES,
      payload: res.data
    });
  }catch(err){
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get follow requests
export const getFollowRequests = () => async dispatch => {
  try{
    const res = await api.get('/profile/followrequests');
    console.log(res.data);

    dispatch({
      type: GET_FOLLOW_REQUESTS,
      payload: res.data
    });
  }catch(err){
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};