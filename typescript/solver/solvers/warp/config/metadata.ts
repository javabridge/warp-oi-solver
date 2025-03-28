
import { BaseMetadataSchema } from '../../types.js';

const metadata = {
  protocolName: 'warp',
  intentSources: [
    {
      address: '0x6588505db402B5BCD66547Cd1A4c982483F2AC64',
      chainName: 'gayoroll',
    },
    {
      address: '0xF1bb1f631636Be2A78BC144f2981995AEaD7BBAC',
      chainName: 'balibeans',
    }
  ]
};

BaseMetadataSchema.parse(metadata);
export default metadata;
