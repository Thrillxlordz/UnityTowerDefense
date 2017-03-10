#pragma strict

/* This file contains all of the sounds that the game will want to play */

public var buttonClick : AudioSource;
public var backgroundMusic : AudioSource;
public static var instance : SoundEffects;
private var muted : boolean = false;

function Start() {
    instance = this;
    PlaySound(backgroundMusic);

}

public function ButtonClick(){
    //var audio : AudioSource = Instantiate(Resources.Load("Music\\Button Click",GameObject).GetComponent(AudioSource));
    PlaySound(buttonClick);
}

public function SetMuted(){


}

public function SetUnmuted(){


}

public function SetVolume(volumeLevel : float){


}

    private function PlaySound(audioSource : AudioSource){
        if (!muted){
            audioSource.Play();
        }
    }