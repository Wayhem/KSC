import React, {Component} from 'react';
import AuthService from './AuthService';
import { Router } from '../routes';
import swal from 'sweetalert2';

export default function withAuth(AuthComponent) {
    const Auth = new AuthService();
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
            swal({
                type: 'warning',
                title: 'Sorry!',
                text: 'You need to be logged in to do that!',
                footer: '<a href="/register">New user? click here to register.</a>'
              })
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