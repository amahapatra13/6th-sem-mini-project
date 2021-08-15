import React, {Component} from 'react';
import axios from 'axios';
import image from './5240.jpg';
import image1 from './fundraising.jpg';
import image2 from './fundraising3.jpg';
import image3 from './fundraising4.jpg';
import image4 from './fundraising2.jpg';
import image5 from './fundraising1.jpg';
import { Row, Col, Button, Card, ProgressBar, Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
import './Home.css';
import PayModal from './PayModal'

class Home extends Component {
    
    state = {
        obj: [],
        modalShow: false
    }
    changeModalState = () => {
        this.setState({modalShow: true})
    }
    componentDidMount() {
        axios.get("http://localhost:5000/api/campaign")
        .then(res => {
            console.log(res);
            let newObj = res.data.map(element => 
                <Col xs={12} sm={6} md={4}>
                    <Card style={{ width: '18rem', marginTop: "50px"}}>
                        <Card.Img variant="top" src={image1} />
                        <Card.Body>
                            <Card.Title>{element.name}</Card.Title>
                            <Card.Text>
                            <p>{element.description}</p>
                            <p>Required Amount : {element.requiredAmount}</p>
                            <ProgressBar now={Math.floor(Math.random() * 100) + 1} />
                            <div>
                                <p>{Math.floor(Math.random() * 100) + 1} days left</p>
                            </div>
                            <Button className="" onClick={this.changeModalState}>Contribute</Button>

                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>    
            );
            this.setState({obj: newObj});
        })
        .catch(err => {
            console.log(err);
        })
        
    }
    
    render(){
        return(
            <div className="home">
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">CrowdFunding</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/addcampaign">Start a Fundraiser</Nav.Link>
                            <Nav.Link href="/">Browse Fundraisers</Nav.Link>
                            <Nav.Link href="/showtransaction">Show Transaction</Nav.Link>
                            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            <div className="container mainmain">
                <div className="main">
                    <Row>
                        <Col>
                            <div className="maintext">
                                <h1>Together we are Stronger</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                               
                                <div className="start">
                                    <Button>Start a Fundraiser Now!!</Button>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className="image">
                                <img src={image}></img>
                            </div>
                        </Col>

                    </Row>
                </div>
                <div className="container cards">
                    <Row>
                        {this.state.obj}
                    </Row>
                    <PayModal
                                show={this.state.modalShow}
                                onHide={() => this.setState({modalShow: false})}
                            />
                    </div>
                    </div>
                    <div class="footer">
                        <h1>Contact us</h1>
                    </div>                
                </div>
        )
    }
}

export default Home