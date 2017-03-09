#pragma strict

public static var Money : int;
public var startMoney : int = 400;

public static var Lives : int;
public var startLives : int = 20;

public static var Rounds : int;

function Start() {
	Money = startMoney;
	Lives = startLives;
	Rounds = 0;
}