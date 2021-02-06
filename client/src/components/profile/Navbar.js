import React from 'react'
import './navbar.css'

export default function Navbar(props) {
    //const username = "username";
    return (
        <div className="div">
            <h3>{props.username}</h3>
            <button type="button" className="btn btn-default btn-" aria-label="Left Align">
                <span className="glyphicon glyphicon-align-justify" aria-hidden="true"></span>
            </button>
        </div>
    )
}
