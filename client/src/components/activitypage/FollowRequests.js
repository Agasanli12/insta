import React from 'react'
import icon from './followrequests.png'
import './followrequests.css'

export default function FollowRequests(props) {
    console.log(props);
    return (
        props.location.state ?
        <div>
            <h2>Follow Requests</h2>
            {props.location.state.map((profile,index)=>(
                <div className="request-activity">
                    <img className="requests-avatar" src={profile[0].avatar}></img>
                    <div className="requests-details">
                        <h2><b>{profile[0].name}</b></h2>
                        <h2>{profile[1].bio}</h2>
                    </div>
                    <button className="confirm-button">Follow</button>
                    <button className="delete-button">Delete</button>
                </div>
            ))}

        </div>
        :
        <div>
            <h2>Follow Requests</h2>
            <div className="requests-0l">
                <img className="requests-icon" src={icon}></img>
                <h1>Follow Request</h1>
                <h4>When people ask to follow you, you'll see their requestshere.</h4>
            </div>
        </div>

    )
}
