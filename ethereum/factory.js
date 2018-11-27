import web3 from './web3';
import Factory from './build/Factory.json';

const instance = new web3.eth.Contract(
    JSON.parse(Factory.interface),
    '0xE5b5778C88F782617c210BA4FF62487a12399D85'
);

export default instance;