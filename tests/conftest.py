import pytest


@pytest.fixture(scope="module")
def owner(accounts):
    return accounts[0]


@pytest.fixture(scope="module")
def asset(project, owner):
    return project.token.deploy(
        "Wrapped ETH", "WETH", 18, "wrapped-eth", "0.0.1", sender=owner
    )


@pytest.fixture(scope="module")
def oracle(project, owner):
    return project.mock_v3_aggregator.deploy(8, int(2000e8), sender=owner)


@pytest.fixture(scope="module")
def stablecoin(project, owner):
    return project.token.deploy(
        "Collateralized BOB", "CBOB", 18, "collateralized-bob", "0.0.1", sender=owner
    )


@pytest.fixture(scope="module")
def engine(project, stablecoin, asset, oracle, owner):
    engine = project.engine.deploy(stablecoin, asset, oracle, sender=owner)
    stablecoin.set_minter(engine, True, sender=owner)
    stablecoin.renounce_ownership(sender=owner)
    return engine
