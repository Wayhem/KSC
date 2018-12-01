import React, {Component} from 'react';
import Layout from '../../components/layout';
import Campaign from '../../ethereum/campaign';
import { Card, Grid } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/contributeForm';

class CampaignShow extends Component {
    static async getInitialProps(props){
        const campaign = Campaign(props.query.address);
        
        const summary = await campaign.methods.getSummary().call();
        
        return {
            minimumContribution: summary[0],
            balance: summary[1],
            requestCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestCount,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager created this campaign and can create requests to transfer money',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to become an approver'
            },
            {
                header: requestCount,
                meta: 'Number of requests',
                description: 'A request tries to withdraw money for the contract. Request must be approved by approvers'
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have contributed to the campaign with the same or more wei than the minimum contribution'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign balance (Ether)',
                description: 'How much money is left for this campaign has left to spend'
            }
        ]

        return <Card.Group items={items} />
    }

    render() {
        return( 
        <Layout>
            <h3>Crowdfund details</h3>
            <Grid>
                <Grid.Column width={10}>
                    {this.renderCards()}
                </Grid.Column>
                <Grid.Column width={6}>
                    <ContributeForm />
                </Grid.Column>
            </Grid>
        </Layout>
        );
    }
}

export default CampaignShow;