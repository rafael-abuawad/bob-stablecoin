import ape


def test_initial_setup(engine, asset, oracle, stablecoin):
    assert asset == engine.asset()
    assert oracle == engine.oracle()
    assert stablecoin.address == engine.stablecoin()


def test_oracle_get_value(engine):
    value = engine.get_bob_value(1)
    value = int(value * 10**18)
    assert (
        int(1e18) // engine.get_token_amount_from_bob(value)
    ) == 1  # should aprox. 1


def test_mock_weth_deposits(accounts, asset):
    amount = int(1.5e18)
    for account in accounts:
        initial_balance = asset.balanceOf(account)
        asset.deposit(sender=account, value=amount)
        assert asset.balanceOf(account) == initial_balance + amount


def test_deposit_collateral(accounts, asset, engine):
    initial_balance = asset.balanceOf(engine)
    assert initial_balance == 0

    amount = int(1.5e18)
    for account in accounts:
        asset.deposit(sender=account, value=amount)
        asset.approve(engine, amount, sender=account)
        engine.deposit_collateral(amount, sender=account)

    expected_final_balanace = int(15e18)
    final_balance = asset.balanceOf(engine)
    assert final_balance == expected_final_balanace


def test_deposit_collateral_and_mint_bobc(accounts, asset, stablecoin, engine):
    amount = int(1.5e18)
    collateral = engine.get_bob_value(amount)
    accesible_collateral = int(collateral * 0.45) # 45% collateral minted
    breaks_health_factor = int(collateral * 0.06) # 51% collateral minted (breaks)

    for account in accounts:
        asset.deposit(sender=account, value=amount)
        asset.approve(engine, amount, sender=account)
        engine.deposit_collateral(amount, sender=account)

        print("Health factor", engine.health_factor(account))
        print("Account information", engine.get_account_information(account))

        assert stablecoin.balanceOf(account) == 0
        engine.mint_bobc(accesible_collateral, sender=account)
        assert stablecoin.balanceOf(account) == accesible_collateral

        print("Health factor", engine.health_factor(account))
        print("Account information", engine.get_account_information(account))

        with ape.reverts():
            engine.mint_bobc(breaks_health_factor, sender=account)
