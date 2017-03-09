#pragma strict

private var target : Transform;
public var impactEffect : GameObject;

public var speed : float = 70f;
public var damage : float = 50f;
public var explosionDamage : int = 50;
public var explosionRadius : float = 0f;

public function Seek(_target : Transform) {
	target = _target;
}

function Update () {
	if (target == null) {
		Destroy(gameObject);
		return;
	}
	
	var dir : Vector3 = target.position - transform.position;
	var distanceThisFrame : float = speed * Time.deltaTime;

	if (dir.magnitude <= distanceThisFrame) {
		HitTarget();
		return;
	}
	transform.Translate(dir.normalized * distanceThisFrame, Space.World);
	transform.LookAt(target);
}

function HitTarget() {
	var effectIns : GameObject = Instantiate(impactEffect, transform.position, transform.rotation);
	Destroy(effectIns, 5f);
	if (explosionRadius > 0f) {
		Explode();
	}
	Damage(target, damage);
	Destroy(gameObject);
}

function Explode() {
	var colliders : Collider[] = Physics.OverlapSphere(transform.position, explosionRadius);
	for (var collider : Collider in colliders) {
		if (collider.tag == "Enemy") {
			Damage(collider.transform, explosionDamage);
		}
	}
}

function Damage(enemy : Transform, damage : int) {
	var e : Enemy = enemy.GetComponent(Enemy);
	if (e != null) {
		e.TakeDamage(damage);
	}
}

function OnDrawGizmosSelected() {
	Gizmos.color = Color.red;
	Gizmos.DrawWireSphere(transform.position, explosionRadius);
}

public function GetBulletStats() : float[] {
	var stats : float[] = [damage, explosionDamage];
	return stats;
}