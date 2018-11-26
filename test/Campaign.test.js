const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/Factory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    );
});

describe('Campaigns', () => {
    it('deploys a factory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('caller is also manager of the campaign', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it('allows people to contribute and marks as approver', async () => {
        await campaign.methods.contribute().send({
            value: '200',
            from: accounts[1]
        });
        const approver = await campaign.methods.approvers(accounts[1]).call(); 
        await assert(approver);
    });

    it('requires minimum ammount enter', async () => {
        try{
            await campaign.methods.contribute().send({
                value: '5',
                from: accounts[2]
            });
        } catch (err){
            console.log(err.message.replace('VM Exception while processing transaction: revert', ''));
            assert(err);
        }
    });

    it('lets manager can make requests', async () => {
        await campaign.methods.createRequest('test', '500', accounts[3]).send({
            from: accounts[0],
            gas: '1000000'
        });

        const request = await campaign.methods.requests(0).call();
        assert.equal('test', request.description);
    });
});