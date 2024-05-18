export const ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_goal",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_stakeAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_memberLimit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_goalDeadlineSeconds",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "groupAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "memberAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FundsDistributed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "groupAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "goal1",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "goal2",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "stakeAmount",
        type: "uint256",
      },
    ],
    name: "GroupCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "groupAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "memberAddress",
        type: "address",
      },
    ],
    name: "MemberJoined",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "groupAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "memberAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "vote",
        type: "bool",
      },
    ],
    name: "VoteCast",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_membersWhoCompleted",
        type: "address[]",
      },
    ],
    name: "castVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_member",
        type: "address",
      },
    ],
    name: "getMemberStatus",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "memberAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "stakeAmount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "hasVoted",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "hasCompletedGoal",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "hasWithdraw",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "votesReceived",
            type: "uint256",
          },
        ],
        internalType: "struct Forest3.Member",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "goal",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "goalDeadline",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "i_owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "joinGroup",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "memberLimit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "memberStatus",
    outputs: [
      {
        internalType: "address",
        name: "memberAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "stakeAmount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "hasVoted",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "hasCompletedGoal",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "hasWithdraw",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "votesReceived",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "members",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stakeAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
