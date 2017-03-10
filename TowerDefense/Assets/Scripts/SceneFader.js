#pragma strict

import UnityEngine.SceneManagement;

public var img : UnityEngine.UI.Image;
public var curve : AnimationCurve;

// Begin each scene with a fade in animation
function Start() {
	StartCoroutine(FadeIn());
}

// Called by any button that switches scenes
public function FadeTo(scene : String) {
    SoundEffects.instance.ButtonClick();
	StartCoroutine(FadeOut(scene));
}

// Animates a fade in animation
function FadeIn() : IEnumerator {
	var t : float = 1f;

	while (t > 0f) {
		t -= Time.fixedDeltaTime;
		var a : float = curve.Evaluate(t);
		img.color = new Color(0f, 0f, 0f, a);
		yield 0;
	}
}

// animates a fade out animation
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