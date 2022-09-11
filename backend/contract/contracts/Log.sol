// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;


contract Log {
    struct log { 
        uint256 startTime;
        uint256 endTime;
        string[] memberIDs;
        string ID;
        uint256 serviceID;
    }

    mapping(string => log[]) logMap;

    function addLog(uint256 _startTime, uint256 _endTime,string[] memory _memberIDs, string memory _ID, uint256 _serviceID) public {
        log memory s;
        s.startTime = _startTime;
        s.endTime = _endTime;
        s.ID = _ID;
        s.memberIDs = _memberIDs;
        s.serviceID = _serviceID;
        logMap[_ID].push(s);
    }

    function getLog(string memory _ID) public view returns(log[] memory){
        return logMap[_ID];
    }

}