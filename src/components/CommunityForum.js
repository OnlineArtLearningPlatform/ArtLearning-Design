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
                window.location.reload(false);
                this.setState({
                    category: '',
                    query: ''
                });

            }).catch((err) => console.log(err))
    }


    render() {
        return (
            <div>
                <h2 style={{ textAlign: "center", color: '#566573 ' }}>
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
                                <Input type="textarea" name="query" id="query" value={this.state.query} onChange={this.handleChange}
                                    placeholder="Write your query..." />
                            </FormGroup>
                            <Button color='success' onClick={this.addQuery}>
                                Ask Now
                            </Button>
                        </Form>
                        <hr></hr>
                    </Container>
                </div>
                <Container >
                    {this.state.queries.map((queries) => {
                        return (
                            <div key={queries._id} id='queries' >
                                <h3>{queries.query}</h3>
                                <Label style={{ marginRight: '2%' }}>Category: {queries.category}</Label>
                                <Label>Asked By: {queries.askedBy.fullName}</Label>
                                <br></br>

                                <Link to={`/viewReplies/${queries._id}`}>
                                    <Button color='primary' >View Replies</Button>
                                </Link>
                            </div>
                        )
                    })}
                </Container>
            </div>
        )
    }
}
