import web3 from './web3';
import Factory from './build/Factory.json';

const instance = new web3.eth.Contract(
    JSON.parse(Factory.interface),
    '0x858B3ECc344d1a326a429C2A24f41919789899b8'
);

export default instance;