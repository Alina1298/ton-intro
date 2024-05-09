import { toNano } from '@ton/core';
import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import '@ton/test-utils';
import { FirstContract } from '../wrappers/FirstContract';

describe('FirstContract', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let firstContract: SandboxContract<FirstContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        firstContract = blockchain.openContract(await FirstContract.fromInit(1000n));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await firstContract.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: firstContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and firstContract are ready to use
    });

    it('should increase', async () => {
        const counterBefore = await firstContract.getCounter()
        console.log('counterBefore', counterBefore)

        await firstContract.send(
            deployer.getSender(),
            {
                value: toNano('0.02')
            },
            'increment'
        )

        const counterAfter = await firstContract.getCounter();
        console.log('counterAfter', counterAfter)

        expect(counterBefore).toBeLessThan(counterAfter)
    });

    it('should increase with amount', async () => {
        const counterBefore = await firstContract.getCounter()
        console.log('counterBeforeAmount', counterBefore)

        const amount = 5n;

        await firstContract.send(
            deployer.getSender(),
            {
                value: toNano('0.02')
            },
            {
                amount,
                $$type: 'Add',
            }
        )

        const counterAfter = await firstContract.getCounter();
        console.log('counterAfterAmount', counterAfter)

        expect(counterBefore).toBeLessThan(counterAfter)
    });
});
