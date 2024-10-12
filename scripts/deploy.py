from ape import accounts, chain, project

ORACLE = "0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1"
ANVIL_CHAINID = 31337


def main():
    # if chain.chain_id in [ANVIL_CHAINID]:
    if False:
        owner = accounts.test_accounts[1]
        oracle = project.mock_v3_aggregator.deploy(8, int(2000e8), sender=owner)
    else:
        owner = accounts.load("bob-deployer")
        owner.set_autosign(True)
        oracle = ORACLE

    # deployments
    asset = project.token.deploy(
        "Wrapped ETH", "WETH", 18, "wrapped-eth", "0.0.1", sender=owner
    )
    stablecoin = project.token.deploy(
        "Collateralized BOB", "CBOB", 18, "collateralized-bob", "0.0.1", sender=owner
    )
    engine = project.engine.deploy(stablecoin, asset, oracle, sender=owner)
    faucet = project.faucet.deploy(asset, sender=owner)

    # asset setup
    asset.set_minter(faucet, True, sender=owner)

    # stablecoin setup
    stablecoin.set_minter(engine, True, sender=owner)
    stablecoin.renounce_ownership(sender=owner)

    # collateral asset setup
    asset.mint(owner, int(10e18), sender=owner)
    asset.approve(engine, int(10e18), sender=owner)

    # deposit collateral
    engine.deposit_collateral(int(10e18), sender=owner)

    # mint stablecoin
    amount = int(engine.get_bobc_available(owner) * 0.4)
    engine.mint_bobc(amount, sender=owner)

    print("--------------------------------------------------")
    print("Asset:", asset)
    print("Stablecoin:", stablecoin)
    print("Engine:", engine)
    print("Oracle:", oracle)
    print("Faucet:", faucet)
