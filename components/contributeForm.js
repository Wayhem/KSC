import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';


class ContributeForm extends Component {
    state ={
        value: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        
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