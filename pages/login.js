import React, { Component } from 'react';
import Layout from '../components/layout';
import { Form } from 'semantic-ui-react';
import AuthService from '../utils/AuthService';
import swal from 'sweetalert2';
const Auth = new AuthService();

class UserLogin extends Component { 

    state = {
        username: '',
        password: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let username = this.state.username;
        let password = this.state.password;
        Auth.login(username, password);
        //allow auth to set token
        setTimeout( () => {
            if (Auth.loggedIn()){
                window.location.replace('/home');
            } else {
                swal({
                    type: 'error',
                    title: 'Oops..!',
                    text: 'Username or password invalid!'
                })
                this.setState({ username: '', password: '' })
            }
        }, 2000);
        
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })
    
    render(){
        return (
        <Layout>
            <h3>Login</h3>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Input placeholder='username' name='username' value={this.state.username} onChange={this.handleChange} />
                    <Form.Input type='password' placeholder='password' name='password' value={this.state.password} onChange={this.handleChange} />
                    <Form.Button content='Submit' />
                </Form.Group>
            </Form>
        </Layout>
        );
    }
}

export default UserLogin;