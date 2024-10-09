from ape import accounts, chain, project

ORACLE = "0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1"
WETH = "0x4200000000000000000000000000000000000006"

BASE_SEPOLIA_CHAINID = 84532
ANVIL_CHAINID = 31337


def main():
    if chain.chain_id in [BASE_SEPOLIA_CHAINID, ANVIL_CHAINID]:
        owner = accounts.test_accounts[1]
    else:
        owner = accounts.load("bobc-deployer")

    weth = project.WETH.at(WETH)
    stablecoin = project.bobc.deploy(sender=owner)
    engine = project.engine.deploy(stablecoin, weth, ORACLE, sender=owner)
    stablecoin.set_minter(engine, True, sender=owner)

    weth.deposit(value=int(10e18), sender=owner)
    weth.approve(engine, int(8e18), sender=owner)

    engine.deposit_collateral(int(8e18), sender=owner)

    bobc = engine.get_bobc_avialable(owner)
    print(bobc)
    engine.mint_bobc(bobc, sender=owner)
