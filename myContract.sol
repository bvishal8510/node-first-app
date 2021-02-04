pragma solidity ^0.4.24;

contract MyContract {
    int public peopleCount = 0;    // to count numebr of poeple
    mapping(int => Person) public people;
    
    uint256 opentime = 1612445530;
    
    modifier aftertime() {
        require(block.timestamp >= opentime);
        _;
    }
    
    struct Person {
        string _firstName;
        string _lastName;
    }
    
    function add(string _firstName, string _lastName) public aftertime{
        increament();
        people[peopleCount] = Person(_firstName, _lastName);
    }
    
    function increament() internal {
        peopleCount += 1;
    }
}