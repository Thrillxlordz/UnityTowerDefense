#pragma strict

public class TurretBlueprint extends System.Object {
	public var prefab : GameObject;
	public var cost : int;

	public var upgradedPrefab : GameObject;
	public var upgradeCost : int;
}

public function GetSellAmount(isUpgraded : boolean) : int {
	if (isUpgraded) {
		return ((cost + upgradeCost) / 4);
	} else {
		return (cost / 4);
	}
}