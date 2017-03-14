#pragma strict
import UnityEngine.SceneManagement;

public var levelToLoad : String = "MainLevel";

public var sceneFader : SceneFader;

public var cam : GameObject;

public var shopPanel : GameObject;

private var shopDirection : Vector3 = new Vector3(0, 120, 0);
private var displayedTurret : GameObject;
private var isTurningRight : boolean = false;
private var isTurningLeft : boolean = false;
private var degreesTurned : float = 0f;

// Randomly picks a menu turret to display
function Start() {
    var turretChoice : int = Random.Range(0, transform.GetChild(0).transform.childCount);
    displayedTurret = transform.GetChild(0).GetChild(turretChoice).gameObject;
    displayedTurret.SetActive(true);
}

function Update() {
	if (Quaternion.Angle(cam.transform.rotation, Quaternion.Euler(shopDirection)) < 60f) {
		shopPanel.gameObject.SetActive(true);
	} else {
		shopPanel.gameObject.SetActive(false);
	}
	if (degreesTurned > 0) {
		if (degreesTurned >= 120) {
			degreesTurned = 0;
			isTurningRight = false;
			isTurningLeft = false;
		}
		return;
	}
	if (isTurningRight) {
		StartCoroutine(TurningRight());
	} else if (isTurningLeft) {
		StartCoroutine(TurningLeft());
	}
}

// Takes the player to the level select screen
public function Play() {
    sceneFader.FadeTo(levelToLoad);
}

// Exits the application
public function Quit() {
    Debug.Log("Exiting...");
    SoundEffects.instance.ButtonClick();
	Application.Quit();
}

public function TurnRight() {
	if (!isTurningRight && !isTurningLeft) {
		SoundEffects.instance.ButtonClick();
    	isTurningRight = true;
    	isTurningLeft = false;
    }
}

public function TurnLeft() {
	if (!isTurningRight && !isTurningLeft) {
		SoundEffects.instance.ButtonClick();
    	isTurningRight = false;
    	isTurningLeft = true;
    }
}

function TurningRight() {
	for (var i = 0; i < 60; i++) {
		degreesTurned += (120.0/60);
		cam.transform.eulerAngles = new Vector3(cam.transform.eulerAngles.x, cam.transform.eulerAngles.y + (120.0/60), cam.transform.eulerAngles.z);
		yield WaitForSeconds(0.01f);
	}
}

function TurningLeft() {
	for (var i = 0; i < 60; i++) {
		degreesTurned += (120.0/60);
		cam.transform.eulerAngles = new Vector3(cam.transform.eulerAngles.x, cam.transform.eulerAngles.y - (120.0/60), cam.transform.eulerAngles.z);
		yield WaitForSeconds(0.01f);
	}
}