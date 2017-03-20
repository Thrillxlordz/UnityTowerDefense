#pragma strict
import UnityEngine.SceneManagement;

public var menuSceneName : String = "MainMenu";

// Restarts the current scene
public function Retry() {
    SoundEffects.instance.ButtonClick();
	SceneFader.instance.FadeTo(SceneManager.GetActiveScene().name);
}

// Sends the player to the main menu
public function Menu() {
    SoundEffects.instance.ButtonClick();
	SceneFader.instance.FadeTo(menuSceneName);
}