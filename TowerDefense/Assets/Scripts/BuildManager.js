#pragma strict

public static var instance : BuildManager;

function Awake() {
	if (instance != null) {
		Debug.Log("More than one BuildManager in scene");
	}
	instance = this;
}

public var buildEffect : GameObject;
public var sellEffect : GameObject;

private var turretToBuild : TurretBlueprint;
@HideInInspector
public var selectedNode : Node;
public var nodeUI : NodeUI;
public var turretSettings : TurretSettings;

public function HasMoney() : boolean {
	return PlayerStats.Money >= turretToBuild.cost;
}

public function CanBuild() : boolean {
	return turretToBuild != null;
}

public function SelectNode(node : Node) {
	if (selectedNode == node) {
		DeselectNode();
		return;
	}

	if (selectedNode != null && selectedNode.turretBlueprint != null) {
		selectedNode.turret.GetComponent(Turret).rangeIndicator.SetActive(false);
	}

	selectedNode = node;
	turretToBuild = null;
	if (!selectedNode.turret.GetComponent(Turret).isFreezeTurret) {
	    turretSettings.EnableThis();
	}

	if (selectedNode.turretBlueprint != null) {
		selectedNode.turret.GetComponent(Turret).rangeIndicator.SetActive(true);
	}

	nodeUI.SetTarget(node);
}

public function DeselectNode() {
	if (selectedNode != null && selectedNode.turretBlueprint != null) {
		selectedNode.turret.GetComponent(Turret).rangeIndicator.SetActive(false);
	}
	selectedNode = null;
	nodeUI.Hide();
	turretSettings.gameObject.SetActive(false);
}

public function SelectTurretToBuild(turret : TurretBlueprint) {
	turretToBuild = turret;
	DeselectNode();
}

public function GetTurretToBuild() : TurretBlueprint {
	return turretToBuild;
}