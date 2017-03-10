#pragma strict

public static var instance : LevelSelectManager;
public var levelSelectUI : LevelSelectUI;
public var hoveredNode : LevelNode;
public var levelPictures : UnityEngine.Sprite[];

function Start () {
    instance = this;
}

public function HoverNode(node : LevelNode) {
    hoveredNode = node;
    levelSelectUI.SetTarget(hoveredNode);
}

public function NoHover() {
    hoveredNode = null;
    levelSelectUI.Hide();
}

public function GetImage(index : int) : UnityEngine.Sprite {
    return levelPictures[index];
}