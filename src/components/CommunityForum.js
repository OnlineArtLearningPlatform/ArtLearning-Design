import React, { Component } from 'react'
import { Container, Form, Input, FormGroup, Label, Button } from 'reactstrap'
import { Link } from 'react-router-dom';
import Axios from 'axios'

export default class CommunityForum extends Component {
    constructor(props) {
        super(props)

        this.state = {
            category: '',
            query: '',
            answer: '',
            queries: [],
            answers: [],
            user: {},
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            isLoggedIn: false
        }
    }


    componentDidMount() {
        Axios.get('http://localhost:3001/query/', this.state.config)
            .then((response) => {
                const data = response.data;
                this.setState({ queries: data });
                console.log(response.data);
            }).catch(error => console.log(error.response));

        Axios.get('http://localhost:3001/users/myProfile', this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    user: response.data,
                    isLoggedIn: true
                })
            })
            .catch((err) => console.log(err.response));
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addQuery = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3001/query',
            {
                category: this.state.category,
                query: this.state.query,
                askedBy: this.state.user._id
            }, this.state.config)
            .then((response) => {
                console.log(response.data);
                alert("You have posted your query successfully!")
                this.setState({
                    category: '',
                    query: ''
                });

            }).catch((err) => console.log(err))
    }


    render() {
        return (
            <div>
                <h2 style={{ textAlign: "center", color: 'blue' }}>
                    Welcome "{this.state.user.fullName}", Do you have any Queries?
                </h2>
                <hr></hr>
                <div id='QueryForm'>
                    <Container>
                        <Form>
                            <FormGroup>
                                <Label for="category">Category</Label>
                                <Input type="select" name="category" id="category" value={this.state.category} onChange={this.handleChange} >
                                    <option >Please select category first</option>
                                    <option>Sketching</option>
                                    <option>Painting</option>
                                    <option>Animation</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="query">Your Query</Label>
                                <Input type="text" name="query" id="query" value={this.state.query} onChange={this.handleChange} />
                            </FormGroup>
                            <Button color='primary' onClick={this.addQuery}>
                                Ask Now
                            </Button>
                        </Form>
                        <hr></hr>
                    </Container>
                </div>
                <Container>
                    {this.state.queries.map((queries) => {
                        return (
                            <div key={queries._id} style={{ margin: '25px auto', padding: '25px', background: '#C0C0C0' }}>
                                <h3>{queries.query}</h3>
                                <h5>Categoty: {queries.category}</h5>
                                <h5>Asked By: {queries.askedBy.fullName}</h5>
                                <Button color='success' onClick={this.postReply}>Reply Now</Button>
                            </div>
                        )

                    })}
                </Container>



            </div>
        )
    }
}
