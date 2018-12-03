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
        value: '',
        errorMessage: '',
        loading: false,
        store: true
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const Auth = new AuthService(Domain);
        const campaign = Campaign(this.props.address);
        this.setState({ loading: true, errorMessage: '' });
        if (Auth.loggedIn()){
            try {
                const accounts = await web3.eth.getAccounts();
                const token = localStorage.getItem('id_token');
                await campaign.methods.contribute().send({
                    from: accounts[0],
                    value: web3.utils.toWei(this.state.value, 'ether')
                }).then(() => {
                    const profile = Auth.getProfile();
                    var result = profile.contributeIn.map(campaign => ({ address: campaign.address }));
                    result.forEach((result) => {
                        if (this.props.address == result.address){
                            this.setState({ store: false });
                        }
                    });
                    if (store){
                        fetch(`${Domain}/user`, {
                            method: 'PUT',
                            headers: {
                            'Authorization': 'Bearer ' + token,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ contri: this.props.address })
                        })
                        .then(res => res.json())
                        .then(data => { Auth.setProfile(data) })
                        .catch(err => { console.log(err) });
                    }
                });

                window.location.replace(`/campaigns/${this.props.address}`);
            } catch (err){
                swal({
                    type: 'error',
                    title: 'Sorry!',
                    text: 'Something went wrong!',
                    footer: '<a href="https://jvilladev.com/#contact">Help me fix the code, click here!</a>'
                  })
                this.setState({ errorMessage: err.message })
            }

            this.setState({ loading: false, value: '' })
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
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Ammount to contribute</label>
                    <Input
                        label="Ether"
                        labelPosition="right"
                        value={this.state.value}
                        onChange={event => this.setState({ value: event.target.value })}
                    />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button primary loading={this.state.loading}>
                    Contribute!
                </Button>
            </Form>
        );
    }
}

export default ContributeForm;