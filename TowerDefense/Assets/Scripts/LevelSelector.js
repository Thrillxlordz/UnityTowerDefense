#pragma strict

public var fader : SceneFader;
public var levelButtons : UnityEngine.UI.Button[];

function Start() {
	var levelReached : int = PlayerPrefs.GetInt("levelReached", 1);
	for (var i = levelReached; i < levelButtons.Length; i++) {
		levelButtons[i].interactable = false;
	}
}

public function Select(levelName : String) {
	fader.FadeTo(levelName);
}