#pragma strict

public var fader : SceneFader;
public var levelButtons : UnityEngine.UI.Button[];

// Checks every button in the level select screen, disabling any level button that the player should not be able to access yet
function Start() {
	var levelReached : int = PlayerPrefs.GetInt("levelReached", 1);
	for (var i = levelReached; i < levelButtons.Length; i++) {
		levelButtons[i].interactable = false;
	}
}

// Sends the player to a level, depending on which button is pressed
public function Select(levelName : String) {
	fader.FadeTo(levelName);
}