#pragma strict

private var target : Node;

public var canvas : GameObject;
public var stats : GameObject;

public var upgradeCost : UnityEngine.UI.Text;
public var upgradeButton : UnityEngine.UI.Button;

public var sellAmount : UnityEngine.UI.Text;

// Checks if the player has a node selected, and if that selected node has a turret. If yes, then it updates the "Upgrade" button's color, depending on if the player can purchase the upgrade
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

// Moves the NodeUI element so that it is over the selected node
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

// Disables the Node UI, typically this means that no node is selected
public function Hide() {
	canvas.SetActive(false);
	stats.SetActive(false);
}

// Upgrades the turret on the node which the NodeUI is currently linked to
public function Upgrade() {
	target.UpgradeTurret();
	BuildManager.instance.DeselectNode();
}

// Sells the turret on the node which the NodeUI is currently linked to
public function Sell() {
	target.SellTurret();
	BuildManager.instance.DeselectNode();
}

// If the user is hovering the upgrade button, display all the relevant stats about the upgrade
public function UpgradeHoverEnable() {
    stats.SetActive(true);

    // The panel with all the text stored as children
    var statsPanel : Transform = stats.transform.GetChild(0);

    // Gets the stats of the turret on the node
    var turretStats : float[] = target.turretBlueprint.prefab.GetComponent(Turret).GetTurretStats();

    // Gets the stats of the turret's upgraded form
    var upgradedTurretStats : float[] = target.turretBlueprint.upgradedPrefab.GetComponent(Turret).GetTurretStats();

    // Allows access to each text element in our stats panel
	var stats : GameObject[] = [statsPanel.GetChild(0).gameObject, statsPanel.GetChild(1).gameObject, statsPanel.GetChild(2).gameObject, statsPanel.GetChild(3).gameObject, statsPanel.GetChild(4).gameObject, statsPanel.GetChild(5).gameObject, statsPanel.GetChild(6).gameObject];
	var statNames : String[] = ["Range: ", "Damage: ", "Splash Damage: ", "DPS: ", "Fire Rate: ", "Slow Amount: ", "Freeze Duration: "];

	for (var i = 0; i < stats.Length; i++) {
	    if (turretStats[i] != upgradedTurretStats[i]) { // Checks if the current stat is being improved
		    stats[i].SetActive(true);
		    if (i == 5) {   // Makes a specific change to the slow amount text
		        (stats[i].GetComponent(UnityEngine.UI.Text) as UnityEngine.UI.Text).text = statNames[i] + "" + (turretStats[i] * 100) + "% -> " + (upgradedTurretStats[i] * 100) + "%";
		    } else {        // The generic print format for the upgrade info
		        (stats[i].GetComponent(UnityEngine.UI.Text) as UnityEngine.UI.Text).text = statNames[i] + "" + turretStats[i] + " -> " + upgradedTurretStats[i];
		    }
		} else {                                        // If it is not being improved, disable the text
			stats[i].SetActive(false);
		}
	}
}

// Turns off the stats panel UI
public function UpgradeHoverDisable() {
	stats.SetActive(false);
}