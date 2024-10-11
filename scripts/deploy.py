from ape import accounts, chain, project

ORACLE = "0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1"
ANVIL_CHAINID = 31337


def main():
    if chain.chain_id in [ANVIL_CHAINID]:
        owner = accounts.test_accounts[1]
    else:
        owner = accounts.load("bobc-deployer")
    
    owner.transfer("0x42c19c96AD3de77f0eE4f923a2Ab361053e0e9C4", int(0.05e18))

    # deployments
    print("---Oracle deployed")
    oracle = project.mock_v3_aggregator.deploy(8, int(2000e8), sender=owner)

    print("---Asset deployed")
    asset = project.token.deploy(
        "Wrapped ETH", "WETH", 18, "wrapped-eth", "0.0.1", sender=owner
    )

    print("---Stablecoin deployed")
    stablecoin = project.token.deploy(
        "Collateralized BOB", "CBOB", 18, "collateralized-bob", "0.0.1", sender=owner
    )

    print("---Engine deployed")
    engine = project.engine.deploy(stablecoin, asset, oracle, sender=owner)

    print("---Faucet deployed")
    faucet = project.faucet.deploy(asset, sender=owner)

    # asset setup
    asset.set_minter(faucet, True, sender=owner)

    # stablecoin setup
    stablecoin.set_minter(engine, True, sender=owner)
    stablecoin.renounce_ownership(sender=owner)

    # collateral asset setup
    asset.mint(owner, int(10e18), sender=owner)
    asset.approve(engine, int(8e18), sender=owner)

    # deposit collateral
    engine.deposit_collateral(int(8e18), sender=owner)

    # mint stablecoin
    amount = int(engine.get_bobc_available(owner) * 0.4)
    engine.mint_bobc(amount, sender=owner)
