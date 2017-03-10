#pragma strict

public var livesText : UnityEngine.UI.Text;

// Displayes the player's lives
function Update () {
	if (PlayerStats.Lives != 1) {
		livesText.text = PlayerStats.Lives + " Lives";
	} else {
		livesText.text = PlayerStats.Lives + " Life";
	}
}
