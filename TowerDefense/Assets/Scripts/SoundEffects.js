#pragma strict

/* This file contains all of the sounds that the game will want to play */

public var buttonClick : AudioSource;
public var mainMenuSound : AudioSource;
public var levelSound : AudioSource;
public static var instance : SoundEffects;

function Start() {
    instance = this;
    if (SceneManager.GetActiveScene().name == "MainMenu") {
    	PlaySound(mainMenuSound);
    } else if (SceneManager.GetActiveScene().name == "LevelSelect") {
    	PlaySound(mainMenuSound);
    } else {
    	PlaySound(levelSound);
    }
}

public function ButtonClick(){
    PlaySound(buttonClick);
}

public function SetMuted(){


}

public function SetUnmuted(){


}

public function SetVolume(volumeLevel : float){


}

private function PlaySound(audioSource : AudioSource){
    audioSource.Play();
}