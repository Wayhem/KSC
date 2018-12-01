import web3 from './web3';
import Factory from './build/Factory.json';

const instance = new web3.eth.Contract(
    JSON.parse(Factory.interface),
    '0x3c7D0E3B1f82BF6a53a832c6E51bbc62B505EeDf'
);

export default instance;