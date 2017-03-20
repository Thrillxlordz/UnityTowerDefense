#pragma strict

public var roundsTextWin : UnityEngine.UI.Text;
public var roundsTextLose : UnityEngine.UI.Text;

// When this is enabled, animate its entry
public function TurnOnCompleteLevel() {
	transform.Find("CompleteLevel").gameObject.SetActive(true);
	StartCoroutine(AnimateText());
}

public function TurnOffCompleteLevel() {
	transform.Find("CompleteLevel").gameObject.SetActive(false);
}

public function TurnOnGameOver() {
	transform.Find("GameOver").gameObject.SetActive(true);
	StartCoroutine(AnimateText());
}

// Animates this text
function AnimateText() {
	roundsTextWin.text = "0";
	roundsTextLose.text = "0";
	var round : int = 0;

	yield WaitForSeconds(.7f);
	if (PlayerStats.Lives > 0) {
		while (round < PlayerStats.Rounds) {
			round++;
			roundsTextWin.text = round.ToString();
			roundsTextLose.text = round.ToString();
			yield WaitForSeconds(.05f);
		}
	} else {
		while (round < PlayerStats.Rounds - 1) {
			round++;
			roundsTextWin.text = round.ToString();
			roundsTextLose.text = round.ToString();
			yield WaitForSeconds(.05f);
		}
	}
}