#pragma strict

private var buildManager : BuildManager;

function EnableThis() {
    buildManager = BuildManager.instance;
    gameObject.SetActive(false);
    gameObject.SetActive(true);
    var mode : boolean[] = buildManager.selectedNode.turret.GetComponent(Turret).targetMode;  // Need to save mode for upgraded version
    if (mode[0]) {
        TargetFirst();
    } else if (mode[1]) {
        TargetLast();
    } else if (mode[2]) {
        TargetClosest();
    } else if (mode[3]) {
        TargetWeakest();
    } else if (mode[4]) {
        TargetStrongest();
    } else {
        Debug.Log("This Shouldnt have happened (Turret Settings)");
    }
}

public function TargetFirst() {
    UnselectTargetMode();
    buildManager.selectedNode.turret.GetComponent(Turret).targetMode[0] = true;
    transform.GetChild(0).GetChild(0).GetComponent(UnityEngine.UI.Text).text = "Mode: First";
}

public function TargetLast() {
    UnselectTargetMode();
    buildManager.selectedNode.turret.GetComponent(Turret).targetMode[1] = true;
    transform.GetChild(0).GetChild(0).GetComponent(UnityEngine.UI.Text).text = "Mode: Last";
}

public function TargetClosest() {
    UnselectTargetMode();
    buildManager.selectedNode.turret.GetComponent(Turret).targetMode[2] = true;
    transform.GetChild(0).GetChild(0).GetComponent(UnityEngine.UI.Text).text = "Mode: Closest";
}

public function TargetWeakest() {
    UnselectTargetMode();
    buildManager.selectedNode.turret.GetComponent(Turret).targetMode[3] = true;
    transform.GetChild(0).GetChild(0).GetComponent(UnityEngine.UI.Text).text = "Mode: Weakest";
}

public function TargetStrongest() {
    UnselectTargetMode();
    buildManager.selectedNode.turret.GetComponent(Turret).targetMode[4] = true;
    transform.GetChild(0).GetChild(0).GetComponent(UnityEngine.UI.Text).text = "Mode: Strongest";
}

function UnselectTargetMode() {
    for (var i = 0; i < buildManager.selectedNode.turret.GetComponent(Turret).targetMode.Length; i++) {
        buildManager.selectedNode.turret.GetComponent(Turret).targetMode[i] = false;
    }
}