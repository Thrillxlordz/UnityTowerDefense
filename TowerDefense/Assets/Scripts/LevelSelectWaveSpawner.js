#pragma strict

public static var EnemiesAlive : int = 0;
public var spawnPoint : Transform;
private var countdown : float = 2f;
public var enemyArray : GameObject[];
private var wave : Wave = new Wave();

function Start() {
	EnemiesAlive = 0;
}

function Update() {
	if (EnemiesAlive <= 0) {
		StartCoroutine(SpawnWave());
	}
}

function SpawnWave() {
	EnemiesAlive = 0;

	var enemyChoice : int = Random.Range(0, enemyArray.Length - 1);
	var enemy : GameObject = enemyArray[enemyChoice];
	var rate : float = Random.Range(0.5, 2.0);
	var count : int = Random.Range(1, 10);

	wave.count = count;
	wave.enemy = enemy;
	wave.rate = rate;

	EnemiesAlive += wave.count;

	for (var i = 0; i < wave.count; i++) {
		SpawnEnemy(wave.enemy);
		yield WaitForSeconds(1.0 / wave.rate);
	}
}

function SpawnEnemy(enemy : GameObject) {
	Instantiate(enemy, spawnPoint.position, spawnPoint.rotation);

}