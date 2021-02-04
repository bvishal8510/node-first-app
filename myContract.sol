pragma solidity 0.5.1;

contract ERC20Token {
    string public name;
    mapping(address => uint256) public balances;
    
    constructor(string memory _name) public {
        name = _name;
    }
    
    function mint() public {
        balances[tx.origin] ++;  // use tx.origin in case of using one inside another
    }
}

contract MyContract is ERC20Token{
    
    string public symbol;
    address[] public owners;
    uint256 ownerCount;
    
    constructor(string memory _name, string memory _symbol) ERC20Token(_name) public {
        symbol = _symbol;
    }
    
    function mint() public {
        super.mint();
        owners.push(msg.sender);
        ownerCount++;
        
    }
    
}