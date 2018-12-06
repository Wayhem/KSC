import web3 from './web3';
import Factory from './build/Factory.json';

const instance = new web3.eth.Contract(
    JSON.parse(Factory.interface),
    '0x80d74f9f5B2BB53b61A095e6e659e83A49245644'
);

export default instance;