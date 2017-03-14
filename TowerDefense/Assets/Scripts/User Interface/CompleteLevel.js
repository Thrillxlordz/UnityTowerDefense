#pragma strict

public var menuSceneName : String = "MainMenu";
public var levelSelectSceneName : String = "LevelSelect";
public var sceneFader : SceneFader;
private var gameManager : GameManager;

// When awakened, updates what level the player has reached
function Awake() {
    gameManager = GameManager.instance;
}

// Continues playing the level, scaling up the difficulty
public function PlayOn() {
    SoundEffects.instance.ButtonClick();
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