#pragma strict

public static var EnemiesAlive : int = 0;
public var spawnPoint : Transform;
private var countdown : float = 2f;
public var enemyArray : GameObject[];
private var wave : Wave = new Wave();

// Manages the wave spawner on the level select screen. Basically a hollow shell of the normal wave spawner

function Start() {
	EnemiesAlive = 0;
}

// If there are no more enemies on screen, spawn more enemies
function Update() {
	if (EnemiesAlive <= 0) {
		StartCoroutine(SpawnWave());
	}
}

function SpawnWave() {
	EnemiesAlive = 0;

    // Randomly chooses an enemy to spawn, how many to spawn, and at what rate
	var enemyChoice : int = Random.Range(0, enemyArray.Length - 1);
	var enemy : GameObject = enemyArray[enemyChoice];
	var rate : float = Random.Range(0.5, 2.0);
	var count : int = Random.Range(1, 10);

	wave.count = count;
	wave.enemy = enemy;
	wave.rate = rate;

	EnemiesAlive += wave.count;

    // Spawns the enemies
	for (var i = 0; i < wave.count; i++) {
		SpawnEnemy(wave.enemy);
		yield WaitForSeconds(1.0 / wave.rate);
	}
}

// Creates the enemy at the spawn point
function SpawnEnemy(enemy : GameObject) {
	Instantiate(enemy, spawnPoint.position, spawnPoint.rotation);

}