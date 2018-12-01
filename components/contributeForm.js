import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';


class ContributeForm extends Component {
    render() {
        return (
            <Form>
                <Form.Field>
                    <label>Ammount to contribute</label>
                    <Input
                        label="Ether"
                        labelPosition="right"
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