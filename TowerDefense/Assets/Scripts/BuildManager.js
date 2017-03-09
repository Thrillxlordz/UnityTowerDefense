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
@HideInInspector
public var hoveredNode : Node;
public var nodeUI : NodeUI;
public var turretSettings : TurretSettings;

// Returns whether or not the player can afford the current turret
public function HasMoney() : boolean {
	return PlayerStats.Money >= turretToBuild.cost;
}

// Returns whether or not the player has a selected turret
public function CanBuild() : boolean {
	return turretToBuild != null;
}

function Update() {
    if (Input.GetMouseButtonDown(1)) {
        // Right click has occured
        
        hoveredNode.HoverTurretOff();
        hoveredNode.rend.material.color = hoveredNode.startColor;
        
        turretToBuild = null;
        DeselectNode();
    }
}

//Allows us to access the hovered node from the Node.js Script
public function setHoveredNode(node : Node) {
    hoveredNode = node;
}

// Selects a node
public function SelectNode(node : Node) {
    
    // If the selected node is the same node we already selected, deselect the node
	if (selectedNode == node) {
		DeselectNode();
		return;
	}

    // These next 3 lines might be redundant
    // If there is already a turret on the previosly selected node, disable its range indicator
	if (selectedNode != null && selectedNode.turretBlueprint != null) {
		selectedNode.turret.GetComponent(Turret).rangeIndicator.SetActive(false);
	}

	selectedNode = node;
	turretToBuild = null;

    // If the turret is not a freeze turret, activate the turret settings panel
	if (!selectedNode.turret.GetComponent(Turret).isFreezeTurret) {
	    turretSettings.EnableThis();
	}
    
    // If the node has a turret, activate its range indicator
	if (selectedNode.turretBlueprint != null) {
		selectedNode.turret.GetComponent(Turret).rangeIndicator.SetActive(true);
	}

    // Moves the nodeUI so that it is on top of the selected node
	nodeUI.SetTarget(selectedNode);
}

// Unselects the node that this script is currently storing
public function DeselectNode() {

    // If the node has a turret, disable its range indicator
	if (selectedNode != null && selectedNode.turretBlueprint != null) {
		selectedNode.turret.GetComponent(Turret).rangeIndicator.SetActive(false);
	}

    // Unselects the node, and disables the nodeUI and turret settings panels
	selectedNode = null;
	nodeUI.Hide();
	turretSettings.gameObject.SetActive(false);
}

// Stores the players choice of a turret to build, and unselects the selected nodes
public function SelectTurretToBuild(turret : TurretBlueprint) {
	turretToBuild = turret;
	DeselectNode();
}

// Returns the players choice of a turret to build
public function GetTurretToBuild() : TurretBlueprint {
	return turretToBuild;
}