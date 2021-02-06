import React from 'react';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import './profiletop.css';

export default function ProfileTop(props) {
    console.log(props);
    const posts =props.posts.length;
    const followers =props.followers.length ;
    const followings = props.followings.length;
    const bas64images= [];
    props.images.forEach(image => { 
        bas64images.push(btoa(
         new Uint8Array(image.image.data.data)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
    )});
    console.log(props.images,bas64images);
    //const image = btoa(String.fromCharCode(...new Uint8Array(props.images[0].image.data.data)));;
    //const image = btoa(
    //    new Uint8Array(image.image.data.data)
    //      .reduce((data, byte) => data + String.fromCharCode(byte), '')
    //  );
    //console.log(image);
    return (
        <div className="div3">
            <div className="container divv">
            <div className="container2"></div>
            <div className="div2">
                <h3 className="H3"><span>{posts}</span> posts</h3>
                <Link to="/profilefollowers">
                <h3 className="H3"><span>{followers}</span> followers</h3>
                </Link>
                <Link to="profilefollowings">
                <h3 className="H3"><span>{followings}</span> followings</h3>
                </Link>
            </div>
            </div>
            <div>
                <button type="button" class="btn dark"><span className="boldd">Edit Profile</span></button>
            </div>
            <div className="div44">
                {bas64images.map((image,index) => (
                    <Link to={{pathname:"profileposts",state:{i:props.images[index]}}}>
                    <img className="image" src={`data:image/jpeg;base64,${image}`} ></img>
                    </Link>
                ) )}
            </div>
        </div>
            
            
       
    )
}
