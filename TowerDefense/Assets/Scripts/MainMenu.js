#pragma strict
import UnityEngine.SceneManagement;

public var levelToLoad : String = "MainLevel";

public var sceneFader : SceneFader;

// Takes the player to the level select screen
public function Play() {
	sceneFader.FadeTo(levelToLoad);
}

// Exits the application
public function Quit() {
	Debug.Log("Exiting...");
	Application.Quit();
}