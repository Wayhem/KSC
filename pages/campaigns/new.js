import React, {Component} from 'react';
import Layout from '../../components/layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import withAuth from  '../../utils/withAuth';
import Domain from '../../domain';

class CampaignNew extends Component {
    state={
        minimumContribution: '',
        errorMessage: '',
        loadingB: false
    };
    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({loadingB: true, errorMessage: ''});
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                });
            const campaigns = await factory.methods.getDeployedCampaigns().call();
            const token = localStorage.getItem('id_token');
            const campaign = campaigns.pop();
            fetch(`${Domain}/user`, {
                method: 'PUT',
                headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ campaign })
            })
            .then(res => res.json())
            .then(data => { this.props.auth.setProfile(data) })
            .catch(err => { console.log(err) });
            window.location.replace('/home');
        } catch (err){
            this.setState({errorMessage: err.message});
        }
        this.setState({loadingB: false});
    };
    render(){
        return (
            <Layout>
                <h3>Create a Crowdfund</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimal Contribution</label>
                        <Input 
                            label="wei" 
                            labelPosition="right"
                            value={this.state.minimumContribution}
                            onChange={event => this.setState({ minimumContribution: event.target.value })}
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button primary loading={this.state.loadingB}>Create!</Button>
                </Form>
            </Layout>
        );
    }
}

export default withAuth(CampaignNew);