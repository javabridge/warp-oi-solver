
import z from 'zod';
import { BaseMetadataSchema, BaseIntentData } from '../types.js';
import type { ParsedArgs as BaseParsedArgs } from '../BaseFiller.js';
import { type BigNumber } from "ethers";

export const WarpMetadataSchema = BaseMetadataSchema.extend({
  // Add any additional metadata fields here if needed
});

export type WarpMetadata = z.infer<typeof WarpMetadataSchema>;

export interface IntentData extends BaseIntentData {
  // Add your intent data fields here
}

export interface ParsedArgs extends BaseParsedArgs {
  orderId: string;
  originChainName: string;
  senderAddress: string;
  recipients: Array<{
    destinationChainName: string;
    recipientAddress: string;
    amount: BigNumber;
  }>;
  // Add any additional parsed args fields here
}
