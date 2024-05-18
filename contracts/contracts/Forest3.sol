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
    address public immutable i_owner;

    mapping(address => Member) public memberStatus;

    event GroupCreated(address indexed groupAddress, uint256 goal1, uint256 goal2, uint256 stakeAmount);
    event MemberJoined(address indexed groupAddress, address indexed memberAddress);
    event VoteCast(address indexed groupAddress, address indexed memberAddress, bool vote);
    event FundsDistributed(address indexed groupAddress, address indexed memberAddress, uint256 amount);

    constructor(string memory _goal, uint256 _stakeAmount, uint256 _memberLimit, uint256 _goalDeadlineSeconds) payable {
        i_owner = msg.sender;
        goal = _goal;
        stakeAmount = _stakeAmount;
        memberLimit = _memberLimit;
        goalDeadline = block.timestamp + _goalDeadlineSeconds * 1 seconds; // Set a deadline for the goal, e.g., 1 day from now
        require(msg.value >= stakeAmount, "Incorrect stake amount");
        memberStatus[msg.sender] = Member(msg.sender, msg.value, false, false, false, 0);
        members.push(msg.sender);
        emit GroupCreated(address(this), 0, 0, _stakeAmount);
    }

    function joinGroup() external payable {
        require(members.length < memberLimit, "MemberLimitError"); // Assuming a max member limit of 10 for this example
//        需要members里不存在这个人才能加入。也就是不能重复加入
// TODO Check if the sender is not already a member
        require(memberStatus[msg.sender].memberAddress == address(0), "Member already exists");
        require(msg.value >= stakeAmount, "Incorrect stake amount");
        memberStatus[msg.sender] = Member(msg.sender, msg.value, false, false, false, 0);
        members.push(msg.sender);

        emit MemberJoined(address(this), msg.sender);
    }

    // 辅助函数，用于计算开启投票后的截止时间
    function getSettlementDeadline() internal view returns (uint256) {
        return goalDeadline + 1 days;
    }

    function castVote(address[] calldata _membersWhoCompleted) external {
        require(block.timestamp > goalDeadline && block.timestamp < getSettlementDeadline(), "voting not start yet");
//        群组里应该得有这个人才能投票
        require(memberStatus[msg.sender].memberAddress == msg.sender, "Member not recognized");
        require(!memberStatus[msg.sender].hasVoted, "You have already voted");
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
            memberStatus[member].votesReceived++;

//            ======================================================
            // 计算完成目标或参与投票的成员数量
            uint256 eligibleMembersCount = 0;
            for (uint256 k = 0; k < members.length; k++) {
                if (memberStatus[members[k]].hasCompletedGoal || memberStatus[members[k]].hasVoted) {
                    eligibleMembersCount++;
                }
            }
            for (uint256 l = 0; l < members.length; l++) {
                // 如果投票总数超过成员数的一半，则认为被投票的成员完成了目标
                if (memberStatus[members[l]].votesReceived > eligibleMembersCount / 2) {
                    memberStatus[members[l]].hasCompletedGoal = true;
                }
            }
        }
        emit VoteCast(address(this), msg.sender, true);
    }

    function withdraw() external {
//        1天后才算结算完成，才能取钱。
        require(block.timestamp > getSettlementDeadline(), "Voting not completed");
        // 确保成员没有提取过资金
        require(!memberStatus[msg.sender].hasWithdraw, "Funds already withdrawn");

        Member storage member = memberStatus[msg.sender];
//        结算的时候如果用户没完成目标或者没参与投票的不能取钱
        require(member.hasCompletedGoal && member.hasVoted, "FundsNotDistributedError");

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
        uint256 totalStakedByEligibleMembers = totalStaked / eligibleMembersCount;
        memberStatus[msg.sender].hasWithdraw = true;

        emit FundsDistributed(address(this), msg.sender, totalStakedByEligibleMembers);

        // Transfer the funds to the member
        // Note: Safe transfer functions like SafeERC20 or SafeMath should be used for security
        // Assuming stakeAmount is in the same token as the one used for the transfer
        (bool success,) = msg.sender.call{value: totalStakedByEligibleMembers}("");
        require(success, "Transfer failed");
    }

    function checkMember(address _address) external view returns (bool) {
        // 遍历成员数组
        for (uint256 i = 0; i < members.length; i++) {
            if (members[i] == _address) {
                return true; // 如果找到地址，返回true
            }
        }
        return false; // 如果没有找到地址，返回false
    }

    function getMemberStatus(address _member) external view returns (Member memory) {
        return memberStatus[_member];
    }

    function getAllMemberStatus() external view returns (Member[] memory) {
        // 创建一个新的Member数组，大小与成员数量相同
        Member[] memory allMembersStatus = new Member[](members.length);
        // 遍历成员数组
        for (uint256 i = 0; i < members.length; i++) {
            // 使用成员地址作为索引从memberStatus映射中获取成员状态，并存储到数组中
            allMembersStatus[i] = memberStatus[members[i]];
        }
        // 返回包含所有成员状态的数组
        return allMembersStatus;
    }

    function getAllMembers() external view returns (address[] memory) {
        // 直接返回成员地址数组
        return members;
    }
}
