import React, {Component} from 'react';
import Layout from '../../components/layout';
import Campaign from '../../ethereum/campaign';
import { Card } from 'semantic-ui-react';

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
            }
        ]

        return <Card.Group items={items} />
    }

    render() {
        return( 
        <Layout>
            <h3>Crowdfund details</h3>
            {this.renderCards()}
        </Layout>
        );
    }
}

export default CampaignShow;