import React,  { Fragment, useState }  from 'react'
import { connect } from 'react-redux'
import { Link , Redirect} from 'react-router-dom';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import  "./Register.css";
import logo from '../../instagramicon.png'


const Register = ({ register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
      });
    
      const { name, email, password, password2 } = formData;
    
      const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
      const onSubmit =  (e) => {
        e.preventDefault();
        if (password !== password2) {
          console.log("invalid");
        } else {
            register({ name, email, password });
        }
      };

      if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
      }
    
    return (
        <Fragment>
            <div className="container bodyy">
                <h1 className="large text-primary signup"><img className="image" src={logo} alt="logo"></img></h1>
                <p className="lead signup">
                    <i className="fas fa-user" /> Create Your Account
                </p>
                <form className="form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={onChange}/>
                        <small className="form-text">
                            This site uses Gravatar so if you want a profile image, use aGravatar email
                        </small>
                    </div>
                    <div className="form-group">
                        <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        onChange={onChange}/>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                <p className="my-1">Already have an account? </p>
                
            
            </div>
            
           
        </Fragment>  
        
    )
    
};

Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };
  
  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  
export default connect(mapStateToProps, { register })(Register);