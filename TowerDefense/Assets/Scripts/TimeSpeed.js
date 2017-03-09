#pragma strict

public var pause : UnityEngine.UI.Image;
public var halfTime : UnityEngine.UI.Image;
public var normalTime : UnityEngine.UI.Image;
public var doubleTime : UnityEngine.UI.Image;

function Start() {
	pause.color.a = 1;
	halfTime.color.a = 0;
	normalTime.color.a = 0;
	doubleTime.color.a = 0;
	Time.timeScale = 0f;
}

public function Pause() {
	pause.color.a = 1;
	halfTime.color.a = 0;
	normalTime.color.a = 0;
	doubleTime.color.a = 0;
	Time.timeScale = 0f;
}

public function HalfTime() {
	pause.color.a = 0;
	halfTime.color.a = 1;
	normalTime.color.a = 0;
	doubleTime.color.a = 0;
	Time.timeScale = .5f;
}

public function NormalTime() {
	pause.color.a = 0;
	halfTime.color.a = 0;
	normalTime.color.a = 1;
	doubleTime.color.a = 0;
	Time.timeScale = 1f;
}

public function DoubleTime() {
	pause.color.a = 0;
	halfTime.color.a = 0;
	normalTime.color.a = 0;
	doubleTime.color.a = 1;
	Time.timeScale = 2f;
}