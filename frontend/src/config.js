const constants = {
    SERVER_URL: "http://localhost:8000",
    PROVIDER: "http://localhost:7545",
    IN_USE_CONTRACT_ADDRESS: "0xA297702B6e2360e2aFA0D71DfD324E1824A0B406",
    
    IN_USE_CONTRACT_ABI: [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_startTime",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_endTime",
                    "type": "uint256"
                },
                {
                    "internalType": "string[]",
                    "name": "_memberIDs",
                    "type": "string[]"
                },
                {
                    "internalType": "string",
                    "name": "_ID",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_serviceID",
                    "type": "uint256"
                }
            ],
            "name": "addLog",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_startTime",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_userID",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_userIp",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_userLat",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_userLong",
                    "type": "string"
                }
            ],
            "name": "addService1",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_startTime",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_groupID",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_userID",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_userIp",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_userLat",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_userLong",
                    "type": "string"
                }
            ],
            "name": "addService2",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_userID",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_endTime",
                    "type": "uint256"
                },
                {
                    "internalType": "string[]",
                    "name": "_memberIDs",
                    "type": "string[]"
                },
                {
                    "internalType": "uint256",
                    "name": "_serviceID",
                    "type": "uint256"
                }
            ],
            "name": "changeService1",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_userID",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_endTime",
                    "type": "uint256"
                },
                {
                    "internalType": "string[]",
                    "name": "_memberIDs",
                    "type": "string[]"
                },
                {
                    "internalType": "uint256",
                    "name": "_serviceID",
                    "type": "uint256"
                }
            ],
            "name": "changeService2",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_userID",
                    "type": "string"
                }
            ],
            "name": "getGroupFromService2",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_ID",
                    "type": "string"
                }
            ],
            "name": "getLog",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "startTime",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "endTime",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string[]",
                            "name": "memberIDs",
                            "type": "string[]"
                        },
                        {
                            "internalType": "string",
                            "name": "ID",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "serviceID",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct Log.log[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_userID",
                    "type": "string"
                }
            ],
            "name": "getService1",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getService1Count",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_userID",
                    "type": "string"
                }
            ],
            "name": "getService2",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getService2Count",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "userId",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "userIp",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "userLat",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "userLong",
                    "type": "string"
                }
            ],
            "name": "isAllowed",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
}

export default constants;