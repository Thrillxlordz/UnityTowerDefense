#pragma strict
import UnityEngine.SceneManagement;

public var levelToLoad : String = "MainLevel";

public var sceneFader : SceneFader;

private var displayedTurret : GameObject;

// Randomly picks a menu turret to display
function Start() {
    var turretChoice : int = Random.Range(0, transform.GetChild(0).transform.childCount);
    displayedTurret = transform.GetChild(0).GetChild(turretChoice).gameObject;
    displayedTurret.SetActive(true);
}

// Takes the player to the level select screen
public function Play() {
	sceneFader.FadeTo(levelToLoad);
}

// Exits the application
public function Quit() {
	Debug.Log("Exiting...");
	Application.Quit();
}