#pragma strict

public var roundsText : UnityEngine.UI.Text;

function OnEnable() {
	StartCoroutine(AnimateText());
}

function AnimateText() {
	roundsText.text = "0";
	var round : int = 0;

	yield WaitForSeconds(.7f);
	if (PlayerStats.Lives > 0) {
		while (round < PlayerStats.Rounds) {
			round++;
			roundsText.text = round.ToString();
			yield WaitForSeconds(.05f);
		}
	} else {
		while (round < PlayerStats.Rounds - 1) {
			round++;
			roundsText.text = round.ToString();
			yield WaitForSeconds(.05f);
		}
	}
}