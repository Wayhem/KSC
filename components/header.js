import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default class Header extends Component{
    state = {}

    handleItemClick = (e) => {
        this.logout()
    }

    handleHomeClick = (e) => {
        e.preventDefault();
        window.location.replace('/home');
    }

    logout(){
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
    }

    getToken(){
        return localStorage.getItem('id_token')
    }
    
    render(){
        const { activeItem } = this.state

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