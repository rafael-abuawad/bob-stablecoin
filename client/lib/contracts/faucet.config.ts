export const faucetAddress: `0x${string}` =
  "0x2AB5d7A0009b0409A422587A6B0ff18f40a8Cec6";

export const faucetContractConfig = {
  address: faucetAddress,
  abi: [
    {
      inputs: [
        {
          name: "to",
          type: "address",
        },
        {
          name: "amount",
          type: "uint256",
        },
      ],
      name: "mint",
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
      inputs: [
        {
          name: "_asset",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
  ],
} as const;
