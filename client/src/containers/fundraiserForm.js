import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'
import { useHistory } from 'react-router';
const FundraiserForm = () => {
    const [fundraiser, setFundraiser] = useState({});

    const onChangeHandler = (input, type) => {
        const details = {...fundraiser};
        details[input.target.id] = input.target.value;
        setFundraiser(details);
    }
    const history = useHistory();
    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(fundraiser)
        alert("form submiited")
        console.log("form submitted")
        axios.post("http://localhost:5000/api/campaign/addcampaign",fundraiser , {
            "headers" : {
                "x-auth-token": window.localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log(res)
            history.push({
                pathname: "/"
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
    return(
        <div className="main">
            <Form className="">
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="name"
                        onChange={(input) => onChangeHandler(input, 'name')}/>
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                    type="textarea" 
                    placeholder="description" 
                    onChange={(input) => onChangeHandler(input, 'description')}/>
                </Form.Group>
                <Form.Group controlId="requiredAmount">
                    <Form.Label>Required amount</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="requiredAmount" 
                    onChange={(input) => onChangeHandler(input, 'requiredAmount')}/>
                </Form.Group>
                <Button variant="success" className="logIn-button" onClick={onSubmitHandler}>Submit</Button>
            </Form>
    </div>
    )
}

export default FundraiserForm