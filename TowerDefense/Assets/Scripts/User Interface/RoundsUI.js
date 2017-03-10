#pragma strict

public var roundsText : UnityEngine.UI.Text;

// Displays the players money
function Update () {
    roundsText.text = "Round: " + PlayerStats.Rounds.ToString();
}