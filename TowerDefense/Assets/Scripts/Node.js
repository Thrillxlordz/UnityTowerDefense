#pragma strict
import UnityEngine.EventSystems;

public var hoverColor : Color;
public var notEnoughMoneyColor : Color;
public var positionOffset : Vector3;
@HideInInspector
public var rend : Renderer;
@HideInInspector
public var startColor : Color;
@HideInInspector
public var turret : GameObject;
@HideInInspector
public var hoverTurret : GameObject;
@HideInInspector
public var turretBlueprint : TurretBlueprint;
@HideInInspector
public var isUpgraded : boolean = false;

var buildManager : BuildManager;
var eventSystem : EventSystems.EventSystem;

function Start() {
	rend = GetComponent(Renderer);
	startColor = rend.material.color;
	buildManager = BuildManager.instance;
	/*
	Time.timeScale = 0;
	*/
}

// Returns where this node is, plus an offset
public function GetBuildPosition() : Vector3 {
	return transform.position + positionOffset;
}

// Either selects the node if there is a turret already there, or builds a turret there
function OnMouseDown() {
    /*
    ONLY USE THIS IF YOU NEED TO SCREENSHOT THE LEVEL
    Debug.Log("Capturing");
    Application.CaptureScreenshot("C:\\Users\\Nick\\Downloads\\Unity Coded Games\\UnityTowerDefense\\TowerDefense\\Assets\\LevelSelect\\_LevelImages\\Level26.png");
    */
	
    if (EventSystem.current.IsPointerOverGameObject()) {
		return;
	}

    if (turret != null) {
        SoundEffects.instance.ButtonClick();
		buildManager.SelectNode(this);
		return;
	}

	if (!buildManager.CanBuild()) {
		return;
	}
	SoundEffects.instance.ButtonClick();
	BuildTurret(buildManager.GetTurretToBuild());
}

// Builds a turret on the node if we can afford it
function BuildTurret(blueprint : TurretBlueprint) {

    // Can't afford the turret
	if (PlayerStats.Money < blueprint.cost) {
		return;
	}

	PlayerStats.Money -= blueprint.cost;

    // Creates the turret
	var _turret : GameObject = Instantiate(blueprint.prefab, GetBuildPosition(), transform.rotation);//Quaternion.identity);
	turret = _turret;

    // Disables the turrets range indicator
	turret.transform.GetChild(0).gameObject.SetActive(false); //NOTE: child(0) must be the range indicator sphere
	turret.GetComponent(Turret).isBuilt = true;

	turretBlueprint = blueprint;

    // Displays a build effect
	var effect : GameObject = Instantiate(buildManager.buildEffect, GetBuildPosition(), Quaternion.identity);
	Destroy(effect, 5f);
}

// Hovers a turret on this node. The turret is inactive
function HoverTurretOn(blueprint : TurretBlueprint) {
    var _hoverTurret : GameObject = Instantiate(blueprint.prefab, GetBuildPosition(), transform.rotation);//Quaternion.identity);
	hoverTurret = _hoverTurret;
	var material : Material = (hoverTurret.transform.GetChild(0).gameObject.GetComponent(Renderer) as Renderer).material;
	if (PlayerStats.Money < blueprint.cost) {   // The player can't afford the turret, so it shows a red range indicator
	    material.color = Color.red;
	    material.color.a = 0.2f;
	} else {                                    // The player can afford the turret, so it shows a green range indicator
	    material.color = Color.green;
	    material.color.a = 0.2f;
	}
}

// Destroys the node's hover turret
public function HoverTurretOff() {
    Destroy(hoverTurret);

}

// Upgrades the node's turret
public function UpgradeTurret() {
	if (PlayerStats.Money < turretBlueprint.upgradeCost) {
		return;
	}
	PlayerStats.Money -= turretBlueprint.upgradeCost;
	var mode : boolean[] = turret.GetComponent(Turret).targetMode;
	//Get rid of the old turret
	Destroy(turret);

	//Build a new one
	var _turret : GameObject = Instantiate(turretBlueprint.upgradedPrefab, GetBuildPosition(), Quaternion.identity);
	turret = _turret;

	var effect : GameObject = Instantiate(buildManager.buildEffect, GetBuildPosition(), Quaternion.identity);
	Destroy(effect, 5f);

	isUpgraded = true;
	turret.GetComponent(Turret).isBuilt = true;
	turret.GetComponent(Turret).targetMode = mode;
}

// Sells the node's current turret
public function SellTurret() {
	PlayerStats.Money += turretBlueprint.GetSellAmount(isUpgraded);

	var effect : GameObject = Instantiate(buildManager.sellEffect, GetBuildPosition(), Quaternion.identity);
	Destroy(effect, 5f);

	Destroy(turret);
	turretBlueprint = null;
	isUpgraded = false;
}

// When the player puts their mouse over a node
function OnMouseEnter() {
    
    // If the mouse is over a UI element, stop
	if (EventSystem.current.IsPointerOverGameObject()) {
		return;
	}

    // If the player cannot build on this node, stop
	if (!buildManager.CanBuild()) {
		return;
	}

    // Changes the color of the node, depending on whether or not the player can afford it
	if (buildManager.HasMoney()) {
	    rend.material.color = hoverColor;

	} else {
		rend.material.color = notEnoughMoneyColor;
	}

    // If the node doesn't have a node, hover a turret on the node
	if (turret == null) {
        
	    HoverTurretOn(buildManager.GetTurretToBuild());
	    buildManager.setHoveredNode(this);
	    
	}
}

// If the cursor leaves this node, revert its color to normal
function OnMouseExit() {
	rend.material.color = startColor;
	if (hoverTurret) {
		HoverTurretOff();
	}
}