#pragma strict

public var standardTurret : TurretBlueprint;
public var missileTurret : TurretBlueprint;
public var laserTurret : TurretBlueprint;
public var freezeTurret : TurretBlueprint;
public var bangMcShootyTurret : TurretBlueprint;
@HideInInspector
public static var instance : Shop;
private var buildManager : BuildManager;

function Start() {
    instance = this;
    buildManager = BuildManager.instance;
}

public function SelectStandardTurret() {
	buildManager.SelectTurretToBuild(standardTurret);
}

public function SelectMissileTurret() {
	buildManager.SelectTurretToBuild(missileTurret);
}

public function SelectLaserTurret() {
	buildManager.SelectTurretToBuild(laserTurret);
}

public function SelectFreezeTurret() {
	buildManager.SelectTurretToBuild(freezeTurret);
}

public function SelectBangMcShootyTurret() {
    buildManager.SelectTurretToBuild(bangMcShootyTurret);
}