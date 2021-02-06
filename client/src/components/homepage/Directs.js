import React ,{useState,useEffect} from 'react'
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getDirectsProfile} from '../../actions/profile'
import searchicon from '../searchpage/54481.svg'
import Spinner from '../layout/Spinner'
import './directs.css';

function Directs(props) {
    let l;
    if(props.profile.directs.length > 0){
        l= props.profile.directs[0][1].length
        console.log(l);
        console.log(props,props.profile.directs[0][1][l-1])
    };
    //useEffect(() => {
    //    props.getCurrentProfile();
    //}, [props.getCurrentProfile()]);
    useEffect(() => {
        props.getDirectsProfile();
    }, [props.getDirectsProfile()]);
    return (
        !props.profile.loading && props.profile.directs.length>0 ?
        <div>
            <div className="directs-head">
                <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
                    <path fill-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
                <h1>{props.auth.user.name}</h1>
            </div>
            <Link to="/searchfollows">
            <div className="directs-search">
                <img className="directs-searchicon" src={searchicon}></img>
                <h1>Search</h1>
            </div>
            </Link>
            <h1>Messages</h1>
            {props.profile.directs.map((direct,index)=>(
            <Link to={{pathname:`/homepage/directs/${direct[0]._id}`, state:{i:index} }}>    
            <div className="directs">
                <img className="directuser-image" src={direct[0].avatar}></img>
                <div className="directuser-details">
                    <h3 className="directuser-name"><b>{direct[0].name}</b></h3>
                    <h3 className="direct-lasttext">{direct[1][l-1].text}</h3>
                </div>
            </div>
            </Link>
            ))}
        </div>
        : <Spinner/>
    )
};

Directs.propTypes = {
    getDirectsProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
    posts: state.posts
});


export default connect(mapStateToProps , {getDirectsProfile})(Directs);
