import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import {getTodayActivities,getYesterdayActivities,getLastweekActivities,getLastmonthActivities,getRecommendedProfiles,
getFollowRequests} from '../../actions/profile'
import icon from './followrequests.png'
import './activitypage.css'

let base64 = undefined;

function ActivityPage(props) {
    useEffect(() => {
        props.getTodayActivities();
        props.getYesterdayActivities();
        props.getLastweekActivities();
        props.getLastmonthActivities();
        props.getRecommendedProfiles();
        props.getFollowRequests();
    }, []);
    
    console.log(props.profile,props.profile.profiles[props.profile.profiles.length-1])
    return (
        props.profile.today_activities.length > 0 || props.profile.yesterday_activities.length > 0 ||
        props.profile.lastweek_activities.length > 0 || props.profile.lastmonth_activities.length > 0
        || props.profile.recommended_profiles.length>0 || props.profile.profiles.length>=0 ?
        <div>
            <h1>Activity</h1>
            {props.profile.profiles.length == 0 ?
            <Link to='/activitypage/followrequests'>
            <div className="follow-requests">
                <img className="requests-image" src={icon}></img>
                <div className="requests-details">
                    <h2>Follow Requests</h2>
                    <h4>Approe or ignore requests</h4>
                </div>
            </div>
            </Link>
            :
            //<Link to={{pathname:`/activitypage/followrequests}`, state: {s:props.profile.profiles}}}>
            <Link to={{pathname:'/activitypage/followrequests' , state: props.profile.profiles }} >
            <div className="follow-requests">
                <img className="requests-avatar" src={props.profile.profiles[props.profile.profiles.length-1][0].avatar}></img>
                <h5 className="requests-length">{props.profile.profiles.length}</h5>
                <div className="requests-details">
                    <h2>Follow Requests</h2>
                    <h4>Approe or ignore requests</h4>
                </div>
            </div>
            </Link>
            }
            { props.profile.today_activities.length > 0 &&
            <div>
                <h2>Today</h2> 
                {props.profile.today_activities.map((activity,index)=>(
                    activity[1] == 'request' ?
                    <div className="request-activity">
                        <img className="activity-image" src={activity[0].avatar}></img>
                        <h3 className="name-margin"><b>{activity[0].name}</b></h3>
                        <h4 className="name-margin">requested to follow you</h4>
                        <button className="confirm-button">Confrim</button>
                        <button className="delete-button">Delete</button>
                    </div>
                    :
                    activity[1] == 'comment' ?
                    <div className="comment-activity">
                        <img className="activity-image" src={activity[0].avatar}></img>
                        <h3 className="name-margin"><b>{activity[0].name}</b></h3>
                        <h4 className="name-margin">commented</h4>
                        {44}
                        <img className="comment-image" src={`data:image/jpeg;base64,${btoa(
                          new Uint8Array(activity[2].data.data)
                          .reduce((data, byte) => data + String.fromCharCode(byte), '')
                        )}`}></img>
                        
                    </div>
                    :
                    <div>
                        <img src={activity[0].avatar}></img>
                        <h3 className="name-margin"><b>{activity[0].name}</b></h3>
                        <h4 className="name-margin">liked your photo</h4>
                        <img className="like-image" src={`data:image/jpeg;base64,${btoa(
                          new Uint8Array(activity[2].data.data)
                          .reduce((data, byte) => data + String.fromCharCode(byte), '')
                        )}`}></img>
                    </div>

                    
                ))}
            </div>
            }
            { props.profile.yesterday_activities.length > 0 &&
            <div>
                <h2>Yesterday</h2> 
                {props.profile.yesterday_activities.map((activity,index)=>(
                    activity[1] == 'request' ?
                    <div className="request-activity">
                        <img className="activity-image" src={activity[0].avatar}></img>
                        <h3 className="name-margin"><b>{activity[0].name}</b></h3>
                        <h4 className="name-margin">requested to follow you</h4>
                        <button className="confirm-button">Confrim</button>
                        <button className="delete-button">Delete</button>
                    </div>
                    :
                    activity[1] == 'comment' ?
                    <div className="comment-activity">
                        <img className="activity-image" src={activity[0].avatar}></img>
                        <h3 className="name-margin"><b>{activity[0].name}</b></h3>
                        <h4 className="name-margin">commented</h4>
                        {44}
                        <img className="comment-image" src={`data:image/jpeg;base64,${btoa(
                          new Uint8Array(activity[2].data.data)
                          .reduce((data, byte) => data + String.fromCharCode(byte), '')
                        )}`}></img>
                        
                    </div>
                    :
                    <div>
                        <img src={activity[0].avatar}></img>
                        <h3 className="name-margin"><b>{activity[0].name}</b></h3>
                        <h4 className="name-margin">liked your photo</h4>
                        <img className="like-image" src={`data:image/jpeg;base64,${btoa(
                          new Uint8Array(activity[2].data.data)
                          .reduce((data, byte) => data + String.fromCharCode(byte), '')
                        )}`}></img>
                    </div>

                    
                ))}
            </div>
            }
            { props.profile.lastweek_activities.length > 0 &&
            <div>
                <h2>This Week</h2> 
                {props.profile.lastweek_activities.map((activity,index)=>(
                    activity[1] == 'request' ?
                    <div className="request-activity">
                        <img className="activity-image" src={activity[0].avatar}></img>
                        <h3 className="name-margin"><b>{activity[0].name}</b></h3>
                        <h4 className="name-margin">requested to follow you</h4>
                        <button className="confirm-button">Confrim</button>
                        <button className="delete-button">Delete</button>
                    </div>
                    :
                    activity[1] == 'comment' ?
                    <div className="comment-activity">
                        <img className="activity-image" src={activity[0].avatar}></img>
                        <h3 className="name-margin"><b>{activity[0].name}</b></h3>
                        <h4 className="name-margin">commented</h4>
                        {44}
                        <img className="comment-image" src={`data:image/jpeg;base64,${btoa(
                          new Uint8Array(activity[2].data.data)
                          .reduce((data, byte) => data + String.fromCharCode(byte), '')
                        )}`}></img>
                        
                    </div>
                    :
                    <div>
                        <img src={activity[0].avatar}></img>
                        <h3 className="name-margin"><b>{activity[0].name}</b></h3>
                        <h4 className="name-margin">liked your photo</h4>
                        <img className="like-image" src={`data:image/jpeg;base64,${btoa(
                          new Uint8Array(activity[2].data.data)
                          .reduce((data, byte) => data + String.fromCharCode(byte), '')
                        )}`}></img>
                    </div>

                    
                ))}
            </div>
            }
            { props.profile.lastmonth_activities.length > 0 &&
            <div>
                <h2>This Month</h2> 
                {props.profile.lastmonth_activities.map((activity,index)=>(
                    activity[1] == 'request' ?
                    <div className="request-activity">
                        <img className="activity-image" src={activity[0].avatar}></img>
                        <h3 className="name-margin"><b>{activity[0].name}</b></h3>
                        <h4 className="name-margin">requested to follow you</h4>
                        <button className="confirm-button">Confrim</button>
                        <button className="delete-button">Delete</button>
                    </div>
                    :
                    activity[1] == 'comment' ?
                    <div className="comment-activity">
                        <img className="activity-image" src={activity[0].avatar}></img>
                        <h3 className="name-margin"><b>{activity[0].name}</b></h3>
                        <h4 className="name-margin">commented</h4>
                        {44}
                        <img className="comment-image" src={`data:image/jpeg;base64,${btoa(
                          new Uint8Array(activity[2].data.data)
                          .reduce((data, byte) => data + String.fromCharCode(byte), '')
                        )}`}></img>
                        
                    </div>
                    :
                    <div>
                        <img src={activity[0].avatar}></img>
                        <h3 className="name-margin"><b>{activity[0].name}</b></h3>
                        <h4 className="name-margin">liked your photo</h4>
                        <img className="like-image" src={`data:image/jpeg;base64,${btoa(
                          new Uint8Array(activity[2].data.data)
                          .reduce((data, byte) => data + String.fromCharCode(byte), '')
                        )}`}></img>
                    </div>

                    
                ))}
            </div>
            }
            {props.profile.recommended_profiles.length > 0 &&
            <div>
                <h1>Suggestions for you</h1>
                {props.profile.recommended_profiles.map((profile,index)=>(
                    <div className="suggestion">
                        <img className="suggestion-image" src={profile.user.avatar}></img>
                        <div className="suggestion-details">
                            <h3 className="suggestion-detail"><b>{profile.user.name}</b></h3>
                            <h3>{profile.profile.bio}</h3>
                            <h4 >{profile.description}</h4>
                        </div>
                        <button className="suggestion-button">Follow</button>
                        <h1 className="suggestion-delete">x</h1>
                    </div>    
                ))}
            </div>
            
            }
            
        </div>
        : <Spinner/>
    )
}


ActivityPage.propTypes = {
    getTodayActivities: PropTypes.func.isRequired,
    getYesterdayActivities: PropTypes.func.isRequired,
    getLastweekActivities: PropTypes.func.isRequired,
    getLastmonthActivities: PropTypes.func.isRequired,
    getRecommendedProfiles: PropTypes.func.isRequired,
    getFollowRequests: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
    posts: state.posts
});


export default connect(mapStateToProps,{getTodayActivities,getYesterdayActivities,getLastweekActivities,getLastmonthActivities,
    getRecommendedProfiles,getFollowRequests})(ActivityPage);