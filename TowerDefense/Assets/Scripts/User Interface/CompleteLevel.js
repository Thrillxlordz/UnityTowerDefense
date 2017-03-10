#pragma strict

public var menuSceneName : String = "MainMenu";
public var levelSelectSceneName : String = "LevelSelect";
public var levelToUnlock : int = 2;
public var sceneFader : SceneFader;
public var gameManager : GameManager;

// When awakened, updates what level the player has reached
function Awake() {
    gameManager = GameManager.instance;
	if (PlayerPrefs.GetInt("levelReached") < levelToUnlock) {
		PlayerPrefs.SetInt("levelReached", levelToUnlock);
	}
}

// Continues playing the level, scaling up the difficulty
public function PlayOn() {
    gameManager.PlayOn();
}

// Sends the player to the level select scene
public function Continue() {
    GameManager.gameIsOver = false;
	sceneFader.FadeTo(levelSelectSceneName);
}

// Sends the player to the main menu scene
public function Menu() {
    GameManager.gameIsOver = false;
	sceneFader.FadeTo(menuSceneName);
}