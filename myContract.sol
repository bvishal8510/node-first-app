pragma solidity ^0.4.24;

contract MyContract {
    int public peopleCount = 0;    // to count numebr of poeple
    mapping(int => Person) public people;
    
    address owner;
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    constructor() public {
        owner = msg.sender;
    }
    
    struct Person {
        string _firstName;
        string _lastName;
    }
    
    function add(string _firstName, string _lastName) public onlyOwner{
        increament();
        people[peopleCount] = Person(_firstName, _lastName);
    }
    
    function increament() internal {
        peopleCount += 1;
    }
}