// @author: Kirk Lin
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Forest3 {
    struct Member {
        address memberAddress;
//        已经质押的钱
        uint256 stakeAmount;
        bool hasVoted;
        bool hasCompletedGoal;
        bool hasWithdraw;
        uint256 votesReceived;
    }

    address[] public members;
    string public goal;
    uint256 public stakeAmount;
    uint256 public goalDeadline;
    uint256 public memberLimit;
    bool public votingOpen;
    address public immutable i_owner;

    mapping(address => Member) public memberStatus;

    event GroupCreated(address indexed groupAddress, address[] members, uint256 goal1, uint256 goal2, uint256 stakeAmount);
    event MemberJoined(address indexed groupAddress, address indexed memberAddress);
    event VoteCast(address indexed groupAddress, address indexed memberAddress, bool vote);
    event FundsDistributed(address indexed groupAddress, address indexed memberAddress, uint256 amount);

    constructor(address[] memory _members, string memory _goal, uint256 _stakeAmount, uint256 _memberLimit, uint256 _goalDeadlineDays) {
        i_owner = msg.sender;
        goal = _goal;
        stakeAmount = _stakeAmount;
        memberLimit = _memberLimit;
        goalDeadline = block.timestamp + _goalDeadlineDays * 1 days; // Set a deadline for the goal, e.g., 1 day from now
        votingOpen = false;
        require(msg.value >= stakeAmount, "Incorrect stake amount");
        memberStatus[msg.sender] = Member(msg.sender, msg.value, false, false, 0);
        members.push(msg.sender);
        for (uint256 i = 0; i < _members.length; i++) {
            memberStatus[_members[i]] = Member(_members[i], 0, false, false, 0);
            members.push(_members[i]);
        }
        emit GroupCreated(address(this), _members, 0, 0, _stakeAmount);
    }
    // 允许成员补交他们的质押金额
    function stake() public payable {
        require(msg.value >= stakeAmount, "Incorrect stake amount");
        Member storage member = memberStatus[msg.sender];
        require(member.memberAddress == msg.sender, "Member does not exist");
        member.stakeAmount += msg.value;
    }

    function joinGroup() public external payable {
        require(members.length < memberLimit, "MemberLimitError"); // Assuming a max member limit of 10 for this example
        memberStatus[msg.sender] = Member(msg.sender, msg.value, false, false, 0);
        members.push(msg.sender);

        emit MemberJoined(address(this), msg.sender);
    }

    function castVote(address[] calldata _membersWhoCompleted) external {
//        TODO
//        require(block.timestamp > goalDeadline && block.timestamp <= goalDeadline + 1 days, "Voting period is closed");
//        require(block.timestamp > goalDeadline && !votingOpen, "Voting has already started");
        require(block.timestamp > goalDeadline, "Voting has already started");
        require(memberStatus[msg.sender].memberAddress == msg.sender, "Member not recognized");

        votingOpen = true;
        memberStatus[msg.sender].hasVoted = true;

        for (uint256 i = 0; i < _membersWhoCompleted.length; i++) {
            address member = _membersWhoCompleted[i];
            // 确保投票的是群组内的成员
            bool isMember = false;
            for (uint256 j = 0; j < members.length; j++) {
                if (members[j] == member) {
                    isMember = true;
                    break;
                }
            }
            require(isMember, "One or more addresses voted for are not group members");

            // 为被投票认为完成目标的成员增加投票计数
//            if (memberStatus[member].hasVoted || memberStatus[member].hasCompletedGoal) {
//                continue; // 如果成员已经投票或之前已被标记为完成目标，则跳过
//            }
            memberStatus[member].votesReceived++;
        }

        // 检查是否有超过一半的成员投票
        for (uint256 i = 0; i < members.length; i++) {
            uint256 totalVotes = 0;
            // 如果投票总数超过成员数的一半，则认为被投票的成员完成了目标
            memberStatus[members[i]].hasCompletedGoal = memberStatus[members[i]].votesReceived > (members.length / 2);
        }
        emit VoteCast(address(this), msg.sender, true);
    }

    function withdraw() external {
        require(votingOpen, "Voting not open");
//        1天后才算结算完成，才能取钱。
        require(block.timestamp <= goalDeadline + 1 days, "Voting not completed");
        // 确保成员没有提取过资金
        require(!memberStatus[msg.sender].hasWithdraw, "Funds already withdrawn");

        Member storage member = memberStatus[msg.sender];
//        结算的时候如果用户没完成目标或者没参与投票的不能取钱
        require(member.hasCompletedGoal || member.hasVoted, "FundsNotDistributedError");

        // 计算完成目标或参与投票的成员数量
        uint256 eligibleMembersCount = 0;
        uint256 totalStaked = 0;
        for (uint256 i = 0; i < members.length; i++) {
            totalStaked += memberStatus[members[i]].stakeAmount;
            if (memberStatus[members[i]].hasCompletedGoal || memberStatus[members[i]].hasVoted) {
                eligibleMembersCount++;
            }
        }

        // 计算每个成员可以提取的金额
        uint256 totalStakedByEligibleMembers = totalStaked  / eligibleMembersCount;
        memberStatus[msg.sender].hasWithdraw = true;

        emit FundsDistributed(address(this), msg.sender, totalStakedByEligibleMembers);

        // Transfer the funds to the member
        // Note: Safe transfer functions like SafeERC20 or SafeMath should be used for security
        // Assuming stakeAmount is in the same token as the one used for the transfer
        (bool success,) = msg.sender.call{value: totalStakedByEligibleMembers}("");
        require(success, "Transfer failed");
    }

    function getMemberStatus(address _member) external view returns (Member memory) {
        return memberStatus[_member];
    }

    // Add error handling functions here if needed
    // function MemberLimitError() internal pure {
    //     // Error handling logic
    // }

    // function InvalidVoteError() internal pure {
    //     // Error handling logic
    // }

    // function FundsNotDistributedError() internal pure {
    //     // Error handling logic
    // }
}
