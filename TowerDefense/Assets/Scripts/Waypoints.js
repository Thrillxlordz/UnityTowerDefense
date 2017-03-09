#pragma strict

public static var points : Transform[];

function Awake() {
	points = new Transform[transform.childCount];
	for (var i = 0; i < points.length; i++) {
		points[i] = transform.GetChild(i);
	}
}