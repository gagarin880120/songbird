import React from 'react';

export default function Audio(props) {

  function playPause() {
    const questionAudio = document.querySelector('.audio');
    const descriptionAudio = document.querySelectorAll('.audio')[1];
    const questionPlayButton = document.querySelector('.audio--play__button');
    const descriptionPlayButton = document.querySelectorAll('.audio--play__button')[1];

    if(props.isQuestionAudio) {
      if(questionAudio.paused){
        questionAudio.play();
        questionPlayButton.innerHTML = '<i class="far fa-pause-circle"></i>';
      } else {
        questionAudio.pause();
        questionPlayButton.innerHTML = '<i class="far fa-play-circle"></i>';
      }
    } else {
      if(descriptionAudio.paused){
        descriptionAudio.play();
        descriptionPlayButton.innerHTML = '<i class="far fa-pause-circle"></i>';
      } else {
        descriptionAudio.pause();
        descriptionPlayButton.innerHTML = '<i class="far fa-play-circle"></i>';
      }
    }
  }

  function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){ 
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
};

  function updateProgressValue() {
    const questionAudio = document.querySelector('.audio');
    const descriptionAudio = document.querySelectorAll('.audio')[1];
    const questionProgressBar = document.querySelector('.audio--progress__bar');
    const descriptionProgressBar = document.querySelectorAll('.audio--progress__bar')[1];

    if(props.isQuestionAudio) {
      if(questionAudio) {
        questionProgressBar.max = questionAudio.duration;
        questionProgressBar.value = questionAudio.currentTime;
        document.querySelector('.audio--current__time').innerHTML =  
        formatTime(questionAudio.currentTime);
        document.querySelector('.audio--duration__time').innerHTML =  
        formatTime(questionAudio.duration);
      }
    } else {
      if(descriptionAudio) {
        descriptionProgressBar.max = descriptionAudio.duration;
        descriptionProgressBar.value = descriptionAudio.currentTime;
        document.querySelectorAll('.audio--current__time')[1].innerHTML =  
        formatTime(descriptionAudio.currentTime);
        document.querySelectorAll('.audio--duration__time')[1].innerHTML =  
        formatTime(descriptionAudio.duration);
      }
    }
  };

  setInterval(updateProgressValue, 100);

  function changeProgressBar() {
    const questionAudio = document.querySelector('.audio');
    const descriptionAudio = document.querySelectorAll('.audio')[1];
    const questionProgressBar = document.querySelector('.audio--progress__bar');
    const descriptionProgressBar = document.querySelectorAll('.audio--progress__bar')[1];
    if(props.isQuestionAudio) {
      questionAudio.currentTime = questionProgressBar.value;
    } else {
      descriptionAudio.currentTime = descriptionProgressBar.value;
    }
  }

  return(
    <div className="audio--container">
      <audio className="audio" src={props.isQuestionAudio ? props.questionAudioSrc : props.descriptionAudioSrc}></audio>
      <div className="audio--play__button" onClick={playPause}>
        <i className="far fa-play-circle"></i>
      </div>
      <input
        type="range"
        className="audio--progress__bar"
        min="0"
        max=""
        value="0"
        onChange={changeProgressBar}
      />
      <div className="audio--time--container">
        <span className="audio--current__time"></span>
        <span className="audio--duration__time"></span>
      </div>
    </div>
  )
}