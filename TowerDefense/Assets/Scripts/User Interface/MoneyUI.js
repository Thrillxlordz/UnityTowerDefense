#pragma strict

public var moneyText : UnityEngine.UI.Text;

// Displays the players money
function Update () {
    moneyText.text = "$" + PlayerStats.Money.ToString();
}