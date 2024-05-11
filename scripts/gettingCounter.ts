import { NetworkProvider } from '@ton/blueprint';
import { toNano } from '@ton/core';
import { FirstContract } from '../wrappers/FirstContract';

export async function run(provider: NetworkProvider) {
    const firstContract = provider.open(await FirstContract.fromInit(54325n));

	const counter = await firstContract.getCounter();
	const id = await firstContract.getId();
}
