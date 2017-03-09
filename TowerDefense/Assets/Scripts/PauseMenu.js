#pragma strict

public var ui : GameObject;
public var sceneFader : SceneFader;
public var menuSceneName : String = "MainMenu";
public var time : TimeSpeed;
private var t : float = 1f;

function Update() {
	if (GameManager.gameIsOver) {
		return;
	}
	if (Input.GetKeyDown(KeyCode.Escape) || Input.GetKeyDown(KeyCode.P)) {
		Toggle();
	}
}

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

public function Restart() {
	Toggle();
	time.NormalTime();
	sceneFader.FadeTo(SceneManager.GetActiveScene().name);
}

public function Menu() {
	Toggle();
	time.NormalTime();
	sceneFader.FadeTo(menuSceneName);
}