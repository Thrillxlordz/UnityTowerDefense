#pragma strict

public var moneyText : UnityEngine.UI.Text;

function Update () {
		moneyText.text = "$" + PlayerStats.Money.ToString();
}
