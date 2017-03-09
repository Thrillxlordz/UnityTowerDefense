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
}

public function GetBuildPosition() : Vector3 {
	return transform.position + positionOffset;
}

function OnMouseDown() {
	if (EventSystem.current.IsPointerOverGameObject()) {
		return;
	}

	if (turret != null) {
		buildManager.SelectNode(this);
		return;
	}

	if (!buildManager.CanBuild()) {
		return;
	}

	BuildTurret(buildManager.GetTurretToBuild());
}

function BuildTurret(blueprint : TurretBlueprint) {

	if (PlayerStats.Money < blueprint.cost) {
		return;
	}
	PlayerStats.Money -= blueprint.cost;

	var _turret : GameObject = Instantiate(blueprint.prefab, GetBuildPosition(), Quaternion.identity);
	turret = _turret;

	turret.transform.GetChild(0).gameObject.SetActive(false); //NOTE: child(0) must be the range indicator sphere
	turret.GetComponent(Turret).isBuilt = true;

	turretBlueprint = blueprint;

	var effect : GameObject = Instantiate(buildManager.buildEffect, GetBuildPosition(), Quaternion.identity);
	Destroy(effect, 5f);
}

//Hover turret is on a node, but not created
function HoverTurretOn(blueprint : TurretBlueprint) {
	var _hoverTurret : GameObject = Instantiate(blueprint.prefab, GetBuildPosition(), Quaternion.identity);
	hoverTurret = _hoverTurret;
	var material : Material = (hoverTurret.transform.GetChild(0).gameObject.GetComponent(Renderer) as Renderer).material;
	if (PlayerStats.Money < blueprint.cost) {
	    material.color = Color.red;
	    material.color.a = 0.2f;
	} else {
	    material.color = Color.green;
	    material.color.a = 0.2f;
	}
}

public function HoverTurretOff() {
    Destroy(hoverTurret);

}

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

public function SellTurret() {
	PlayerStats.Money += turretBlueprint.GetSellAmount(isUpgraded);

	var effect : GameObject = Instantiate(buildManager.sellEffect, GetBuildPosition(), Quaternion.identity);
	Destroy(effect, 5f);

	Destroy(turret);
	turretBlueprint = null;
	isUpgraded = false;
}

function OnMouseEnter() {
	if (EventSystem.current.IsPointerOverGameObject()) {
		return;
	}
	if (!buildManager.CanBuild()) {
		return;
	}
	if (buildManager.HasMoney()) {
	    rend.material.color = hoverColor;

	} else {
		rend.material.color = notEnoughMoneyColor;
	}
	if (turret == null) {
        
	    HoverTurretOn(buildManager.GetTurretToBuild());
	    buildManager.setHoveredNode(this);
	    
	}
}



function OnMouseExit() {
	rend.material.color = startColor;
	if (hoverTurret) {
		HoverTurretOff();
	}
}