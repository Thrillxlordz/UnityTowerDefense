#pragma strict

private var target : LevelNode;
public var canvasOffset : Vector3;
public var canvas : GameObject;

public function SetTarget(_target : LevelNode) {
    target = _target;
    
    var levelName : String = (target.levelNumber < 10) ? ("Level0" + target.levelNumber) : ("Level" + target.levelNumber);
    
    transform.position = target.transform.position + canvasOffset;
    canvas.SetActive(true);
    canvas.transform.GetChild(0).GetComponent(UnityEngine.UI.Image).sprite = LevelSelectManager.instance.GetImage(target.levelNumber - 1);
    canvas.transform.GetChild(1).GetChild(0).GetComponent(UnityEngine.UI.Text).text = "Furthest Round: " + PlayerPrefs.GetInt(levelName, 0);
}

public function Hide() {
    canvas.SetActive(false);
}