import React, { Component } from 'react'
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        // alert("Logout Successfull");
        this.props.history.push('/login')
    }


    render() {
        return (
            <div>
                <h1>
                    Welcome
                </h1>
                <Link to='/login'><Button color="dark" style={{ margin: '10px' }} onClick={this.handleLogout}>Logout</Button></Link>
            </div>
        )
    }
}
