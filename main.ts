import { getHttpEndpoint } from '@orbs-network/ton-access';
import * as dotenv from 'dotenv';
import { TonClient, WalletContractV4, fromNano } from 'ton';
import { mnemonicToWalletKey } from 'ton-crypto';
dotenv.config();

async function main() {
  const mnemonic = process.env.MY_MNEMONIC || '';
  const key = await mnemonicToWalletKey(mnemonic.split(' '));
  const wallet = WalletContractV4.create({
    publicKey: key.publicKey,
    workchain: parseInt(process.env.WORKCHAIN || ''),
  });

  const endpoint = await getHttpEndpoint({ network: 'testnet' });
  const client = new TonClient({ endpoint });

  if (!(await client.isContractDeployed(wallet.address))) {
    console.log('wallet is not deployed');
  }

  const balance = await client.getBalance(wallet.address);
  console.log('balance', fromNano(balance));
}

main();
