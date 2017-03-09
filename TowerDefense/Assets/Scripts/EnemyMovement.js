@script RequireComponent(Enemy)

#pragma strict

private var target : Transform;
private var wavepointIndex = 0;
private var enemy : Enemy;

function Start() {
	enemy = GetComponent(Enemy);
	target = Waypoints.points[0];
}

function Update() {
	var dir = new Vector3();
	dir = target.position - transform.position;
	transform.Translate(dir.normalized * enemy.speed * Time.deltaTime, Space.World);
	enemy.distanceTravelled += enemy.speed * Time.deltaTime;
    
	if (Vector3.Distance(transform.position, target.position) <= .75f) {
		GetNextWaypoint();
	}
	if (enemy.freezeDuration <= 0 || enemy.immuneToCC) {
		enemy.speed = enemy.startSpeed;
	} else {
		enemy.freezeDuration -= Time.deltaTime;
		enemy.speed = 0f;
	}
}

function GetNextWaypoint() {
	if (wavepointIndex >= Waypoints.points.Length - 1) {
		EndPath();
		return;
	}
	wavepointIndex++;
	target = Waypoints.points[wavepointIndex];
}

function EndPath() {
	PlayerStats.Lives -= enemy.playerDamage;
	WaveSpawner.EnemiesAlive--;
	Destroy(gameObject);
}