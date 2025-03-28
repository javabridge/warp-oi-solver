import { z } from "zod";

import { chainMetadata as defaultChainMetadata } from "@hyperlane-xyz/registry";

import type { ChainMap, ChainMetadata } from "@hyperlane-xyz/sdk";
import { ChainMetadataSchema } from "@hyperlane-xyz/sdk";

import { objMerge } from "@hyperlane-xyz/utils";

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

const chainMetadata = objMerge<ChainMap<ChainMetadata>>(
  defaultChainMetadata,
  customChainMetadata,
  10,
  true,
);

z.record(z.string(), ChainMetadataSchema).parse(chainMetadata);

export { chainMetadata };
