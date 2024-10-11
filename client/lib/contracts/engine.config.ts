export const engineAddress: `0x${string}` =
  "0xbCF26943C0197d2eE0E5D05c716Be60cc2761508";

export const engineContractConfig = {
  address: engineAddress,
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "amount",
          type: "address",
        },
        {
          indexed: true,
          name: "user",
          type: "uint256",
        },
      ],
      name: "CollateralDeposited",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "redeemTo",
          type: "address",
        },
        {
          indexed: true,
          name: "redeemFrom",
          type: "address",
        },
        {
          indexed: false,
          name: "amount",
          type: "uint256",
        },
      ],
      name: "CollateralRedeemed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "previous_owner",
          type: "address",
        },
        {
          indexed: true,
          name: "new_owner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      inputs: [
        {
          name: "new_owner",
          type: "address",
        },
      ],
      name: "transfer_ownership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "renounce_ownership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          name: "amount",
          type: "uint256",
        },
      ],
      name: "get_bob_value",
      outputs: [
        {
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
          name: "amount",
          type: "uint256",
        },
      ],
      name: "get_token_amount_from_bob",
      outputs: [
        {
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
          name: "user",
          type: "address",
        },
      ],
      name: "get_bobc_available",
      outputs: [
        {
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
          name: "user",
          type: "address",
        },
      ],
      name: "get_account_collateral_value",
      outputs: [
        {
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
          name: "user",
          type: "address",
        },
      ],
      name: "get_account_information",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
        {
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
          name: "user",
          type: "address",
        },
      ],
      name: "health_factor",
      outputs: [
        {
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
          name: "amount",
          type: "uint256",
        },
      ],
      name: "deposit_collateral",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          name: "amount",
          type: "uint256",
        },
      ],
      name: "mint_bobc",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          name: "collateral",
          type: "uint256",
        },
        {
          name: "amountToMint",
          type: "uint256",
        },
      ],
      name: "deposit_collateral_and_mint_bobc",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          name: "amountCollateral",
          type: "uint256",
        },
      ],
      name: "redeem_collateral",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          name: "amount",
          type: "uint256",
        },
      ],
      name: "burn_bobc",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          name: "user",
          type: "address",
        },
        {
          name: "debtToCover",
          type: "uint256",
        },
      ],
      name: "liquidate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "asset",
      outputs: [
        {
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "stablecoin",
      outputs: [
        {
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "oracle",
      outputs: [
        {
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          name: "arg0",
          type: "address",
        },
      ],
      name: "collateralDeposited",
      outputs: [
        {
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
          name: "arg0",
          type: "address",
        },
      ],
      name: "bobcMinted",
      outputs: [
        {
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
          name: "stablecoin_",
          type: "address",
        },
        {
          name: "asset_",
          type: "address",
        },
        {
          name: "oracle_",
          type: "address",
        },
      ],
      stateMutability: "payable",
      type: "constructor",
    },
  ],
} as const;
