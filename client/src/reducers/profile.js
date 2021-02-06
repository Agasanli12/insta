import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILES,
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
    GET_FOLLOW_REQUESTS
  } from '../actions/types';
  
  const initialState = {
    profile: null,
    directs: [],
    currentprofile: null,
    profiles: [],
    today_activities: [],
    yesterday_activities: [],
    lastweek_activities: [],
    lastmonth_activities: [],
    recommended_profiles: [],
    loading: true,
    error: {}
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_CURRENT_PROFILE:
        return {
          ...state,
          currentprofile: payload,
          loading: false,
        };
      case GET_DIRECTS_OF_PROFILE:
        return {
          ...state,
          directs: payload,
          loading: false
        }
      case GET_PROFILE:
      case UPDATE_PROFILE:
        return {
          ...state,
          profile: payload,
          loading: false
        };
      case GET_PROFILES:
      case GET_PROFILE_FOLLOWERS: 
      case GET_PROFILE_FOLLOWINGS:
      case GET_SEARCH_PROFILES:
      case GET_SEARCH_FOLLOWS:
      case GET_FOLLOW_REQUESTS:
        return {
          ...state,
          profiles: payload,
          loading: false
        };
      case PROFILE_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
          profile: null
        };
      case GET_TODAY_ACTIVITIES:
        return {
          ...state,
          today_activities: payload,           
          loading: false,
          
        };
      case GET_YESTERDAY_ACTIVITIES:          
        return {
          ...state,
          yesterday_activities: payload,           
          loading: false,
        };
      case GET_LASTWEEK_ACTIVITIES:                  
        return {
          ...state,
          lastweek_activities: payload,           
          loading: false,
        };
      case GET_LASTMONTH_ACTIVITIES:                  
        return {
          ...state,
          lastmonth_activities: payload,           
          loading: false,
        };
      case GET_RECOMMENDED_PROFILES:                  
        return {
          ...state,
          recommended_profiles: payload,           
          loading: false,
        };
      case CLEAR_PROFILE:
        return {
          ...state,
          profile: null,
        }
      default:
        return state;
    }
  }