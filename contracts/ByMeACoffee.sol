// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ByMeACoffee {

//event to emit when memo is created
    event newMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );
    //memo struct
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }
    //list of all memos recieved from friends

    Memo[] memos;


    // address of contract deployer

    address payable owner;

    constructor(){
      owner = payable(msg.sender);

       }
      /**
      *@dev buy a coffee for contract ownerr
      *@param _name  name of the coffee buyer
      *@param _message a nice message of coffee buyer
    
       */

    function buyCoffee(string memory _name,string memory _message)public payable{
       require(msg.value >0, "can't buy coffee with 0 eth");
       
       memos.push(Memo(msg.sender,block.timestamp,_name,_message));

       emit newMemo(msg.sender, block.timestamp, _name, _message);
       
}
/**
*@dev send the entire balance stored in the contract to the owner
 */

 function withdrawTips()public{
   require(owner.send(address(this).balance));
 
 }
 function getMemos()public view returns(Memo[] memory){
 
 return memos;
 
 }
}
