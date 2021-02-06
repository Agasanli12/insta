import React from 'react'
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
export default function SearchTagPosts(props) {
    console.log(props.location.state);
    const base64images = [];
    props.location.state.i.forEach(image => { 
        if(image){
        base64images.push(btoa(
         new Uint8Array(image.image.data.data)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
        ))
        }else{
            base64images.push(0);
        }
    });
    console.log(base64images);
    return (
        <div>
            <h1>#{props.location.state.j}</h1>
            <div className="div44">
                {base64images.map((image,index) => (
                    <Link to={{pathname:'/searchtagpost', state:{i:props.location.state.i[1]}}}>
                    <img className="image" src={`data:image/jpeg;base64,${image}`} ></img>
                    </Link>
                ) )}
            </div>
        </div>
    )
}
