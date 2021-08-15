import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router';


const PayModal = (props) => {
    const [payDetails, setPayDetails] = useState({});

    const onChangeHandler = (input, type) => {
        const details = {...payDetails};
        details[input.target.id] = input.target.value;
        setPayDetails(details);
    }

    const history  = useHistory();

    const onSubmitHandler = (event, callback) => {
        // event.preventDefault();
        console.log(payDetails);
        axios.post('http://localhost:5000/api/blockchain/', payDetails,{
            "headers": {
                "x-auth-token": localStorage.getItem("token")
            }
        })
        .then(
          res => {console.log(res)
          // history.push({
          //   pathname: "/"
          // })
          // props.onHide
          callback();
        })
        .catch(error => console.log(error))
    }

    // const onSubmitHandler = (event) => {
    //   event.preventDefault();
    //   onSubmitHandlerFunc();
    //   props.onHide
    // }
    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className="" >
                    <Form.Group controlId="sender">
                        <Form.Label>Sender</Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="sender name"
                            onChange={(input) => onChangeHandler(input, 'sender')}/>
                    </Form.Group>
                    <Form.Group controlId="recipient">
                        <Form.Label>Recipient</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="recipient name" 
                        minLength="6"
                        onChange={(input) => onChangeHandler(input, 'recipient')}/>
                    </Form.Group>
                    <Form.Group controlId="amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control 
                        type="number" 
                        placeholder="amount" 
                        minLength="6"
                        onChange={(input) => onChangeHandler(input, 'amount')}/>
                    </Form.Group>
                    <Button variant="success" className="logIn-button" onClick={(event) => onSubmitHandler(event,props.onHide)}>Pay</Button>
                </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default PayModal