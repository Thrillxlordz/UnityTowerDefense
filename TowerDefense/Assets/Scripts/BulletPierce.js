#pragma strict

// This script is still in development, None of it is implemented yet

private var dir : Vector3;
public var impactEffect : GameObject;

public var speed : float = 70f;
public var damage : float = 50f;
public var distanceToTravel : int;
private var distanceTravelled : float;
private var enemiesHit : GameObject[] = new GameObject[100];
private var enemies : GameObject[];

function Start() {
    enemies = GameObject.FindGameObjectsWithTag("Enemy"); // Not perfect... wont hit fresh enemies
}

public function Fire(_dir : Vector3) {
    dir = transform.position - _dir;
    dir = Vector3(dir.x, dir.y, -dir.z); //Direction is super messed up
    Debug.Log(dir.normalized);
}

function Update () {
	
    var distanceThisFrame : float = speed * Time.deltaTime;
    distanceTravelled += distanceThisFrame;
    if (distanceTravelled >= distanceToTravel) {
        Destroy(gameObject);
        return;
    }
    transform.Translate(dir.normalized * distanceThisFrame, Space.Self);
    transform.LookAt(dir);

    for (var enemy : GameObject in enemies) {
        if ((transform.position - enemy.transform.position).magnitude < 0.5f) {
            for (var i = 0; i < enemiesHit.Length; i++) {
                if (enemiesHit[i] != null && enemy != enemiesHit[i]) {
                    HitTarget(enemy.transform);
                    enemiesHit[i] = enemy;
                }
            }
        }
    }

}

function HitTarget(target : Transform) {
    var effectIns : GameObject = Instantiate(impactEffect, transform.position, transform.rotation);
    Destroy(effectIns, 5f);
    Damage(target, damage);
}

function Damage(enemy : Transform, damage : int) {
    var e : Enemy = enemy.GetComponent(Enemy);
    if (e != null) {
        e.TakeDamage(damage);
    }
}

public function GetBulletStats() : float[] {
    var stats : float[] = [damage, 0f];
    return stats;
}