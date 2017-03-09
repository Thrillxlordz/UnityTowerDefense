#pragma strict

public static var EnemiesAlive : int = 0;

public var waves : WaveSections[];
public var spawnPoint : Transform;
public var timeBetweenWaves : float = 5f;
public var waveCountdownText : UnityEngine.UI.Text;
private var countdown : float = 2f;
private var waveIndex : int = 0;
public var gameManager : GameManager;

function Start() {
	EnemiesAlive = 0;
}

function Update() {
	if (EnemiesAlive > 0) {
		return;
	}
	if (waveIndex == waves.Length) {
		this.enabled = false;
		if (PlayerStats.Lives > 0) {
			gameManager.WinLevel();
		}
	}

	if (countdown <= 0.01f) {
		StartCoroutine(SpawnWave());
		countdown = timeBetweenWaves;
		waveCountdownText.text = String.Format("{0:00.00}", 0);
		return;
	}
	waveCountdownText.text = String.Format("{0:00.00}", countdown);
	countdown -= Time.deltaTime;
	countdown = Mathf.Clamp(countdown, 0f, Mathf.Infinity);
}

function SpawnWave() {
	PlayerStats.Rounds++;
	EnemiesAlive = 0;
	var wave : Wave[] = waves[waveIndex].waveSections;

	for (var k = 0; k < wave.Length; k++) {
		EnemiesAlive += wave[k].count;
	}
	for (var i = 0; i < wave.length; i++) {
		yield WaitForSeconds(wave[i].initialDelay);
		for (var j = 0; j < wave[i].count; j++) {
			SpawnEnemy(wave[i].enemy);
			yield WaitForSeconds(1f / wave[i].rate);
		}
	}
	waveIndex++;

}

function SpawnEnemy(enemy : GameObject) {
	Instantiate(enemy, spawnPoint.position, spawnPoint.rotation);

}