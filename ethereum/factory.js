import web3 from './web3';
import Factory from './build/Factory.json';

const instance = new web3.eth.Contract(
    JSON.parse(Factory.interface),
    process.env.FACTORYADDRESS
);

export default instance;