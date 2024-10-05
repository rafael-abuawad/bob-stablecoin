from ape import accounts, project

def test_engine():
    sender = accounts.test_accounts[-1]
    asset = "0x4200000000000000000000000000000000000006"
    oracle = "0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1"

    bobc = project.bobc.deploy(sender=sender)
    engine = project.engine.deploy(bobc, asset, oracle, sender=sender)

    assert asset == engine.asset()
    assert oracle == engine.oracle()
    assert bobc.address == engine.stablecoin()

    print(engine.get_bob_value(1))
    print(engine.get_token_amount_from_bob(int(100*10**18)))
