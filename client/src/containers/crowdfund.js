import React from 'react';
import './crowdfund.css'
import {Button} from 'react-bootstrap';

const Profile = () => {
    let image = [];
    
    return (
        <div className="crowd-color">
            <div className = "crowdfund-container">
                <h1 className = "crowdfund-title">The Story of Lorem Ipsum</h1>
                <div className = "crowd-flexbox"> 
                    <div className="image-box">
                        { 
                            image.map((el) => 
                                {   console.log(el.url)
                                return <img className="crowd-image" src={el.url} alt="Not found" />})
                        }
                    </div>
                    <div className = "crowdfund-description">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                    </div>
                </div>
                <Button varian="success" className="crowd-button">Pay</Button>
            </div>
        </div>
    )
}

export default Profile;