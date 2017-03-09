#pragma strict

// Holds the information of a turret
public class TurretBlueprint extends System.Object {
    // Basic turret info
	public var prefab : GameObject;
	public var cost : int;

    // Upgraded turret info
	public var upgradedPrefab : GameObject;
	public var upgradeCost : int;
}

// Returns how much the turret is worth on sale
public function GetSellAmount(isUpgraded : boolean) : int {
	if (isUpgraded) {
		return ((cost + upgradeCost) / 4);
	} else {
		return (cost / 4);
	}
}