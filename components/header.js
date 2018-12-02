import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, Router } from '../routes';
import AuthService from '../utils/AuthService';
import Domain from '../domain';

export default class Header extends Component{
    
    handleItemClick = (e) => {
        const Auth = new AuthService(Domain)
        Auth.logout(e)
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
                <Link route="/login">
                    <a className="item">Login</a>
                </Link>
                <Link route="/register">
                    <a className="item">Register</a>
                </Link>
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