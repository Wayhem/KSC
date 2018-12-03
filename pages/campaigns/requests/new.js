import React, { Component } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import withAuth from '../../../utils/withAuth';
import swal from 'sweetalert2';
import Layout from '../../../components/layout';

class RequestNew extends Component {
    state = {
        manager: false,
        value: '',
        description: '',
        recipient: '',
        loading: false,
        errorMessage: ''
    }

    componentDidMount() {
        const profile = this.props.auth.getProfile();
        //BUG PROBLEM sometimes says profile.campaign is undefined so can't map it
        //sometimes profile gets returned as an array, or object radomly
        if (!profile.length){
            var result = profile.campaign.map(campaign => ({ address: campaign.address }));
            result.forEach((result) => {
                if (this.props.url.query.address == result.address){
                    this.setState({ manager: true });
                }
            });
            setTimeout(() => {
                if (!this.state.manager){
                    swal({
                        type: 'warning',
                        title: 'Sorry!',
                        text: 'You need to be the manager of the campaign to do that!',
                        footer: '<a href="/home">Go to home page.</a>'
                    })
                    setTimeout(() => {
                        window.location.replace('/home');
                    }, 3000)
                }
            }, 1000)
        } else if (profile.length) {
            var result = profile[0].campaign.map(campaign => ({ address: campaign.address }));
            result.forEach((result) => {
                if (this.props.url.query.address == result.address){
                    this.setState({ manager: true });
                }
            });
            setTimeout(() => {
                if (!this.state.manager){
                    swal({
                        type: 'warning',
                        title: 'Sorry!',
                        text: 'You need to be the manager of the campaign to do that!',
                        footer: '<a href="/home">Go to home page.</a>'
                    })
                    setTimeout(() => {
                        window.location.replace('/home');
                    }, 3000)
                }
            }, 1000)
        }
    }

    onSubmit = async e => {
        e.preventDefault();
        
        const campaign = Campaign(this.props.url.query.address);
        const { description, value, recipient } = this.state;

        this.setState({ loading: true, errorMessage: '' })

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods
                .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
                .send({ from: accounts[0] });
            Router.pushRoute(`/campaigns/${this.props.url.query.address}/requests`); 
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false });
    }

    render() {
    return (
        <Layout>
            <Link route={`/campaigns/${this.props.url.query.address}/requests`}>
                <a>
                    Back
                </a>
            </Link>
            <h3>Make a Request</h3>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Description</label>
                    <Input 
                        value={this.state.description}
                        onChange={event => this.setState({ description: event.target.value })}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Value in Ether</label>
                    <Input
                        value={this.state.value}
                        onChange={event => this.setState({ value: event.target.value })} 
                    />
                </Form.Field>
                <Form.Field>
                    <label>Recipient</label>
                    <Input
                        value={this.state.recipient}
                        onChange={event => this.setState({ recipient: event.target.value })} 
                    />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button loading={this.state.loading} primary>Request!</Button>
            </Form>
        </Layout>
    );
  }
}

export default withAuth(RequestNew);