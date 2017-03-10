#pragma strict

public var levelNumber : int;
public var sceneFader : SceneFader;
private var levelReached : int;
private var rend : Renderer;

// Checks what level the player has reached. If the button this script is attached to is connected to a level the player cannot access, it disables the button.
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

// When the mouse enters this button, change the color
public function OnMouseEnter() {
    LevelSelectManager.instance.HoverNode(this);
	if (levelNumber <= levelReached) {
		rend.material.color = Color.gray;
	}
}

// When the moves leaves this button, revert the color
public function OnMouseExit() {
    LevelSelectManager.instance.NoHover();
	if (levelNumber <= levelReached) {
		rend.material.color = Color.white;
	}
}

// Sends the player to the level attached to the button
public function SelectLevel() {
    SoundEffects.instance.ButtonClick();
	var scene : String = (levelNumber < 10) ? ("Level0" + levelNumber) : ("Level" + levelNumber);
	sceneFader.FadeTo(scene);
	if (levelNumber >= 100) {
	Debug.Log("Level number exceeded 100, go to the LevelNode script, and update the SelectLevel() function");
	}
}