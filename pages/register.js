import React, { Component } from 'react';
import Layout from '../components/layout';
import { Form } from 'semantic-ui-react';
import { Router } from '../routes';
import Domain from '../domain';

class UserRegister extends Component { 

    state = {
        username: '',
        password: '',
        domain: ''
    }

    routeRoot() {
        Router.pushRoute('/');
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.state.domain = Domain;
        let username = this.state.username;
        let password = this.state.password;
        
        fetch(`${this.state.domain}/register`, {
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
            this.setToken(data.id_token);
            this.setProfile(data);
            this.routeRoot();
        });
    }

    setToken(idToken){
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    setProfile(profile){
        // Saves profile data to localStorage
        localStorage.setItem('profile', JSON.stringify(profile))
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