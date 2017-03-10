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

// Each of these functions gives the BuildManager script the selected turret
public function SelectStandardTurret() {
    SoundEffects.instance.ButtonClick();
	buildManager.SelectTurretToBuild(standardTurret);
}

public function SelectMissileTurret() {
    SoundEffects.instance.ButtonClick();
	buildManager.SelectTurretToBuild(missileTurret);
}

public function SelectLaserTurret() {
    SoundEffects.instance.ButtonClick();
	buildManager.SelectTurretToBuild(laserTurret);
}

public function SelectFreezeTurret() {
    SoundEffects.instance.ButtonClick();
	buildManager.SelectTurretToBuild(freezeTurret);
}

public function SelectBangMcShootyTurret() {
    SoundEffects.instance.ButtonClick();
    buildManager.SelectTurretToBuild(bangMcShootyTurret);
}