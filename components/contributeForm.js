import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import AuthService from '../utils/AuthService';
import Domain from '../domain';
import { Router } from '../routes';
import swal from 'sweetalert2';

class ContributeForm extends Component {
    state ={
        value: ''
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const Auth = new AuthService(Domain);
        const campaign = Campaign(this.props.address);
        if (Auth.loggedIn()){
            try {
                const accounts = await web3.eth.getAccounts();
                await campaign.methods.contribute().send({
                    from: accounts[0],
                    value: web3.utils.toWei(this.state.value, 'ether')
                });

                window.location.replace(`/campaigns/${this.props.address}`);
            } catch (err){
                swal({
                    type: 'error',
                    title: 'Sorry!',
                    text: 'Something went wrong!',
                    footer: '<a href="https://jvilladev.com/#contact">Help me fix the code, click here!</a>'
                  })
            }
        } else {
            Router.pushRoute('/login');
            swal({
                type: 'warning',
                title: 'Sorry!',
                text: 'You need to be logged in to do that!',
                footer: '<a href="/register">New user? click here to register.</a>'
              })
        }
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <label>Ammount to contribute</label>
                    <Input
                        label="Ether"
                        labelPosition="right"
                        value={this.state.value}
                        onChange={event => this.setState({ value: event.target.value })}
                    />
                </Form.Field>
                <Button primary>
                    Contribute!
                </Button>
            </Form>
        );
    }
}

export default ContributeForm;