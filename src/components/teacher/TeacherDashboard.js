import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom';
import Axios from 'axios';
import { Card, CardBody, CardDeck, CardFooter, CardGroup, CardImg, CardImgOverlay, CardText, CardTitle, Button, Row, Container } from 'reactstrap'

import imageFile from '../assets/courseFile.jpg'

export default class TeacherDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            config: {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            },
        }
    }

    componentDidMount() {
        Axios.get("http://localhost:3001/users/myProfile", this.state.config)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    user: response.data,
                    isLoggedIn: true,

                });
            })
            .catch((err) => console.log(err.response));

    }
    render() {
        if (this.state.user.role === 'student') {
            return <Redirect to='/' />
        }
        return (
            <div >

                <h6 className="text-center"> This is Teacher's Dashboard </h6>

                <CardDeck>
                    <Card>
                        <CardImg variant="top" style={{ width: '200px' }} src={imageFile} />
                        <CardBody>
                            <CardTitle>Card title</CardTitle>
                            <CardText>
                                This is a wider card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.
                    </CardText>
                        </CardBody>

                    </Card>
                    <Card>
                        <CardImg variant="top" src="holder.js/100px160" />
                        <CardBody>
                            <CardTitle>Card title</CardTitle>
                            <CardText>
                                This card has supporting text below as a natural lead-in to additional
                            </CardText>
                        </CardBody>

                    </Card>
                    <Card>
                        <CardImg variant="top" src="holder.js/100px160" />
                        <CardBody>
                            <CardTitle>Card title</CardTitle>
                            <CardText>
                                This is a wider
      </CardText>
                        </CardBody>

                    </Card>
                </CardDeck>
            </div>
        )
    }
}
