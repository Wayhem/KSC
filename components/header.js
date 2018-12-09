import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, Router } from '../routes';
import AuthService from '../utils/AuthService';
import swal from 'sweetalert2';
const Auth = new AuthService()

export default class Header extends Component{
    
    handleItemClick = (e) => {
        if (Auth.loggedIn()){
            Auth.logout(e)
            swal(
                'Done!',
                'You have successfully logged out!',
                'success'
              )
        } else {
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'You are not logged In!',
                footer: '<a href="/login">Click here to Log In!</a>'
              })
        }
    }

    handleStatus (route) {
        if (!Auth.loggedIn()){
            Router.pushRoute(route);
        } else {
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'You are already logged In!'
              })
        }
    }

    handleRegister = (e) => {
        e.preventDefault();
        this.handleStatus('/register');
    }

    handleLogin = (e) => {
        e.preventDefault();
        this.handleStatus('/login');
    }

    handleHomeClick = (e) => {
        e.preventDefault();
        if (typeof window !== 'undefined'){
            window.location.replace('/home');
        } else {
            //if it is being rendered on the server side, it will show 404 then the home page
            //because it tries to find "index.js" in the folder but has problem rendering this current home page
            //so 404's then lets express make the routing and works
            //ALMOST NEVER HAPPENS!!
            Router.pushRoute('/');
        }
    }
    
    render(){

        return(
            <Menu style={{ marginTop: '15px' }}> 
                <Menu.Item name='home' onClick={this.handleHomeClick}>
                    TrustFund
                </Menu.Item>
                <Menu.Item name='login' onClick={this.handleLogin}>
                    Login
                </Menu.Item>
                <Menu.Item name='register' onClick={this.handleRegister}>
                    Register
                </Menu.Item>
                <Menu.Item name='logout' onClick={this.handleItemClick}>
                    Logout
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item name='home' onClick={this.handleHomeClick}>
                        Campaigns
                    </Menu.Item>
                    <Link route="/campaigns/new">
                        <a className="item">+</a>
                    </Link>
                </Menu.Menu>
            </Menu>
        );
    }
};