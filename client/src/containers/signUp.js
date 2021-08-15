import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import image from './crowdfunding1(1).jpg';
import axios from 'axios'
import './auth.css';
import {useHistory} from 'react-router';
import {Redirect} from 'react-router-dom';
// in user state
// email: string
// password: string
// name: string
// contact: string
const SignUp = () => {
    const [user, setUser] = useState({});
    const onChangeHandler = (input, type) => {
        const obj = {...user};
        obj[type] = input.target.value; 
        setUser(obj);
    }
    const history = useHistory();
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        console.log("button clicked")
        console.log(user);
        
        await axios.post('http://localhost:5000/api/users', user)
        .then(res => {
            console.log(res.data.token)
            // if(res.data.token.length()>0)
            // {
                window.localStorage.setItem("token", res.data.token);
                history.push({
                    pathname:"/"
                })
            // }
        })
        .catch(error =>{
            console.log("Error");
            console.log(error.errors)
        })
        // history.push({pathName: '/'});
        
    }

    return (
        <div className="center">
            <div className="logo">
                    <img src={image} alt="" />
                </div>
            <Form >
                <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email"
                            placeholder="abc@xyz.com"
                            onChange={(input) => onChangeHandler(input, 'email')}/>
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="eg. asdxyz" 
                    minLength="6"
                    onChange={(input) => onChangeHandler(input, 'password')}/>
                </Form.Group>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Name" 
                        onChange={(input) => onChangeHandler(input, 'name')}/>
                </Form.Group>
                {/* <Form.Group controlId="formContact">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control 
                        type="tel" 
                        minLength="10" 
                        maxLength="10" 
                        placeholder="9123456789"
                        onChange={(input) => onChangeHandler(input, 'contact')}/>
                </Form.Group> */}
                
                <Button variant="success" onClick={onSubmitHandler}>Create New Account</Button>
                <Form.Group className="sign-text">
                    <Form.Text>Already have an account?<a href="/signIn">  signIn</a></Form.Text>
                </Form.Group>
            </Form>
        </div>
    );
}

export default SignUp;