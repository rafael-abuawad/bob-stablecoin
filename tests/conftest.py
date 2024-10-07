import pytest


@pytest.fixture(scope="module")
def owner(accounts):
    return accounts[0]


@pytest.fixture(scope="module")
def asset(project):
    # WETH on Base
    addr = "0x4200000000000000000000000000000000000006"
    return project.WETH.at(addr)


@pytest.fixture(scope="module")
def oracle():
    return "0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1"


@pytest.fixture(scope="module")
def stablecoin(project, owner):
    return project.bobc.deploy(sender=owner)


@pytest.fixture(scope="module")
def engine(project, stablecoin, asset, oracle, owner):
    engine = project.engine.deploy(stablecoin, asset, oracle, sender=owner)
    stablecoin.set_minter(engine, True, sender=owner)
    return engine
