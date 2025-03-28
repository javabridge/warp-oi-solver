# Warp Open Intent Solver

Warp is the native token bridge's solver that listens for Deposit events in the rollup and creates a withdrawal transaction in the counterparty rollup.

## Warp smartcontract

[Warp Contract]: https://github.com/javabridge/warp-contract

## Description

Warp was created for the Espresso hackathon as a proof of concept (PoC) demonstrating how to use the OpenIntent Framework https://www.openintents.xyz/.

## Metadata

### Rollups

```
const customChainMetadata = {
  gayoroll: {
    domainId: 666,
    name: "gayoroll",
    protocol: "ethereum",
    rpcUrls: [
      {
        http: "https://rpc-gayo-roll.javabridge.fun/",
        pagination: {
          maxBlockRange: 3000,
        },
      },
    ],
    chainId: 666,
  },
  balibeans: {
    domainId: 1312,
    name: "balibeans",
    protocol: "ethereum",
    rpcUrls: [
      {
        http: "https://rpc-bali-beans.javabridge.fun/",
        pagination: {
          maxBlockRange: 3000,
        },
      },
    ],
    chainId: 1312,
  },
};
```

### Deployed Contracts

```
[
    {
      address: '0x6588505db402B5BCD66547Cd1A4c982483F2AC64',
      chainName: 'gayoroll',
    },
    {
      address: '0xF1bb1f631636Be2A78BC144f2981995AEaD7BBAC',
      chainName: 'balibeans',
    }
  ]
```
