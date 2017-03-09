#pragma strict

private var buildManager : BuildManager;

function EnableThis() {
    buildManager = BuildManager.instance;

    // Turns the turret settings panel off, then on (In order to create the animation)
    gameObject.SetActive(false);
    gameObject.SetActive(true);

    // mode stores the currently selected turret's fire settings
    var mode : boolean[] = buildManager.selectedNode.turret.GetComponent(Turret).targetMode;

    // Depending on the fire mode of the turret, the text is updated accordingly

    if (mode[0]) {           // The turret is set to target the first enemy
        TargetFirst();
    } else if (mode[1]) {    // The turret is set to target the last enemy
        TargetLast();
    } else if (mode[2]) {    // The turret is set to target the closest enemy
        TargetClosest();
    } else if (mode[3]) {    // The turret is set to target the weakest enemy
        TargetWeakest();
    } else if (mode[4]) {    // The turret is set to target the strongest enemy
        TargetStrongest();
    } else {
        Debug.Log("This Shouldnt have happened (Turret Settings)");
    }
}

// Sets the turret to focus the first enemy
public function TargetFirst() {
    UnselectTargetMode();
    buildManager.selectedNode.turret.GetComponent(Turret).targetMode[0] = true;
    transform.GetChild(0).GetChild(0).GetComponent(UnityEngine.UI.Text).text = "Mode: First";
}

// Sets the turret to focus the last enemy
public function TargetLast() {
    UnselectTargetMode();
    buildManager.selectedNode.turret.GetComponent(Turret).targetMode[1] = true;
    transform.GetChild(0).GetChild(0).GetComponent(UnityEngine.UI.Text).text = "Mode: Last";
}

// Sets the turret to focus the closest enemy
public function TargetClosest() {
    UnselectTargetMode();
    buildManager.selectedNode.turret.GetComponent(Turret).targetMode[2] = true;
    transform.GetChild(0).GetChild(0).GetComponent(UnityEngine.UI.Text).text = "Mode: Closest";
}

// Sets the turret to focus the weakest enemy
public function TargetWeakest() {
    UnselectTargetMode();
    buildManager.selectedNode.turret.GetComponent(Turret).targetMode[3] = true;
    transform.GetChild(0).GetChild(0).GetComponent(UnityEngine.UI.Text).text = "Mode: Weakest";
}

// Sets the turret to focus the strongest enemy
public function TargetStrongest() {
    UnselectTargetMode();
    buildManager.selectedNode.turret.GetComponent(Turret).targetMode[4] = true;
    transform.GetChild(0).GetChild(0).GetComponent(UnityEngine.UI.Text).text = "Mode: Strongest";
}

// Unsets the turret's fire mode. This is done prior to setting its fire mode in order to only have one mode selected
function UnselectTargetMode() {
    for (var i = 0; i < buildManager.selectedNode.turret.GetComponent(Turret).targetMode.Length; i++) {
        buildManager.selectedNode.turret.GetComponent(Turret).targetMode[i] = false;
    }
}