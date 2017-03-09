#pragma strict

public var startSpeed : float = 10f;
public var startHealth : float = 100;
public var worth : int = 50;
public var playerDamage : int = 1;
public var immuneToCC : boolean;
public var speedVariance : float;
public var deathEffect : GameObject;
@HideInInspector
public var speed : float;
private var health : float;
@HideInInspector
public var freezeDuration : float = 0;
@HideInInspector
public var distanceTravelled : float = 0;
private var isDead : boolean = false;

@Header ("Unity Stuff")
public var healthBar : UnityEngine.UI.Image;

// If the specific enemy has a speed variance, then its start speed is modified.
function Start() {
	startSpeed = Random.Range(startSpeed - speedVariance, startSpeed + speedVariance);
	speed = startSpeed;
	health = startHealth;
}

// Applies damage to the enemy. Turrets or bullets will call this function
public function TakeDamage(amount : float) {
	health -= amount;
	healthBar.fillAmount = health / startHealth;
	if (health <= 0 && !isDead) {
		Die();
	}
}

// Slows the enemy
public function Slow(percent : float) {
	if (!immuneToCC && freezeDuration <= 0) {
		speed = startSpeed * (1f - percent);
	}
}

// Once the enemy's HP reaches zero, the enemy is killed off.
function Die() {
	isDead = true;
	PlayerStats.Money += worth;
	var effect : GameObject = Instantiate(deathEffect, transform.position, Quaternion.identity);
	Destroy(effect, 5f);
	Destroy(gameObject);
	WaveSpawner.EnemiesAlive--;
}