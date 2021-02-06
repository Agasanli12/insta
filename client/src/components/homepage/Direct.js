import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getDirectProfile} from '../../actions/profile'
import Spinner from '../layout/Spinner'
import './directs.css';

function Direct(props) {
    console.log(props.profile.directs,props.location);
    const [text,settext] = useState('')
    useEffect(() => {
        props.getDirectProfile(props.location.state.i);
    }, [props.getDirectProfile(props.location.state.i)]);
    return (
        props.profile.directs[0].user ?
        <div>
            <div className="direct-head">
                <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
                    <path fill-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
                <img className="directuser-image" src={props.profile.directs[1].avatar}></img>
                <h2><b>{props.profile.directs[1].name}</b></h2>
            </div>
            <div className="messages">
                {props.profile.directs[0].direct.map((message)=>(
                    message.texttype == "s" ? <h1 className="sending-text">{message.text}</h1> 
                    : <h1 className="received-text">{message.text}</h1>
                ))}
            </div>
            <input
                className="direct-input"
                type="email"
                placeholder="Message..."
                name="direct"
                value={text}
                //onChange={onChange}
            />
        </div>
        : <Spinner/>
    )
};

Direct.propTypes = {
    getDirectProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
    posts: state.posts
});


export default connect(mapStateToProps , {getDirectProfile})(Direct);
