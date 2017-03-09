@script RequireComponent(Enemy)

#pragma strict

private var target : Transform;
private var wavepointIndex = 0;
private var randomPath : int;
private var enemy : Enemy;

// This is the enemy movement for the level select screen. Basically just a hollow shell of the normal enemy movement

// Gets the first waypoint destination, along with a random path to choose from
function Start() {
	enemy = GetComponent(Enemy);
	target = Waypoints.points[0];
	randomPath = Random.Range(1, 4);
}

// Moves the enemy
function Update() {
	var dir = new Vector3();
	dir = target.position - transform.position;
	transform.Translate(dir.normalized * enemy.speed * Time.deltaTime, Space.World);

	if (Vector3.Distance(transform.position, target.position) <= .5f) {
		GetNextWaypoint();
	}
}

// Once the enemy reaches a new waypoint, searches for the next waypoint
function GetNextWaypoint() {
	if (wavepointIndex + (3 - randomPath)>= Waypoints.points.Length - 1) {
		EndPath();
		return;
	}
	if (wavepointIndex == 1) {
		wavepointIndex += randomPath;
		target = Waypoints.points[wavepointIndex];
	} else {
		wavepointIndex++;
		target = Waypoints.points[wavepointIndex];
	}
}

// The enemy has reached the end of his path, so it destroys itself
function EndPath() {
	LevelSelectWaveSpawner.EnemiesAlive--;
	Destroy(gameObject);
}