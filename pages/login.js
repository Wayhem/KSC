import React, { Component } from 'react';
import Layout from '../components/layout';
import { Form } from 'semantic-ui-react';
import { Router } from '../routes';
import Domain from '../domain';
import AuthService from '../utils/AuthService';
const Auth = new AuthService(Domain);

class UserLogin extends Component { 

    state = {
        username: '',
        password: '',
        domain: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.state.domain = Domain;
        let username = this.state.username;
        let password = this.state.password;
        
        Auth.login(username, password);
        Router.pushRoute('/');
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