#pragma strict

import UnityEngine.SceneManagement;

public static var gameIsOver : boolean;
public var gameOverUI : GameObject;
public var completeLevelUI : GameObject;
public var time : TimeSpeed;
public var freezeCooldown : float = 2f;
public var timeToNextFreeze : float = freezeCooldown;
public static var instance : GameManager;
private var levelToUnlock : int;

// Creates a static instance of itself, which is used in many other scripts
function Awake() {
	if (instance != null) {
		Debug.Log("More than one GameManager in scene");
	}
	instance = this;
}

function Start() {
	gameIsOver = false;
	var levelName : String = SceneManager.GetActiveScene().name;
	levelToUnlock = parseInt(levelName.Substring(5, 2)) + 1;
}

function Update () {
	if (gameIsOver) {
		return;
	}

    // Controls the global freeze turret timer. When the timer is reached, every freeze turret on the map freezes their surrounding area
	if (timeToNextFreeze > 0) {
		timeToNextFreeze -= Time.deltaTime;
	} else {
		timeToNextFreeze = freezeCooldown;
	}

	if (PlayerStats.Lives <= 0) {
		EndGame();
	}
}

// Ends the game, activating the game over UI
function EndGame() {
	time.NormalTime();
	gameIsOver = true;
	gameOverUI.SetActive(true);
	UpdateRoundsRecord();
}

// Wins the level, activating the win level UI
public function WinLevel() {
	time.NormalTime();
	gameIsOver = true;
	completeLevelUI.SetActive(true);
	UpdateRoundsRecord();
}

public function PlayOn() {
    WaveSpawner.Enable();
    CameraController.Enable();
    completeLevelUI.SetActive(false);
    gameIsOver = false;
}

function UpdateRoundsRecord() {
    var levelName : String = SceneManager.GetActiveScene().name;
    if (PlayerStats.Rounds > PlayerPrefs.GetInt(levelName, 0)) {
        PlayerPrefs.SetInt(levelName, PlayerStats.Rounds);
    }
}

function UpdateLevelRecord() {
	if (PlayerPrefs.GetInt("levelReached") < levelToUnlock) {
		PlayerPrefs.SetInt("levelReached", levelToUnlock);
	}
}