# pragma version ~=0.4.0
"""
@title `BOBC` Overcollateralized BOB stablecoin
@custom:contract-name bobc
@license GNU Affero General Public License v3.0 only
@author rabuawad
"""


# @dev We import and implement the `IERC20` interface,
# which is a built-in interface of the Vyper compiler.
from ethereum.ercs import IERC20
implements: IERC20


# @dev We import and implement the `IERC20Detailed` interface,
# which is a built-in interface of the Vyper compiler.
from ethereum.ercs import IERC20Detailed
implements: IERC20Detailed


# @dev We import and implement the `IERC20Permit`
# interface, which is written using standard Vyper
# syntax.
from snekmate.tokens.interfaces import IERC20Permit
implements: IERC20Permit


# @dev We import and implement the `IERC5267` interface,
# which is written using standard Vyper syntax.
from snekmate.utils.interfaces import IERC5267
implements: IERC5267


# @dev We import and initialise the `ownable` module.
from snekmate.auth import ownable as ow
initializes: ow


# @dev We import and initialise the `erc20` module.
from snekmate.tokens import erc20
initializes: erc20[ownable := ow]


# @dev We export all `external` functions
# from the `erc20` module. 
exports: erc20.__interface__


# @dev The following two parameters are required for the Echidna
# fuzzing test integration: https://github.com/crytic/properties.
isMintableOrBurnable: public(constant(bool)) = True
initialSupply: public(uint256)


@deploy
@payable
def __init__():
    """
    @dev To omit the opcodes for checking the `msg.value`
         in the creation-time EVM bytecode, the constructor
         is declared as `payable`.
    @notice The initial supply of the token as well
            as the `owner` role will be assigned to
            the `msg.sender`.
           string name of the token.
           string symbol of the token.
    """
    ow.__init__()

    name_: String[25] = "Collateralized BOB"
    symbol_: String[5] = "BOBC"
    decimals_: uint8 = 18
    name_eip712_: String[50] = "collateralized-bob"
    version_eip712_: String[20] = "v.0.01"
    erc20.__init__(name_, symbol_, decimals_, name_eip712_, version_eip712_)


# @dev Duplicate implementation of the `external` function
# `burn_from` to enable the Echidna tests for the external
# burnable properties.
@external
def burnFrom(owner: address, amount: uint256):
    """
    @dev Destroys `amount` tokens from `owner`,
         deducting from the caller's allowance.
    @notice Note that `owner` cannot be the
            zero address. Also, the caller must
            have an allowance for `owner`'s tokens
            of at least `amount`.
    @param owner The 20-byte owner address.
    @param amount The 32-byte token amount to be destroyed.
    """
    erc20._spend_allowance(owner, msg.sender, amount)
    erc20._burn(owner, amount)