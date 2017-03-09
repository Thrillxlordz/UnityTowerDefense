#pragma strict

import UnityEngine.SceneManagement;

public var img : UnityEngine.UI.Image;
public var curve : AnimationCurve;

function Start() {
	StartCoroutine(FadeIn());
}

public function FadeTo(scene : String) {
	StartCoroutine(FadeOut(scene));
}

function FadeIn() : IEnumerator {
	var t : float = 1f;

	while (t > 0f) {
		t -= Time.fixedDeltaTime;
		var a : float = curve.Evaluate(t);
		img.color = new Color(0f, 0f, 0f, a);
		yield 0;
	}
}

function FadeOut(scene : String) : IEnumerator {
	var t : float = 0f;

	while (t < 1f) {
		t += Time.fixedDeltaTime;
		var a : float = curve.Evaluate(t);
		img.color = new Color(0f, 0f, 0f, a);
		yield 0;
	}

	SceneManager.LoadScene(scene);
}