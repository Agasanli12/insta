import React ,{Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Post from './Post';
import {getPosts} from '../../actions/posts'

const Homepage = React.memo(props => {
    console.log("homepage",props.posts);
    useEffect(() => {
        props.getPosts();
      }, [props.getPosts]);
    return (
        <div>
            {props.auth.isAuthenticated && props.auth.user && !props.posts.loading ?
            <Fragment>
                <Navbar/>
                <Post Posts={props.posts}/>
            </Fragment>
            :<h1>agsgjs</h1> }
        </div>
        
        
    )
});

Homepage.propTypes = {
    getPosts: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
    posts: state.posts
});


export default connect(mapStateToProps, { getPosts })(Homepage);
