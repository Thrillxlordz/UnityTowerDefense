#pragma strict

public var ui : GameObject;
public var menuSceneName : String = "MainMenu";
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
		TimeSpeed.instance.Pause();
	} else if (t == 0.5f) {
		TimeSpeed.instance.HalfTime();
	} else if (t == 2f) {
		TimeSpeed.instance.DoubleTime();
	} else {
		TimeSpeed.instance.NormalTime();
	}
}

// Restarts the current scene
public function Restart() {
	Toggle();
	TimeSpeed.instance.NormalTime();
	SceneFader.instance.FadeTo(SceneManager.GetActiveScene().name);
	//sceneFader.FadeTo(SceneManager.GetActiveScene().name);
}

// Takes the user to the menu
public function Menu() {
    Toggle();
	TimeSpeed.instance.NormalTime();
	SceneFader.instance.FadeTo(menuSceneName);
}