def test_initial_setup(engine, asset, oracle, bobc):
    assert asset == engine.asset()
    assert oracle == engine.oracle()
    assert bobc.address == engine.stablecoin()


def test_oracle_get_value(engine):
    value = engine.get_bob_value(1)
    value = int(value*10**18)
    assert (int(1e18) // engine.get_token_amount_from_bob(value)) == 1 # should aprox. 1


def test_mock_weth_deposits(accounts, asset):
    amount = int(1.5e18)
    for account in accounts:
        initial_balance = asset.balanceOf(account)
        asset.deposit(sender=account, value=amount)
        assert asset.balanceOf(account) == initial_balance + amount
