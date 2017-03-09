#pragma strict

private var target : Transform;
private var targetEnemy : Enemy;

@Header ("General")

public var range : float = 15f;

@Header ("Use Bullets (default)")
public var canPierce : boolean = false;
public var bulletPrefab : GameObject;
public var fireRate : float = 1f;
private var fireCountdown : float = 0f;

@Header ("Freeze Turret")
public var isFreezeTurret : boolean = false;
public var freezeDuration : float;

@Header ("Use Laser")
public var useLaser : boolean = false;
public var damageOverTime : float = 30f;
public var slowAmount : float = .5f;
public var lineRenderer : LineRenderer = null;
public var impactEffect : ParticleSystem;
public var impactLight : Light;

@Header ("Unity Setup Fields")
public var enemyTag : String = "Enemy";
public var partToRotate : Transform;
public var turnSpeed : float = 10f;
public var hasTwoFirePoints : boolean = false;
public var firePoint1 : Transform;
public var firePoint2 : Transform;
public var rangeIndicator : GameObject;
private var turretToShoot : int = 0;
@HideInInspector
public var isBuilt : boolean = false;
private var gameManager : GameManager;
@HideInInspector
public var targetMode : boolean[];
// target modes: 0) first -- 1) last -- 2) closest -- 3) weakest -- 4) strongest


function Start() {
    // If the targetMode has not been initialized, initialize it to "new boolean[5]". This is necessary for keeping the fire mode of a basic turret, when upgrading it
    if (targetMode.Length == 0) {
        targetMode = new boolean[5];
    }

    // If the turret does not have a fire mode, set its fire mode to 2, which is the "closest enemy" mode.
    if (!targetMode[0] && !targetMode[1] && !targetMode[2] && !targetMode[3] && !targetMode[4]) {
        targetMode[2] = true;
    }

    // If the turret is not the freeze turret, it will look for targets
	if (!isFreezeTurret) {
		InvokeRepeating("UpdateTarget", 0f, 0.5f);
	}

    // Sets the range indicator's size
	rangeIndicator.transform.localScale = new Vector3(range*2 / this.transform.localScale.x, 1f, range*2 / this.transform.localScale.z);
	gameManager = GameManager.instance;
}

function UpdateTarget() {
    // If the turret isn't built, dont update it. This is used for any turrets being hovered
    if (!isBuilt) {
		return;
    }

    // Stores all the stats needed to decide which enemy to attack
	var enemies : GameObject[] = GameObject.FindGameObjectsWithTag(enemyTag);
	var distanceToChosenEnemy : float = Mathf.Infinity;
	var chosenEnemy : GameObject = null;
	var firstEnemyTravelDistance : float = 0f;
	var lastEnemyTravelDistance : float = Mathf.Infinity;
	var weakestEnemyHealth : float = Mathf.Infinity;
	var strongestEnemyHealth : float = 0f;

    // Cycles through every enemy on the map
	for (var enemy : GameObject in enemies) {
        // Calculates the distance from the turret to the enemy
        var distanceToEnemy : float = Vector3.Distance(transform.position, enemy.transform.position);
        if (distanceToEnemy > range) {
            continue;
	    } else if (targetMode[0]) { // fire mode: First
	        if (enemy.GetComponent(Enemy).distanceTravelled > firstEnemyTravelDistance) {
	            firstEnemyTravelDistance = enemy.GetComponent(Enemy).distanceTravelled;
	            distanceToChosenEnemy = distanceToEnemy;
	            chosenEnemy = enemy;
	        }
	    } else if (targetMode[1]) { // fire mode: Last
	        if (enemy.GetComponent(Enemy).distanceTravelled < lastEnemyTravelDistance) {
	            lastEnemyTravelDistance = enemy.GetComponent(Enemy).distanceTravelled;
	            distanceToChosenEnemy = distanceToEnemy;
	            chosenEnemy = enemy;
	        }
	    } else if (targetMode[2]) { // fire mode: Closest
	        if (distanceToEnemy < distanceToChosenEnemy) {
		        distanceToChosenEnemy = distanceToEnemy;
		        chosenEnemy = enemy;
	        }
	    } else if (targetMode[3]) { // fire mode: Weakest
            if (enemy.GetComponent(Enemy).startHealth <= weakestEnemyHealth) {
                if (enemy.GetComponent(Enemy).startHealth < weakestEnemyHealth) {
                    firstEnemyTravelDistance = 0;
                }
                weakestEnemyHealth = enemy.GetComponent(Enemy).startHealth;
                if (enemy.GetComponent(Enemy).distanceTravelled > firstEnemyTravelDistance) {
                    firstEnemyTravelDistance = enemy.GetComponent(Enemy).distanceTravelled;
                    distanceToChosenEnemy = distanceToEnemy;
                    chosenEnemy = enemy;
                }
            }
	    } else if (targetMode[4]) { // fire mode: Strongest
            if (enemy.GetComponent(Enemy).startHealth >= strongestEnemyHealth) {
                if (enemy.GetComponent(Enemy).startHealth > strongestEnemyHealth) {
                    firstEnemyTravelDistance = 0;
                }
                strongestEnemyHealth = enemy.GetComponent(Enemy).startHealth;
                if (enemy.GetComponent(Enemy).distanceTravelled > firstEnemyTravelDistance) {
                    firstEnemyTravelDistance = enemy.GetComponent(Enemy).distanceTravelled;
                    distanceToChosenEnemy = distanceToEnemy;
                    chosenEnemy = enemy;
                }
            }
        } else {
            Debug.Log("PROBLEM: Turret");
        }
    }

    // If we have chosen an enemy that is in range, set them as the target
    if (chosenEnemy != null && distanceToChosenEnemy <= range) {
	    target = chosenEnemy.transform;
	    targetEnemy = chosenEnemy.GetComponent(Enemy);
    } else {
	    target = null;
    }

}

// Freezes all enemies within the range of the freeze turret
function FreezeArea() {
	var colliders : Collider[] = Physics.OverlapSphere(transform.position, range);
	for (var collider : Collider in colliders) {
		if (collider.tag == "Enemy") {
			var enemy : Enemy = collider.transform.GetComponent(Enemy);
			if (enemy.freezeDuration < freezeDuration) {
				enemy.freezeDuration = freezeDuration;
			}
		}
	}
}

function Update () {
    // If the turret isn't built, dont update it. This is used for any turrets being hovered
	if (!isBuilt) {
		return;
	}

    // If the turret is a freeze turret, do not continue. Instead, check if it is time to freeze the surrounding area.
	if (isFreezeTurret) {
		if (gameManager.timeToNextFreeze == gameManager.freezeCooldown) {
			FreezeArea();
		}
		return;
	}

	fireCountdown -= Time.deltaTime;

    // If we no longer have a target, disable any effects involved with having a target (i.e. Bang McShooty's laser pointer)
	if (target == null) {
		if (useLaser) {
			if (lineRenderer.enabled) {
				lineRenderer.enabled = false;
				impactEffect.Stop();
				impactLight.enabled = false;
				UpdateTarget();
			}
		}
		if (lineRenderer != null) {
			if (lineRenderer.enabled) {
			lineRenderer.enabled = false;
			}
		}
		return;
	}

	LockOnTarget();

	if (useLaser) {
		Laser();
	} else {
		if (fireCountdown <= 0) {
			Shoot();
			fireCountdown = 1f / fireRate;
		}
	}
}

// Faces the turret towards the target enemy, and enables any effects involved with having a target
function LockOnTarget() {
	var dir : Vector3 = target.position - transform.position;
	var lookRotation : Quaternion = Quaternion.LookRotation(dir);
	var rotation : Vector3 = Quaternion.Lerp(partToRotate.rotation, lookRotation, Time.deltaTime * turnSpeed).eulerAngles;
	partToRotate.rotation = Quaternion.Euler(0f, rotation.y, 0f);

	if (lineRenderer != null && !useLaser) {
		if (!lineRenderer.enabled) {
		lineRenderer.enabled = true;
	}
	lineRenderer.SetPosition(0, firePoint2.position);
	lineRenderer.SetPosition(1, target.position);
	}
}

// Damages and slows the enemy, while playing the laser animation
function Laser() {
	targetEnemy.TakeDamage(damageOverTime * Time.deltaTime);
	targetEnemy.Slow(slowAmount);
	if (!lineRenderer.enabled) {
		lineRenderer.enabled = true;
		impactEffect.Play();
		impactLight.enabled = true;
	}
	lineRenderer.SetPosition(0, firePoint1.position);
	lineRenderer.SetPosition(1, target.position);

	var dir : Vector3 = firePoint1.position - target.position;

	impactEffect.transform.rotation = Quaternion.LookRotation(dir);
	impactEffect.transform.position = target.position + dir.normalized;
}

// Instantiates the bullet, and gives the bullet its target
function Shoot() {
	var bulletGO : GameObject;
	if (turretToShoot == 0) {
		bulletGO = Instantiate(bulletPrefab, firePoint1.position, firePoint1.rotation);
		if (hasTwoFirePoints) {
			turretToShoot = 1;
		}
	} else if (turretToShoot == 1) {
		bulletGO = Instantiate(bulletPrefab, firePoint2.position, firePoint2.rotation);
		turretToShoot = 0;
	}
	if (!canPierce) {
	    var bullet : Bullet = bulletGO.GetComponent(Bullet);
	    if (bullet != null) {
	        bullet.Seek(target);
	    }
	} /*else {          ***This part is still in development***
	    var bulletPierce : BulletPierce = bulletGO.GetComponent(BulletPierce);
	    if (bulletPierce != null) {
	        bulletPierce.Fire(target.position);
	    }
	}*/
}

// Draws wire gizmos in the scene editor
function OnDrawGizmosSelected() {
	Gizmos.color = Color.red;
	Gizmos.DrawWireSphere(transform.position, range);
}

// Returns all relevant stats about this turret
public function GetTurretStats() : float[] {
    var stats : float[] = [0f, 0f, 0f, 0f, 0f, 0f, 0f];
    var bulletStats : float[];
    if (bulletPrefab != null && bulletPrefab.GetComponent(Bullet) != null) {
        bulletStats = bulletPrefab.GetComponent(Bullet).GetBulletStats();
    } else if (bulletPrefab != null && bulletPrefab.GetComponent(BulletPierce) != null) {
        bulletStats = bulletPrefab.GetComponent(BulletPierce).GetBulletStats();
    } else {
        bulletStats = [0f,0f];
    }
	stats[0] = range;
	stats[1] = bulletStats[0];
	stats[2] = bulletStats[1];
	stats[3] = damageOverTime;
	stats[4] = fireRate;
	stats[5] = slowAmount;
	stats[6] = freezeDuration;
	return stats;
}