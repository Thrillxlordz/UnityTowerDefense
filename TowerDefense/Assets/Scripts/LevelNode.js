#pragma strict

public var levelNumber : int;
public var sceneFader : SceneFader;
private var levelReached : int;
private var rend : Renderer;

function Start() {
	levelReached = PlayerPrefs.GetInt("levelReached", 1);
	rend = GetComponent(Renderer);
	if (levelNumber <= levelReached) {
		rend.material.color = Color.white;
		transform.GetChild(0).GetChild(0).GetComponent(UnityEngine.UI.Button).interactable = true;
	} else {
		rend.material.color = Color.black;
		transform.GetChild(0).GetChild(0).GetComponent(UnityEngine.UI.Button).interactable = false;
	}
	transform.GetChild(0).GetChild(0).GetChild(0).GetComponent(UnityEngine.UI.Text).text = levelNumber.ToString();
}

public function onHoverEnter() {
	if (levelNumber <= levelReached) {
		rend.material.color = Color.gray;
	}
}

public function OnHoverExit() {
	if (levelNumber <= levelReached) {
		rend.material.color = Color.white;
	}
}

public function SelectLevel() {
	var scene : String = (levelNumber < 10) ? ("Level0" + levelNumber) : ("Level" + levelNumber);
	sceneFader.FadeTo(scene);
	if (levelNumber >= 100) {
	Debug.Log("Level number exceeded 100, go to the LevelNode script, and update the SelectLevel() function");
	}
}