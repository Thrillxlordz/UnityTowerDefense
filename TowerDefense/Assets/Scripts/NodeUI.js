#pragma strict

private var target : Node;

public var canvas : GameObject;
public var stats : GameObject;

public var upgradeCost : UnityEngine.UI.Text;
public var upgradeButton : UnityEngine.UI.Button;

public var sellAmount : UnityEngine.UI.Text;

function Update() {
	if (target == null || target.turretBlueprint == null) {
		return;
	}
	if (PlayerStats.Money < target.turretBlueprint.upgradeCost) {
		upgradeButton.colors.normalColor = new Color(100, 0, 0, 206.0/255);
	} else {
		upgradeButton.colors.normalColor = new Color(29.0/255, 41.0/255, 71.0/255, 206.0/255);
	}
}

public function SetTarget(_target : Node) {
	target = _target;

	transform.position = target.GetBuildPosition();

	if (!target.isUpgraded) {
		upgradeCost.text = "\n$" + target.turretBlueprint.upgradeCost.ToString();
		upgradeButton.interactable = true;
	} else {
		upgradeCost.text = "\nMAX";
		upgradeButton.interactable = false;
	}
	canvas.SetActive(true);

	sellAmount.text = "\n$" + target.turretBlueprint.GetSellAmount(target.isUpgraded);
}

public function Hide() {
	canvas.SetActive(false);
	stats.SetActive(false);
}

public function Upgrade() {
	target.UpgradeTurret();
	BuildManager.instance.DeselectNode();
}

public function Sell() {
	target.SellTurret();
	BuildManager.instance.DeselectNode();
}

public function UpgradeHoverEnable() {
	stats.SetActive(true);
	var statsPanel : Transform = stats.transform.GetChild(0);
	var turretStats : float[] = target.turretBlueprint.prefab.GetComponent(Turret).GetTurretStats();
	var upgradedTurretStats : float[] = target.turretBlueprint.upgradedPrefab.GetComponent(Turret).GetTurretStats();
	var stats : GameObject[] = [statsPanel.GetChild(0).gameObject, statsPanel.GetChild(1).gameObject, statsPanel.GetChild(2).gameObject, statsPanel.GetChild(3).gameObject, statsPanel.GetChild(4).gameObject, statsPanel.GetChild(5).gameObject, statsPanel.GetChild(6).gameObject];
	var statNames : String[] = ["Range: ", "Damage: ", "Splash Damage: ", "DPS: ", "Fire Rate: ", "Slow Amount: ", "Freeze Duration: "];

	for (var i = 0; i < stats.Length; i++) {
		if (turretStats[i] != upgradedTurretStats[i]) {
		    stats[i].SetActive(true);
		    if (i == 5) {
		        (stats[i].GetComponent(UnityEngine.UI.Text) as UnityEngine.UI.Text).text = statNames[i] + "" + (turretStats[i] * 100) + "% -> " + (upgradedTurretStats[i] * 100) + "%";
		    } else {
		        (stats[i].GetComponent(UnityEngine.UI.Text) as UnityEngine.UI.Text).text = statNames[i] + "" + turretStats[i] + " -> " + upgradedTurretStats[i];
		    }
		} else {
			stats[i].SetActive(false);
		}
	}
}

public function UpgradeHoverDisable() {
	stats.SetActive(false);
}