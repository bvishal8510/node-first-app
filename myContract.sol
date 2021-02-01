pragma solidity ^0.4.24;

contract MyContract {
    string public value = 'MyValue';
    
    function setValue(string _value) public {
        value = _value;
    } 
}