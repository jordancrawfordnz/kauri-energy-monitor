# About the B42SOC algorithm

Kauri uses the B42SOC algorithm to determine the state of charge of an off-grid system's battery from the a series of connected energy sensors. This is based off the earlier B3SOC algorithm.

## How B3SOC works
**For a full explaination of B3SOC, see ["Tracking battery state-of-charge in a continuous use off-grid electricity system", 2013](https://researchcommons.waikato.ac.nz/handle/10289/8567)**

Apperley & Alahmari (2013) developed the Black Box Battery State of Charge (B3SOC) algorithm. B3SOC does not rely on inaccurate measures of state of charge, like the battery voltage or methods which rely on the chemistry of the battery. Instead, B3SOC uses coulomb counting methods coupled with known events for re-calibration to produce an estimate. The algorithm is designed for continuous use situations, like those in renewable energy systems.

The algorithm treats a battery as a container that can store some upper limit of energy, and applies charge efficiency when energy is stored in the battery (consuming electricity is assumed to have no energy loss). The voltage and current of the battery are used to determine the amount of energy added or removed from the battery since the last reading. The state of charge is the ratio of the amount of energy in the battery and its capacity.

The state of charge is affected by the charge efficiency and the battery capacity. The algorithm is dependent on having appropriate techniques for recalibrating these values relatively frequently.

### Charge efficiency calibration
A low voltage disconnect (LVD) is initiated by an inverter to prevent the battery level getting low enough that it could damage the battery. A LVD occurs when the battery voltage is below a defined limit for a period of time. An LVD provides an opportunity to re-assess the zero charge level, and recalibrate those parameters which determine charge level - particularly the charge efficiency. If the state of charge is greater than 5% and an LVD event occurs, the charge efficiency is too high and should be re-calculated. If the state of charge becomes less than ~5% but no LVD event occurs, the charge efficiency is too low and should be re-calculated.

Charge efficiency is calculated as the ratio of the amount of energy flowing into the battery in the last seven days and the amount of energy out over this time (taking into account the amount of energy already in the battery seven days ago).

### Battery capacity calibration

If the amount of energy in the battery exceeds its apparent capacity (i.e: SoC > 100%), the battery capacity value will be recalibrated upwards to match its current amount of energy. However, downwards recalibration is more difficult, since the only indication of the battery becoming fully charged is a charger back-off event, when the charger thinks the battery is nearing full capacity. These events are unreliable, so instead, the capacity value is decremented by 2% daily allowing recalibrations upwards to occur if the capacity is too low.

## How B42SOC works
The Better Black-Box Battery Simplified State of Charge (B42SOC) algorithm is based on the B3SOC algorithm. This was implemented by Apperley (2016) and tested with data collected throughout the development of Kauri.

Relative to B3SOC, the key changes in B42SOC are:

* A preliminary phase occurs until the battery is first fully depleted. No charge efficiency re-calibrations are performed throughout this phase. If the charge level drops below zero, the charge capacity is increased as this represents capacity that was previously unseen by the algorithm’s arbitrary starting point. The maximum charge level throughout the preliminary phase is recorded.

* When the battery is depleted the system leaves the preliminary phase. When this happens, the charge capacity is set to the maximum charge level seen throughout the preliminary phase.

* In the operational phase, the total energy in (before it is multiplied by charge efficiency) and out of the battery since the last charge efficiency calculation is stored. When the battery is expected to be empty but no LVD occurs or an LVD occurs when it is not expected, the charge efficiency is calculated. This is calculated as the energy out since the last calculation, divided by the energy in since the last calculation. However, each of these figures must be greater than some multiple of the charge capacity. Throughout development, this was set to eight times the charge capacity to ensure this covers about a week worth of usage. If the values since the last calculation are not large enough, the energy in and out since the second to last calculation is used. This prevents charge efficiency values from being too extreme if they do not cover enough history. This can happen if the algorithm detects several low battery events within a few hours.

The battery is defined as being empty when:

* The inverter output is off, as this means LVD event occurred.

* Or, the battery is below the critical low voltage level (23.1V used throughout development) and the load power is less than the high power threshold (500W used throughout development) for the low voltage trigger time (50s used throughout development).

To prevent calibration events from being performed too often, events based on the state of charge allow for error with the tolerance percentage. Throughout development, a tolerance percentage of 10% was used. This means the charge capacity will only increase at 110% SoC and the battery is expected to be empty between -10% and 10% SoC.