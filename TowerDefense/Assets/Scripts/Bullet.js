#pragma strict

private var target : Transform;
public var impactEffect : GameObject;

public var speed : float = 70f;
public var damage : float = 50f;
public var explosionDamage : int = 50;
public var explosionRadius : float = 0f;

// Sets the bullets target
public function Seek(_target : Transform) {
	target = _target;
}

function Update () {
    
    // If the bullets target becomes null, destroy the bullet
	if (target == null) {
		Destroy(gameObject);
		return;
	}
	
    // Moves the bullet
	var dir : Vector3 = target.position - transform.position;
	var distanceThisFrame : float = speed * Time.deltaTime;

    // If the magnitude of the vector between the bullet and the enemy is less than the distance to move this frame, the target is hit
	if (dir.magnitude <= distanceThisFrame) {
		HitTarget();
		return;
	}
	transform.Translate(dir.normalized * distanceThisFrame, Space.World);
	transform.LookAt(target);
}

// Hits the target, destroying the bullet, while also damaging the enemy
function HitTarget() {

    // Creates the impact effect
	var effectIns : GameObject = Instantiate(impactEffect, transform.position, transform.rotation);
	Destroy(effectIns, 5f);

    // If this bullet can explode, explode
	if (explosionRadius > 0f) {
		Explode();
	}
	Damage(target, damage);
	Destroy(gameObject);
}

// Reads everything within the bullets explosion radius. Anything with the tag "Enemy" is damaged
function Explode() {
	var colliders : Collider[] = Physics.OverlapSphere(transform.position, explosionRadius);
	for (var collider : Collider in colliders) {
		if (collider.tag == "Enemy") {
			Damage(collider.transform, explosionDamage);
		}
	}
}

// Damages the enemy
function Damage(enemy : Transform, damage : int) {
	var e : Enemy = enemy.GetComponent(Enemy);
	if (e != null) {
		e.TakeDamage(damage);
	}
}

// Draws gizmos in the scene editor for the range of the bullet
function OnDrawGizmosSelected() {
	Gizmos.color = Color.red;
	Gizmos.DrawWireSphere(transform.position, explosionRadius);
}

// Returns all relevant stats about the bullet
public function GetBulletStats() : float[] {
	var stats : float[] = [damage, explosionDamage];
	return stats;
}