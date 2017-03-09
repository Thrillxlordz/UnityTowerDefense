#pragma strict

public var menuSceneName : String = "MainMenu";
public var levelSelectSceneName : String = "LevelSelect";
public var levelToUnlock : int = 2;
public var sceneFader : SceneFader;

function Awake() {
	if (PlayerPrefs.GetInt("levelReached") < levelToUnlock) {
		PlayerPrefs.SetInt("levelReached", levelToUnlock);
	}
}

public function PlayOn() {

}

public function Continue() {
    GameManager.gameIsOver = false;
	sceneFader.FadeTo(levelSelectSceneName);
}

public function Menu() {
	sceneFader.FadeTo(menuSceneName);
}