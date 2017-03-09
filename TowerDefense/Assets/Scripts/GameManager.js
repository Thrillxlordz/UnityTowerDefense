#pragma strict

public static var gameIsOver : boolean;
public var gameOverUI : GameObject;
public var completeLevelUI : GameObject;
public var time : TimeSpeed;
public var freezeCooldown : float = 2f;
public var timeToNextFreeze : float = freezeCooldown;
public static var instance : GameManager;

function Awake() {
	if (instance != null) {
		Debug.Log("More than one GameManager in scene");
	}
	instance = this;
}

function Start() {
	gameIsOver = false;
}

function Update () {
	if (gameIsOver) {
		return;
	}

	if (timeToNextFreeze > 0) {
		timeToNextFreeze -= Time.deltaTime;
	} else {
		timeToNextFreeze = freezeCooldown;
	}

	if (PlayerStats.Lives <= 0) {
		EndGame();
	}
}

function EndGame() {
	time.NormalTime();
	gameIsOver = true;
	gameOverUI.SetActive(true);
}

public function WinLevel() {
	time.NormalTime();
	gameIsOver = true;
	completeLevelUI.SetActive(true);
}