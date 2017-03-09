#pragma strict

class WaveSections extends System.Object {
	public var waveSections : Wave[];
}

class Wave extends System.Object {
	public var enemy : GameObject;
	public var count : int;
	public var rate : float;
	public var initialDelay : float;
}