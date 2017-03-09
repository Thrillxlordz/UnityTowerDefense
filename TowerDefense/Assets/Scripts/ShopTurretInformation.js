#pragma strict

public var informationPanel : Transform;
public var turretDescriptions : String[];
@HideInInspector
public static var instance : ShopTurretInformation;
private var shop : Shop;
private var gameManager : GameManager;

/*
    standardStats[0] = Range
    standardStats[1] = Damage
    standardStats[2] = Explosion Damage
    standardStats[3] = DPS
    standardStats[4] = Fire Rate
    standardStats[5] = Slow Amount
    standardStats[6] = Freeze Duration
*/

function Start() {
    instance = this;
    gameManager = GameManager.instance;
    shop = Shop.instance;
    var standardStats : float[] = shop.standardTurret.prefab.GetComponent(Turret).GetTurretStats();
    var bangMcShootyStats : float[] = shop.bangMcShootyTurret.prefab.GetComponent(Turret).GetTurretStats();
    var missileStats : float[] = shop.missileTurret.prefab.GetComponent(Turret).GetTurretStats();
    var freezeStats : float[] = shop.freezeTurret.prefab.GetComponent(Turret).GetTurretStats();
    var laserStats : float[] = shop.laserTurret.prefab.GetComponent(Turret).GetTurretStats();

    informationPanel.GetChild(0).gameObject.GetComponent(UnityEngine.UI.Text).text = turretDescriptions[0] + "\n\nRange: " + standardStats[0] + "\n\nDamage: " + standardStats[1] + "\n\nFireRate: " + standardStats[4] + "/sec";
    informationPanel.GetChild(1).gameObject.GetComponent(UnityEngine.UI.Text).text = turretDescriptions[1] + "\n\nRange: " + bangMcShootyStats[0] + "\n\nDamage: " + bangMcShootyStats[1] + "\n\nFireRate: " + bangMcShootyStats[4] + "/sec";
    informationPanel.GetChild(2).gameObject.GetComponent(UnityEngine.UI.Text).text = turretDescriptions[2] + "\n\nRange: " + missileStats[0] + "\n\nDamage: " + (missileStats[1] + missileStats[2]) + "\n\nSplash Damage: " + missileStats[2] + "\n\nFireRate: " + missileStats[4] + "/sec";
    informationPanel.GetChild(3).gameObject.GetComponent(UnityEngine.UI.Text).text = turretDescriptions[3] + "\n\nRange: " + freezeStats[0] + "\n\nFireRate: " + (1 / gameManager.freezeCooldown).ToString("F2") + "/sec" + "\n\nFreeze Duration: " + freezeStats[6] + " sec";
    informationPanel.GetChild(4).gameObject.GetComponent(UnityEngine.UI.Text).text = turretDescriptions[4] + "\n\nRange: " + laserStats[0] + "\n\nDPS: " + laserStats[3] + "\n\nSlow Amount: " + (laserStats[5] * 100) + "%";

}

public function HoverStandardTurret() {
    informationPanel.gameObject.SetActive(true);
    informationPanel.GetChild(0).gameObject.SetActive(true);
}

public function HoverBangMcShootyTurret() {
    informationPanel.gameObject.SetActive(true);
    informationPanel.GetChild(1).gameObject.SetActive(true);
}

public function HoverMissileTurret() {
    informationPanel.gameObject.SetActive(true);
    informationPanel.GetChild(2).gameObject.SetActive(true);
}

public function HoverFreezeTurret() {
    informationPanel.gameObject.SetActive(true);
    informationPanel.GetChild(3).gameObject.SetActive(true);
}

public function HoverLaserTurret() {
    informationPanel.gameObject.SetActive(true);
    informationPanel.GetChild(4).gameObject.SetActive(true);
}

public function HoverOff() {
    informationPanel.gameObject.SetActive(false);
    for (var i = 0; i < informationPanel.childCount; i++) {
        informationPanel.GetChild(i).gameObject.SetActive(false);
    }

}