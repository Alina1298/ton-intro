import { Dictionary, toNano } from '@ton/core';
import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import '@ton/test-utils';
import { Map } from '../wrappers/Map';

describe('Map', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let map: SandboxContract<Map>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        // Map тут и есть словарь
        // empty создает пустой Map
        // 1 аргумент - тип ключей
        // 2 аргумент - тип значений
        // 32 бита
        const dict = Dictionary.empty(Dictionary.Keys.BigInt(32), Dictionary.Values.Bool());
        dict.set(1n, true);

        map = blockchain.openContract(await Map.fromInit(dict));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await map.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            },
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: map.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and map are ready to use
    });

    it('should add map', async () => {
        const gasUsed = [];
        for (let i = 0n; i < 100; i++) {
            const res = await getGasUsed(deployer, async () => {
                await map.send(
                    deployer.getSender(),
                    {
                        value: toNano('0.2'),
                    },
                    {
                        $$type: 'Add',
                        key: i,
                        value: i,
                    },
                );
            });

            gasUsed.push(res);
        }

        const items = await map.getAllItem();

        expect(items.values().length).toEqual(100);
        expect(gasUsed[0]).not.toEqual(gasUsed[gasUsed.length - 1]);
    });
});

// Возвращает кол-во газа, потраченного на транзакцию
async function getGasUsed(sender: SandboxContract<TreasuryContract>, message: any) {
    const balance = await sender.getBalance();
    await message();
    return balance - (await sender.getBalance());
}
