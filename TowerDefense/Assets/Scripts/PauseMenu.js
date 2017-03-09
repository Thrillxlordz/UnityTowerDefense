#pragma strict

public var ui : GameObject;
public var sceneFader : SceneFader;
public var menuSceneName : String = "MainMenu";
public var time : TimeSpeed;
private var t : float = 1f;

// If the game is not over, and the user presses "escape" or "p", pause the game
function Update() {
	if (GameManager.gameIsOver) {
		return;
	}
	if (Input.GetKeyDown(KeyCode.Escape) || Input.GetKeyDown(KeyCode.P)) {
		Toggle();
	}
}

// Turns on the pause screen UI
public function Toggle() {
	ui.SetActive(!ui.activeSelf);
	if (ui.activeSelf) {
		t = Time.timeScale;
		time.Pause();
	} else if (t == 0.5f) {
		time.HalfTime();
	} else if (t == 2f) {
		time.DoubleTime();
	} else {
		time.NormalTime();
	}
}

// Restarts the current scene
public function Restart() {
	Toggle();
	time.NormalTime();
	sceneFader.FadeTo(SceneManager.GetActiveScene().name);
}

// Takes the user to the menu
public function Menu() {
	Toggle();
	time.NormalTime();
	sceneFader.FadeTo(menuSceneName);
}