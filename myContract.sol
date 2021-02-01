pragma solidity ^0.4.24;

contract MyContract {
    Person[] public people;
    
    int public peopleCount;    // to count numebr of poeple
    
    struct Person {
        string _firstName;
        string _lastName;
    }
    
    function add(string _firstName, string _lastName) public {
        people.push(Person(_firstName, _lastName));
        peopleCount += 1;
    }
}