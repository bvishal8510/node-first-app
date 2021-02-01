pragma solidity ^0.4.24;

contract MyContract {
    // string public name = 'MyValue';
    // bool public boolValue = true;
    // int public intValue = -1;
    // uint256 public uintValue = 1;   // cannot asign negative value to unsigned int variable
    
    enum State { Waiting, Ready, Active }
    
    State public state;
    
    constructor() public {
        state = State.Waiting;
    }
    
    function Activate() public {
        state = State.Active;
    }
    
    function check() public view returns(bool) {
        return state == State.Active;
    }
}