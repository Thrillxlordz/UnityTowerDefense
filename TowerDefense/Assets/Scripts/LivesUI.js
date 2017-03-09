#pragma strict

public var livesText : UnityEngine.UI.Text;

function Update () {
	if (PlayerStats.Lives != 1) {
		livesText.text = PlayerStats.Lives + " Lives";
	} else {
		livesText.text = PlayerStats.Lives + " Life";
	}
}
