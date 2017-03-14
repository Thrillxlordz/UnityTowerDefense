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
}

// When a waypoint is reached, access the next waypoint
function GetNextWaypoint() {
    wavepointIndex++;
    if (wavepointIndex >= waypoints.Length) {
        EndPath();
        return;
    }
    target = waypoints[wavepointIndex];
}

// If the enemy reaches the end of the path, hurt the player and destroy itself
function EndPath() {

    LevelSelectWaveSpawner.EnemiesAlive--;
    Destroy(gameObject);
}