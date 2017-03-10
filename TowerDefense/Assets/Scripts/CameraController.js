#pragma strict

public var panSpeed : float = 30f;
public var panBorderThickness : float = 10f;
public var scrollSpeed : float = 5000f;
public var minX : float = -50f;
public var maxX : float = 50f;
public var minY : float = 10f;
public var maxY : float = 80f;
public var minZ : float = -50f;
public var maxZ : float = 50f;
private var startPosition : Vector3;
private static var thisCamera : Transform;

function Start() {
    startPosition = this.transform.position;
    thisCamera = this.transform;
}

function Awake() {
    GameManager.gameIsOver = false;
}

function Update() {
    
    // If the game is over, the player can no longer control the camera, and the camera snaps back to its start position
    if (GameManager.gameIsOver) {
		this.transform.position = startPosition;
		this.enabled = false;
		return;
	}

    // Manages each input from the player, and moves the player camera accordingly
	if (Input.GetKey("w") || Input.mousePosition.y >= Screen.height - panBorderThickness) {
		transform.Translate(-Vector3.forward * panSpeed * Time.fixedDeltaTime, Space.World);
	}
	if (Input.GetKey("s") || Input.mousePosition.y <= panBorderThickness) {
		transform.Translate(-Vector3.back * panSpeed * Time.fixedDeltaTime, Space.World);
	}
	if (Input.GetKey("d") || Input.mousePosition.x >= Screen.width - panBorderThickness) {
	transform.Translate(-Vector3.right * panSpeed * Time.fixedDeltaTime, Space.World);
	}
	if (Input.GetKey("a") || Input.mousePosition.x <= panBorderThickness) {
		transform.Translate(-Vector3.left * panSpeed * Time.fixedDeltaTime, Space.World);
	}
	var scroll : float = Input.GetAxis("Mouse ScrollWheel");
	var pos : Vector3 = transform.position;

    // If the player has moved the camera outside of the boundaries of movement, snap the camera back to inside the boundaries
	pos.y -= scroll * scrollSpeed * Time.fixedDeltaTime;
	pos.x = Mathf.Clamp(pos.x, minX, maxX);
	pos.y = Mathf.Clamp(pos.y, minY, maxY);
	pos.z = Mathf.Clamp(pos.z, minZ, maxZ);
	transform.position = pos;
}

public static function Enable() {
    thisCamera.GetComponent(CameraController).enabled = true;
}