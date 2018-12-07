# Trustfund

This is a small project which consist in a crowfunding site like Kickstarter or GoFundme but allows contributors for every campaign to have a say on what is done with the contributed money. This dApp makes the campaign or crowdfund manager (creator), make requests for transferring the a certain amount of money stored in the campaign balance, which then have to be approved by at least 50% of the contributors of the campaign in order to be finalized by the manager, once finalized by the manager, money is sent to the wallet specified on the request details, Currently for using on ethereum side requires Metamask and private mode not enabled, will set private mode availability soon.  
  
Solidity side uses the address used during the process and ties it to the action you made, if you create a campaign, it ties your address as the manager of the campaign, which is the only one able to set new requests, and if you contribute, it sets that address as a contributor, which are the only ones able to approve requests made by the manager of the campaign. NOTE: Every individual campaign has its own set of approvers(addresses than contribute more than the minimum requirement stated on the campaign) and its own manager(the creator of the campaign and the one who sets the minimal amount to contribute).  
  
On the local side a small Express/Mongo/NextJS framework is running allowing user registration that keeps track on our database of users, passwords, campaings (created ones), and campaigns in which the user contributed, Auth is made via JWT, and uses a small service which lets the user what he/she should know or do on the application with many different scenarios.

## Deployment and testing

This project package.json is ready to be deployed to Heroku and used on production, however, deployment on Heroku or locally first need to set some environment variables in order to work nicely. Be sure to download or clone the repo before starting and run `npm install` to install dependencies or if you don't want to go through so much trouble just to see it and test it [go to the instance of the dApp I deployed](https://trust-fund.herokuapp.com/home).

## Prerequisites

* Node.js
* NPM
* Metamask
* MongoDB
* API key from Infura

### Environment variables

* ENV.ACCOUNTETH: This is where you will set your mnemonic/address(Metamask mnemonic works) needed to deploy the Factory contract which deploys campaigns.
* ENV.INFURAKEY: Node the dApp is going to use to deploy factory contract, and in case metamask has not inyected web3 on the window yet, be sure to obtain your own API key here at [Infura](https://infura.io/)
* ENV.PORT: In case you want to set your own custom port, default is 3000 (local).
* ENV.DATABASEKSC: MongoDB which will be used to store users data, default is `mongodb://localhost:27017/ksc_db`
* ENV.FACTORY: This one is where you should store your Factory contract address once deployed.

### Note on FACTORY env variable

If only set as a variable it leads to a small bug on windows 10, which allows to show deployed campaings but does not recognize the address when trying to deploy new campaings. To fix these bugs I highly encourage you to follow these instructions:

1. CD into the once you set all env variables and run `node deploy.js`
2. This will trigger your deployment and show instantly the address which the contract is being deployed from and after a few seconds the address where it was deployed to.
3. COPY AND SAVE THE ADDRESS SOMEWHERE SAFE, this address is where the new instance of your factory was deployed and it's the root solidity contract your dApp will work with.
4. Now CD into your `ethereum/factory.js` file and change `process.env.FACTORY` for the address you just deployed your contract to (wrap it around single quotes).

Congratulations now you should be good to good to go and we are almost finished.

## Installing

### Local

Run `npm run dev` for developing environment or `npm run build` to build next.js folder, then `npm run start`, server should be listening on http://localhost:3000

## Testing

Run `npm run test` to test your application with [Ganache](https://truffleframework.com/docs/ganache/quickstart), provides an end to end test of your ethereum side application.

## Deployment

### Heroku

In order to deploy to heroku application is ready now, go to [Heroku](https://heroku.com/), set the environment variables and follow instructions on their website to deploy your dApp.

## Pending stuff

* DRY up the code
* Let the campaigns store a description and a title on the solidity side of the app
* Make a better UI and style it a bit more so it is not so pale

## Questions?

Be sure to send your feedback through my personal website, or my Email, both are public on my github account.

## Built With

* [Next.js](https://github.com/zeit/next.js)
* [Solidity](https://solidity.readthedocs.io/)
* [Node](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [Jared Palmer](https://github.com/jaredpalmer) for his contribution to this project on Authentication side.
