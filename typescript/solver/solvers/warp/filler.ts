
import type { MultiProvider } from "@hyperlane-xyz/sdk";
import { BaseFiller } from '../BaseFiller.js';
import { metadata, allowBlockLists } from './config/index.js';
import type { WarpMetadata, IntentData, ParsedArgs } from './types.js';
import { log } from '../../logger.js';
import { WarpWallet__factory } from "../../typechain/factories/solvers/warp/contracts/WarpWallet__factory.js";
import {
  type Result,
} from "@hyperlane-xyz/utils";
import { chainIds } from "../../config/index.js";

export class WarpFiller extends BaseFiller<WarpMetadata, ParsedArgs, IntentData> {
  constructor(multiProvider: MultiProvider) {
    super(multiProvider, allowBlockLists, metadata, log);
  }

  protected async retrieveOriginInfo(
    parsedArgs: ParsedArgs,
    chainName: string
  ): Promise<Array<string>> {
    return [`Origin chain: ${chainName}, Sender: ${parsedArgs.senderAddress}`];
  }

  protected async retrieveTargetInfo(
    parsedArgs: ParsedArgs
  ): Promise<Array<string>> {
    return parsedArgs.recipients.map(
      ({ destinationChainName, recipientAddress }) =>
        `Destination chain: ${destinationChainName}, Recipient: ${recipientAddress}`
    );
  }

  protected async fill(
    parsedArgs: ParsedArgs,
    data: IntentData,
    originChainName: string,
    blockNumber: number
  ): Promise<void> {
    this.log.info({
      msg: "Filling Intent",
      intent: `${this.metadata.protocolName}-${parsedArgs.orderId}`,
    });

    const settler = metadata.intentSources.find(item => item.chainName === parsedArgs.recipients[0].destinationChainName);
    if (settler === undefined) {
      throw new Error("No settler found for destination chain");
    }

    const chainId = chainIds[parsedArgs.recipients[0].destinationChainName];
    const filler = this.multiProvider.getSigner(chainId);
    const destination = WarpWallet__factory.connect(
      settler?.address,
      filler,
    );

    const tx = await destination.withdraw(
      parsedArgs.originChainName,
      parsedArgs.senderAddress,
      parsedArgs.recipients[0].recipientAddress,
      parsedArgs.recipients[0].amount,
    );

    const receipt = await tx.wait();
    const baseUrl =
      this.multiProvider.getChainMetadata(chainId).blockExplorers?.[0]
        .url;

    const txInfo = baseUrl
      ? `${baseUrl}/tx/${receipt.transactionHash}`
      : receipt.transactionHash;

    log.info({
      msg: "Filled Intent",
      intent: `${this.metadata.protocolName}-${parsedArgs.orderId}`,
      txDetails: txInfo,
      txHash: receipt.transactionHash,
    });
  }

  protected async prepareIntent(
    parsedArgs: ParsedArgs
  ): Promise<Result<IntentData>> {
    try {
      await super.prepareIntent(parsedArgs);

      return { success: true, data: {} };
    } catch (error: any) {
      return {
        error: error.message ?? "Failed to prepare Warp Intent.",
        success: false,
      };
    }
  }

  protected async settle(
    parsedArgs: ParsedArgs,
    data: IntentData,
    originChainName: string,
    blockNumber: number
  ): Promise<void> {
    // TODO: Implement settlement logic if needed
  }
}

export const create = (multiProvider: MultiProvider) => 
  new WarpFiller(multiProvider).create();
