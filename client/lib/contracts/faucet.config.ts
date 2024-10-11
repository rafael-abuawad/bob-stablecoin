export const faucetAddress: `0x${string}` =
  "0x59F2f1fCfE2474fD5F0b9BA1E73ca90b143Eb8d0";

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
