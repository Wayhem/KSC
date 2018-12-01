import React, {Component} from 'react';
import AuthService from './AuthService';
import Domain from '../domain';
import { Router } from '../routes';

export default function withAuth(AuthComponent) {
    const Auth = new AuthService(Domain)
    return class Authenticated extends Component {
      constructor(props) {
        super(props)
        this.state = {
          isLoading: true
        };
      }

      componentDidMount () {
        if (!Auth.loggedIn()) {
          Router.pushRoute('/login');
        } else {
        this.setState({ isLoading: false })
        }
      }

      render() {
        return (
          <div>
          {this.state.isLoading ? (
              <div>LOADING....</div>
            ) : (
              <AuthComponent {...this.props}  auth={Auth} />
            )}
          </div>
        )
      }
    }
}