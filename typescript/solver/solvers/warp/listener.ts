
import { BaseListener } from '../BaseListener.js';
import { WarpWallet__factory } from "../../typechain/factories/solvers/warp/contracts/WarpWallet__factory.js";
import { metadata } from './config/index.js';
import type { ParsedArgs } from './types.js';
import { log } from '../../logger.js';
import { BigNumber } from "ethers";

export class WarpListener extends BaseListener<any, any, ParsedArgs> {
  constructor() {
    super(
      WarpWallet__factory,
      'Deposit',
      { contracts: [...metadata.intentSources], protocolName: metadata.protocolName },
      log
    );
  }

  protected parseEventArgs(args: any): ParsedArgs {
    return {
      orderId: args.id,
      originChainName: args.origChainName,
      senderAddress: args.sender,
      recipients: [{
        destinationChainName: args.destChainName,
        recipientAddress: args.recipient,
        amount: BigNumber.from(args.amount)
      }]
    };
  }
}

export const create = () => new WarpListener().create();
