import React, { Component } from 'react';
import Layout from '../components/layout';
import { Form } from 'semantic-ui-react';
import AuthService from '../utils/AuthService';
const Auth = new AuthService();

class UserRegister extends Component { 

    state = {
        username: '',
        password: ''
    }

    routeRoot() {
        window.location.replace('/home');
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let username = this.state.username;
        let password = this.state.password;
        
        fetch('/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            Auth.setToken(data.id_token);
            Auth.setProfile(data);
            this.routeRoot();
        });
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })
    
    render(){
        return (
        <Layout>
            <h3>Register</h3>
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

export default UserRegister;