// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;
import "https://github.com/bacalhau-project/lilypad-v0/blob/main/hardhat/contracts/LilypadEventsUpgradeable.sol";
import "https://github.com/bacalhau-project/lilypad-v0/blob/main/hardhat/contracts/LilypadCallerInterface.sol";
import "hardhat/console.sol";

contract LilypadDataHackathon is LilypadCallerInterface {
    address public bridgeAddress;
    LilypadEventsUpgradeable bridge;
    uint256 public lilypadFee;
    address public owner;  // The owner's address


    constructor(address _bridgeContractAddress) {
        bridgeAddress = _bridgeContractAddress;
        bridge = LilypadEventsUpgradeable(_bridgeContractAddress);
        uint fee = bridge.getLilypadFee();
        lilypadFee = fee;

        owner = msg.sender;
    }

    mapping(address => string) public jobResults;
    mapping(uint256 => address) public jobIDs;

    // Removed Results structure and related array as they are not needed anymore

    event NewResult(address caller, string result);


    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    function GetScore() external payable {
        require(msg.value >= lilypadFee, "Not enough to run Lilypad job");

        string memory targetAddress = addressToString(msg.sender);

        string memory spec = string(abi.encodePacked(
            "{",
            '"Engine": "Docker",',
            '"Verifier": "Noop",',
            '"Publisher": "Estuary",',
            '"PublisherSpec": {"Type": "Estuary"},',
            '"Docker": {"Image": "dogukangun/datahackathon:go", "EnvironmentVariables": ["TARGET_ADDRESS=',
            targetAddress,
            '"]},',
            '"Language": {"JobContext": {}},',
            '"Wasm": {"EntryModule": {}},',
            '"Resources": {"GPU": ""},',
            '"Network": {"Type": "HTTP", "Domains": ["eth.public-rpc.com"]},',
            '"Timeout": 1800,',
            '"Outputs": [{"StorageSource": "IPFS", "Name": "outputs", "Path": "/outputs"}],',
            '"Deal": {"Concurrency": 1}',
            "}"
        ));

        uint id = bridge.runLilypadJob{value: lilypadFee}(address(this), spec, uint8(LilypadResultType.CID));
        require(id > 0, "job didn't return a value");

        jobIDs[id] = msg.sender;
    }

    function lilypadFulfilled(
        address _from,
        uint256 _jobId,
        LilypadResultType _resultType,
        string calldata _result
    ) external override {
        require(_from == address(bridge)); 
        require(_resultType == LilypadResultType.CID);

        console.log("Job Id: ", _jobId, " has been fulfilled with result: ", _result);

        // Save the CID against the caller's address
        jobResults[jobIDs[_jobId]] = _result;
        emit NewResult(jobIDs[_jobId], _result);
        delete jobIDs[_jobId];
    }

    function lilypadCancelled(
        address _from,
        uint256 _jobId,
        string calldata _errorMsg
    ) external override {
        require(_from == address(bridge)); 
        console.log(_errorMsg);
        delete jobIDs[_jobId];
    }
}