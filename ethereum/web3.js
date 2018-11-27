import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    //metamask has inyected web3 in the browser
    web3 = new Web3(window.web3.currentProvider);
    //not handling 2nd november metamask update   
} else {
    //not on the browser or user does not use metamask
    const provider = new Web3.providers.HttpProvider(
        process.env.INFURAKEY
    );
    web3 = new Web3(provider);
}

export default web3;