import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import Layout from '../components/layout';

class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        
        return { campaigns };
    }

    renderCampaigns(){
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: <a>View Campaign</a>,
                fluid: true
            };
        });

        return <Card.Group items={items} />
    }
    
    render(){
        return (
        <Layout>
            <div>    
                <h3>Open Fundraisings</h3>
                <Button
                    content='Create Crowdfund'
                    icon='add circle'
                    primary
                    labelPosition='right'
                    floated='right'
                />
                {this.renderCampaigns()}
            </div>
        </Layout>
        );
    }
}

export default CampaignIndex;