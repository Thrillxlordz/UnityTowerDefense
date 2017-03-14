@script RequireComponent(Enemy)

#pragma strict

private var target : Transform;
private var wavepointIndex = 0;
private var waypoints : Transform[];
private var enemy : Enemy;

// Accesses the enemy's Enemy script, and stores it. Also stores the first waypoint
function Start() {
    var pathChoice = Random.Range(0, Waypoints.totalPaths);
    waypoints = Waypoints.paths[pathChoice].waypoints;
	enemy = GetComponent(Enemy);
	target = waypoints[0];
}

// Finds the next waypoint, and moves the enemy towards that point, so long as the enemy is not frozen
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

// When a waypoint is reached, access the next waypoint
function GetNextWaypoint() {
    wavepointIndex++;
    if (wavepointIndex >= waypoints.Length) {
        EndPath();
        return;
    }

    if (waypoints[wavepointIndex].childCount > 0) {
    	transform.position = waypoints[wavepointIndex].position;
    	GetNextWaypoint();
    }
    target = waypoints[wavepointIndex];
}

// If the enemy reaches the end of the path, hurt the player and destroy itself
function EndPath() {
	PlayerStats.Lives -= enemy.playerDamage;
	WaveSpawner.EnemiesAlive--;
	Destroy(gameObject);
}