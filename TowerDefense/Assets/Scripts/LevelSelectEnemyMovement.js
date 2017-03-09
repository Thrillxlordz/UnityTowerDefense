@script RequireComponent(Enemy)

#pragma strict

private var target : Transform;
private var wavepointIndex = 0;
private var randomPath : int;
private var enemy : Enemy;

function Start() {
	enemy = GetComponent(Enemy);
	target = Waypoints.points[0];
	randomPath = Random.Range(1, 4);
}

function Update() {
	var dir = new Vector3();
	dir = target.position - transform.position;
	transform.Translate(dir.normalized * enemy.speed * Time.deltaTime, Space.World);

	if (Vector3.Distance(transform.position, target.position) <= .5f) {
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

function EndPath() {
	LevelSelectWaveSpawner.EnemiesAlive--;
	Destroy(gameObject);
}