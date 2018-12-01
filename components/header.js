import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';
import AuthService from '../utils/AuthService';

export default class Header extends Component{
    
    handleItemClick = (e) => {
        const Auth = new AuthService(Domain)
        Auth.logout()
    }

    handleHomeClick = (e) => {
        e.preventDefault();
        window.location.replace('/home');
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