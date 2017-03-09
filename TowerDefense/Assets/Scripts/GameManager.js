#pragma strict

public static var gameIsOver : boolean;
public var gameOverUI : GameObject;
public var completeLevelUI : GameObject;
public var time : TimeSpeed;
public var freezeCooldown : float = 2f;
public var timeToNextFreeze : float = freezeCooldown;
public static var instance : GameManager;

// Creates a static instance of itself, which is used in many other scripts
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
}

// Wins the level, activating the win level UI
public function WinLevel() {
	time.NormalTime();
	gameIsOver = true;
	completeLevelUI.SetActive(true);
}