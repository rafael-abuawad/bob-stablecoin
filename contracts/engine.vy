# pragma version ~=0.4.0
"""
@title `BOBC Engine` Overcollateralized BOB stablecoin
@custom:contract-name engine
@license GNU Affero General Public License v3.0 only
@author rabuawad
"""

# @dev We import  the `IERC20` interface
from .interfaces import IBOBC

# @dev We import the `AggregatorV3` interface.
from .interfaces import IAggregatorV3


# @dev Returns the address of the underlying token
# used for the protocl.
asset: public(immutable(address))


# @dev Stores the ERC-20 interface object of the underlying
# token used for the protocol
_ASSET: immutable(IBOBC)


# @dev Returns the address of the underlying oracle
# used for the protocl.
oracle: public(immutable(address))


# @dev Stores the Aggregator V3 interface object of the underlying
# oravle used for the protocol
_ORACLE: immutable(IAggregatorV3)


# @dev Maximum staletime (timeout) for the oracle,
# set to 10,800 seconds (3 hours).
TIMEOUT: constant(uint256) = 10800


# @dev Liquidation threshold; 50 means assets must be
# 200% over-collateralized to avoid liquidation.
LIQUIDATION_THRESHOLD: constant(uint256) = 50


# @dev Liquidation bonus; set to 10, allowing a 10%
# discount on assets during liquidation.
LIQUIDATION_BONUS: constant(uint256) = 10


# @dev Precision used for liquidation calculations,
# standardized at 100.
LIQUIDATION_PRECISION: constant(uint256) = 100


# @dev Minimum health factor; 1e18 indicates the
# threshold for asset health before liquidation risk.
MIN_HEALTH_FACTOR: constant(uint256) = 10**18


# @dev General calculation precision, typically
# set to 1e18 to minimize rounding errors.
PRECISION: constant(uint256) = 10**18


# @dev Additional precision for feed calculations,
# set at 1e10 for greater granularity.
ADDITIONAL_FEED_PRECISION: constant(uint256) = 10**10


# @dev Base precision for feed data, commonly set
# to 1e8 for accurate token representation.
FEED_PRECISION: constant(uint256) = 10**8


# @dev Mapping of the amount of collateral deposited
# by users
collateralDeposited: public(HashMap[address, uint256])


# @dev Mapping of the amount of BOBC minted by each user.
BOBCMinted: public(HashMap[address, uint256])


# @dev Emitted when collateral is deposited by a user.
event CollateralDeposited:
    amount: indexed(address)
    user: indexed(uint256)


# @dev Emitted when collateral is redeemed.
# @notice If redeemFrom is not equal to redeemTo, it indicates a liquidation.
event CollateralRedeemed:
    redeemTo: indexed(address) 
    redeemFrom: indexed(address) 
    amount: uint256


# @dev We import and initialise the `ownable` module.
from snekmate.auth import ownable as ow
initializes: ow


# @dev We export all `external` functions
# from the `ownable` module.
exports: ow.__interface__


@deploy
@payable
def __init__(asset_: IBOBC, oracle_: IAggregatorV3):
    """
    @dev To omit the opcodes for checking the `msg.value`
         in the creation-time EVM bytecode, the constructor
         is declared as `payable`.
    @param asset_ The IBOBC compatible underlying asset contract.
    @param oracle_ The address of the Chainlink Aggregator V3 oracle contract
           used to provide price feed data for the application.
    @notice The `owner` role will be assigned to
            the `msg.sender`.
    """
    _ASSET = asset_
    asset = _ASSET.address

    _ORACLE = oracle_
    oracle = _ORACLE.address

    # The following line assigns the `owner`
    # to the `msg.sender`.
    ow.__init__()
