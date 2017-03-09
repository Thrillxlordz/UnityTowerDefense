#pragma strict

// Stores all of the player's stats

public static var Money : int;
public var startMoney : int = 400;

public static var Lives : int;
public var startLives : int = 20;

public static var Rounds : int;

// Initializes the players stats
function Start() {
	Money = startMoney;
	Lives = startLives;
	Rounds = 0;
}