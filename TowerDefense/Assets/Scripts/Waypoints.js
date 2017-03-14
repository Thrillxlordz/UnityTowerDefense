#pragma strict

public static var paths : Path[];
public static var totalPaths : int;

// Once a scene containing waypoints is launched, the public array of points is initialized with the waypoints on the scene
function Awake() {
    totalPaths = transform.childCount;
    paths = new Path[transform.childCount];
    for (var i = 0; i < paths.Length; i++) {
        paths[i] = new Path();
        var path : Transform = transform.GetChild(i);
        var pathWaypoints : Transform[] = new Transform[path.childCount];
        for (var j = 0; j < pathWaypoints.Length; j++) {
            pathWaypoints[j] = path.GetChild(j);
        }
        paths[i].waypoints = pathWaypoints;
    }
}

class Path extends System.Object {
    public var waypoints : Transform[] = new Transform[100];
}