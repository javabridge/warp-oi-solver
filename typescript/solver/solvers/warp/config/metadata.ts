
import { BaseMetadataSchema } from '../../types.js';

const metadata = {
  protocolName: 'warp',
  intentSources: [
    {
      address: '0x6588505db402B5BCD66547Cd1A4c982483F2AC64',
      chainName: 'gayoroll',
    },
    {
      address: '0x8Cc95d71a3797EB91De1E288A04Ebd26F12B2939',
      chainName: 'balibeans',
    }
  ]
};

BaseMetadataSchema.parse(metadata);
export default metadata;
