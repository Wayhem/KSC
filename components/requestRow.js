import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import AuthService from '../utils/AuthService';
import Campaign from '../ethereum/campaign';
import swal from 'sweetalert2';
const Auth = new AuthService();

class RequestRow extends Component {

    state = {
        contributor: false,
        manager: false
    }

    onFinalize = async () => {
        const logged = await Auth.loggedIn();
        if (logged){    
            const profile = Auth.getProfile();
            if(!profile.length){
                var result = profile.campaign.map(campaign => ({ address: campaign.address }));
            } else if (profile.length) {
                var result = profile[0].campaign.map(campaign => ({ address: campaign.address }));
            }
            result.forEach((result) => {
                if (this.props.address == result.address){
                    this.setState({ manager: true });
                }
            });
            setTimeout(() => {
                if (!this.state.manager){
                    swal({
                        type: 'warning',
                        title: 'Sorry!',
                        text: 'You need to own the campaign to do that!',
                        footer: '<a href="/home">Go to home page.</a>'
                    })
                    setTimeout(() => {
                        window.location.replace(`/campaigns/${this.props.address}`);
                    }, 3000)
                }
            }, 1000)
            if (this.state.manager) {
                const campaign = new Campaign(this.props.address);
                const accounts = await web3.eth.getAccounts();
                await campaign.methods.finalizeRequest(this.props.id).send({
                    from: accounts[0]
                });
                this.setState({ manager: false });
                window.location.replace(`/campaigns/${this.props.address}/requests`);
            }
        } else {
            swal({
                type: 'warning',
                title: 'Sorry!',
                text: 'You need to be logged in to do that!',
                footer: '<a href="/register">New user? click here to register.</a>'
            })
            setTimeout(() => {
                window.location.replace('/login');
            }, 2500)
        }
    }

    onApprove = async () => {
        const logged = await Auth.loggedIn();
        //sometimes doesn't return loggedin in time
        if (logged){    
            const profile = Auth.getProfile();
            if(!profile.length){
                var result = profile.contributeIn.map(campaign => ({ address: campaign.address }));
            } else if (profile.length){
                var result = profile[0].contributeIn.map(campaign => ({ address: campaign.address }));
            }
            result.forEach((result) => {
                if (this.props.address == result.address){
                    this.setState({ contributor: true });
                }
            });
            setTimeout(() => {
                if (!this.state.contributor){
                    swal({
                        type: 'warning',
                        title: 'Sorry!',
                        text: 'You need to be the contribute to the campaign to do that!',
                        footer: '<a href="/home">Go to home page.</a>'
                    })
                    setTimeout(() => {
                        window.location.replace(`/campaigns/${this.props.address}`);
                    }, 3000)
                }
            }, 1000)
            if (this.state.contributor) {
                const campaign = new Campaign(this.props.address);
                const accounts = await web3.eth.getAccounts();
                await campaign.methods.approveRequest(this.props.id).send({
                    from: accounts[0]
                });
                this.setState({ contributor: false });
                window.location.replace(`/campaigns/${this.props.address}/requests`);
            }
        } else {
            swal({
                type: 'warning',
                title: 'Sorry!',
                text: 'You need to be logged in to do that!',
                footer: '<a href="/register">New user? click here to register.</a>'
            })
            setTimeout(() => {
                window.location.replace('/login');
            }, 2500)
        }
    }

    render () {
        const { Row, Cell } = Table;
        const { id, request, approversCount } = this.props;
        const readyFinal = request.yesCount > approversCount / 2;

        return(
            <Row disabled={request.complete} positive={readyFinal && !request.complete}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.yesCount}/{approversCount}</Cell>
                <Cell>
                    {request.complete ? null : (
                    <Button color="green" basic onClick={this.onApprove}>Approve</Button>
                    )}
                </Cell>
                <Cell>
                    {request.complete ? null : (
                    <Button color="teal" basic onClick={this.onFinalize}>Finalize</Button>
                    )}
                </Cell>
            </Row>
        );
    }
}
//no auth protection cus it messes up semantic table components and styling
export default RequestRow;