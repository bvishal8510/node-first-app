pragma solidity ^0.4.24;

contract MyContract {
    int public peopleCount = 0;    // to count numebr of poeple
    mapping(int => Person) public people;
    
    struct Person {
        string _firstName;
        string _lastName;
    }
    
    function add(string _firstName, string _lastName) public {
        peopleCount += 1;
        people[peopleCount] = Person(_firstName, _lastName);
    }
}