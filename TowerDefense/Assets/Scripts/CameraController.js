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

function Start() {
	startPosition = this.transform.position;
}

function Update() {
	if (GameManager.gameIsOver) {
		this.transform.position = startPosition;
		this.enabled = false;
		return;
	}
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
	pos.y -= scroll * scrollSpeed * Time.fixedDeltaTime;
	pos.x = Mathf.Clamp(pos.x, minX, maxX);
	pos.y = Mathf.Clamp(pos.y, minY, maxY);
	pos.z = Mathf.Clamp(pos.z, minZ, maxZ);
	transform.position = pos;
}
