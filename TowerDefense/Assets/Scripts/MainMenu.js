#pragma strict
import UnityEngine.SceneManagement;

public var levelToLoad : String = "MainLevel";

public var sceneFader : SceneFader;

public function Play() {
	sceneFader.FadeTo(levelToLoad);
}

public function Quit() {
	Debug.Log("Exiting...");
	Application.Quit();
}