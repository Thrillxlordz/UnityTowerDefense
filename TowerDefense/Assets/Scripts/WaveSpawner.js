#pragma strict

public static var EnemiesAlive : int = 0;

public var waves : WaveSections[];
public var spawnPoint : Transform;
public var timeBetweenWaves : float = 5f;
public var waveCountdownText : UnityEngine.UI.Text;
private var countdown : float = 2f;
private var waveIndex : int = 0;
private var enemyDifficultyModifier : int = 1;
private static var playingOn : boolean = false;
public var gameManager : GameManager;
private static var waveSpawner : Transform;

function Start() {
    waveSpawner = this.transform;
	EnemiesAlive = 0;
}

function Update() {
    // If the wave is still running, dont update
	if (EnemiesAlive > 0) {
		return;
	}

    // If we have completed the final wave, turn this script off. If the player still has lives, the player wins
	if (waveIndex == waves.Length && !playingOn) {
		this.enabled = false;
		if (PlayerStats.Lives > 0) {
			gameManager.WinLevel();
		}
	} else if (waveIndex >= waves.Length) {
	    waveIndex = 0;
	    ScaleDifficulty();
	}

    // If we have waited the (timeBetweenWaves) amount of time, start the next wave
	if (countdown <= 0.01f) {
		StartCoroutine(SpawnWave());
		countdown = timeBetweenWaves;
		waveCountdownText.text = String.Format("{0:00.00}", 0);
		return;
	}
    // Formats the displayed timer and tracks the passing of time
	waveCountdownText.text = String.Format("{0:00.00}", countdown);
	countdown -= Time.deltaTime;
	countdown = Mathf.Clamp(countdown, 0f, Mathf.Infinity);
}

function ScaleDifficulty() {
    enemyDifficultyModifier *= 2;
}

public static function Enable() {
    waveSpawner.GetComponent(WaveSpawner).enabled = true;
    playingOn = true;
}

// Starts the next wave in a scene, assuming there is a next wave
function SpawnWave() {
	PlayerStats.Rounds++;
	EnemiesAlive = 0;

    // "wave" is a variable that holds all the components of a single wave. "waves" is a variable that holds all the components of every wave
	var wave : Wave[] = waves[waveIndex].waveSections;

    // Sums up the amount of enemies that are about to be spawned
	for (var k = 0; k < wave.Length; k++) {
		EnemiesAlive += wave[k].count;
	}

    // Spawns the enemies in the wave. The "yield" lines will stop this chunk of code for an amount of seconds
	for (var i = 0; i < wave.length; i++) {
		yield WaitForSeconds(wave[i].initialDelay);
		for (var j = 0; j < wave[i].count; j++) {
			SpawnEnemy(wave[i].enemy);
			yield WaitForSeconds(1f / wave[i].rate);
		}
	}

    // Once we have made it here, we have finished spawning the wave.
	waveIndex++;

}

// Creates the enemy and puts them on the spawn point
function SpawnEnemy(enemy : GameObject) {
	var spawnedEnemy : GameObject = Instantiate(enemy, spawnPoint.position, spawnPoint.rotation);
	spawnedEnemy.GetComponent(Enemy).startHealth *= enemyDifficultyModifier;

}