#pragma strict
import UnityEngine.SceneManagement;

public var sceneFader : SceneFader;
public var menuSceneName : String = "MainMenu";

// Restarts the current scene
public function Retry() {
	sceneFader.FadeTo(SceneManager.GetActiveScene().name);
}

// Sends the player to the main menu
public function Menu() {
	sceneFader.FadeTo(menuSceneName);
}