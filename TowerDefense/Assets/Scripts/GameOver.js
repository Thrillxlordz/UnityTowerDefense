#pragma strict
import UnityEngine.SceneManagement;

public var sceneFader : SceneFader;
public var menuSceneName : String = "MainMenu";

public function Retry() {
	sceneFader.FadeTo(SceneManager.GetActiveScene().name);
}

public function Menu() {
	sceneFader.FadeTo(menuSceneName);
}