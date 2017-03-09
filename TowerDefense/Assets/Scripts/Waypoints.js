#pragma strict

public static var points : Transform[];

// Once a scene containing waypoints is launched, the public array of points is initialized with the waypoints on the scene
function Awake() {
	points = new Transform[transform.childCount];
	for (var i = 0; i < points.length; i++) {
		points[i] = transform.GetChild(i);
	}
}