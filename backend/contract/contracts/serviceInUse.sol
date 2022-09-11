// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

import './Log.sol';

contract InUse is Log{


    struct service1 { 
        uint256 startTime;
        string userID;
        bool inUse;
    }
    uint256 service1Count = 5;
    uint256 service2Count = 5;
    mapping(string => service1) service1Map;
    mapping(string => string) latMap;
    mapping(string => string) longMap;
    mapping(string => string) ipMap;

    function isAllowed(string memory userId, string memory userIp, string memory userLat, string memory userLong) public view returns(bool){
        string memory lat = latMap[userId];
        string memory long = longMap[userId];
        string memory ip = ipMap[userId];
        return (keccak256(abi.encodePacked(lat)) != keccak256(abi.encodePacked(userLat)) || keccak256(abi.encodePacked(long)) != keccak256(abi.encodePacked(userLong))) && keccak256(abi.encodePacked(ip)) != keccak256(abi.encodePacked(userIp));
    }

    function addService1(uint256 _startTime, string memory _userID, string memory _userIp, string memory _userLat, string memory _userLong) public {
        service1 memory s;
        s.startTime = _startTime;
        s.userID = _userID;
        s.inUse = true;
        service1Map[_userID] = s;
        latMap[_userID] = _userLat;
        longMap[_userID] = _userLong;
        ipMap[_userID] = _userIp;
        service1Count -= 1;
    }

    function changeService1(string memory _userID, uint256 _endTime, string[] memory _memberIDs, uint256 _serviceID) public {
        service1Map[_userID].inUse = false;
        latMap[_userID] = "";
        longMap[_userID] = "";
        ipMap[_userID] = "";
        service1Count += 1;

        addLog(service1Map[_userID].startTime, _endTime, _memberIDs, _userID, _serviceID);
    }

    function getService1(string memory _userID) public view returns(bool){
        return service1Map[_userID].inUse;
    }

    struct service2 { 
        uint256 startTime;
        string groupID;
        string userID;
        bool inUse;
    }
    mapping(string => service2) service2Map;

    function addService2(uint256 _startTime, string memory _groupID, string memory _userID, string memory _userIp, string memory _userLat, string memory _userLong) public {
        service2 memory s;
        s.startTime = _startTime;
        s.groupID = _groupID;
        s.userID = _userID;
        s.inUse = true;
        service2Map[_userID] = s;
        latMap[_userID] = _userLat;
        longMap[_userID] = _userLong;
        ipMap[_userID] = _userIp;
        service2Count -= 1;
    }
    function changeService2(string memory _userID, uint256 _endTime, string[] memory _memberIDs, uint256 _serviceID) public {
        service2Map[_userID].inUse = false;
        latMap[_userID] = "";
        longMap[_userID] = "";
        ipMap[_userID] = "";
        service2Count += 1;

        addLog(service2Map[_userID].startTime, _endTime, _memberIDs, service2Map[_userID].groupID, _serviceID);
    }

    function getService2(string memory _userID) public view returns(bool){
        return service2Map[_userID].inUse;
    }

    function getGroupFromService2(string memory _userID) public view returns(string memory){
        return service2Map[_userID].groupID;
    }
    function getService1Count() public view returns (uint256) {
        return service1Count;
    }

    function getService2Count() public view returns (uint256) {
        return service2Count;
    }

}