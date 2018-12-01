pragma solidity ^0.4.25;

contract Factory{
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint yesCount;
        mapping(address => bool) approvals;
    }
    
    Request[] public requests;
    address public manager;
    uint public minimumContri;
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    modifier restricted(){
        require(
            msg.sender == manager,
            "Operation restricted for manager use"
            );
        _;
    }
    
    constructor(uint minimum, address sender) public {
        manager = sender;
        minimumContri = minimum;
    }
    
    function contribute() public payable{
        require(
            msg.value > minimumContri,
            "Minimal contribution not reached"
            );
        if (approvers[msg.sender] == false){
            approvers[msg.sender] = true;
            approversCount++;
        }
    }
    
    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            yesCount: 0
        });
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(
            approvers[msg.sender],
            "Not a contributor to the campaign"
            );
        require(
            !request.approvals[msg.sender],
            "Already approved request"
            );
        
        request.approvals[msg.sender] = true;
        request.yesCount++;
    }
    
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        
        require(
            request.yesCount > (approversCount / 2),
            "Not enough approvals from contributors"
        );
        require(
            !request.complete,
            "Request already completed"
            );
        
        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
        uint, uint, uint, uint, address
    ) {
        return (
            minimumContri,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestCount() public view returns (uint) {
        return requests.length;
    }
}
