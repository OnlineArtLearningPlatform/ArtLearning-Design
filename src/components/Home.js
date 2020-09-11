import React, { Component } from 'react'
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';

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
                {/* <ReactPlayer controls width='480px' height='240px'
                    url='https://www.youtube.com/watch?v=7sDY4m8KNLc&t=114s&ab_channel=Codevolution'
                    onReady={() => console.log('onReady Callback')}
                    onStart={() => console.log('onStart Callback')}
                    onPause={() => console.log('onPause Callback')}
                    onEnded={() => console.log('onEnded Callback')}
                    onError={() => console.log('onError Callback')}
                >


                </ReactPlayer>
                <ReactPlayer
                    className='react-player fixed-bottom'
                    url='http://localhost:3001/uploads/courseFile-1599850068954.mp4'
                    width='100%'
                    height='100%'
                    controls={true}

                /> */}
            </div>
        )
    }
}
