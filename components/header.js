import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default class Header extends Component{
    state = {}

    handleItemClick = (e) => {
        this.logout()
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
                <Link route="/">
                    <a className="item">TrustFund</a>
                </Link>
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
                    <Link route="/">
                        <a className="item">Campaigns</a>
                    </Link>
                    <Link route="/campaigns/new">
                        <a className="item">+</a>
                    </Link>
                </Menu.Menu>
            </Menu>
        );
    }
};