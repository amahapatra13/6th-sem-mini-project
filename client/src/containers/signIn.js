import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import './signIn.css';
import image from './crowdfunding1(1).jpg';
import axios from 'axios'
import { useHistory } from 'react-router';

// user state config
// email: string
// password: string
const SignUp = () => {

    const [user, setUser] = useState({});
    const onChangeHandler = (input, type) => {
        const obj = {...user};
        obj[type] = input.target.value; 
        setUser(obj);
    }
    const history  = useHistory();
    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(user)
        axios.post('http://localhost:5000/api/auth', user)
        .then(res => {
            console.log(res);
            window.localStorage.setItem("token", res.data.token);
            history.push({
                pathname: "/"
            })
        })
        .catch(error =>{

        })
    }

    return (
        <div className="main">
            <div className="box">
                <div className="logo">
                    <img src={image} alt="" />
                </div>
                <Form className="" >
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
                    <Button variant="success" className="logIn-button" onClick={onSubmitHandler}>Log In</Button>
                    <Form.Group className="signUp-text">
                        <Form.Text>Create an account?<a href="/signUp">  signUp</a></Form.Text>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}

export default SignUp;



