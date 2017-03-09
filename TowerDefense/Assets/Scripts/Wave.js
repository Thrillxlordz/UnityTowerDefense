#pragma strict

// This script holds all the information for a single wave

// Holds the various sections of the wave
class WaveSections extends System.Object {
	public var waveSections : Wave[];
}

// Holds the information for a specific section of a wave
class Wave extends System.Object {
	public var enemy : GameObject;
	public var count : int;
	public var rate : float;
	public var initialDelay : float;
}