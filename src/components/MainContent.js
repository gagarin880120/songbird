import React from 'react';
import birdsData from '../utils/birds-data';
import Audio from './Audio';

export default function MainContent(props) {
  return (
    <main className="main">
      <div className="main--question">
        <img src={props.questionPhotoURL} className="main--question--image" alt="bird" />
        <div className="main--question--content">
          <p className="main--question--name">
            {props.questionName}
          </p>
            <Audio 
              isQuestionAudio={true}
              questionAudioSrc={birdsData[props.currentLevel][props.randomBirdIndex].audio}
            />
        </div>
      </div>

      <div className="main--answers__description--wrapper">
        <ul className="main--answers--list">
          {birdsData[props.currentLevel].map(item => {
            return <li
              className="main--answers--item"
              id={item.id}
              key={item.id}
              onClick={props.onAnswerClick}
            ><div className="main--answers--item--indicator"></div>{item.name}</li>
          })}
        </ul>
        <div className="main--description">
          {props.currentBirdId ? 
            <div className="main--description--wrapper">
              <div className="main--description--props--container">
                <div 
                  className="main--description--image"
                  style={{
                    backgroundImage: `url(${birdsData[props.currentLevel][props.currentBirdId - 1].image})`,
                  }}>
                </div>
                <div className="main--description--props">
                  <p className="main--description--name rus">{birdsData[props.currentLevel][props.currentBirdId - 1].name}</p>
                  <p className="main--description--name lat">{birdsData[props.currentLevel][props.currentBirdId - 1].species}</p>
                  <Audio 
                    questionAudioSrc={birdsData[props.currentLevel][props.randomBirdIndex].audio}
                    isQuestionAudio={false}
                    descriptionAudioSrc={birdsData[props.currentLevel][props.currentBirdId - 1].audio}
                  />
                </div>
              </div>
              <p className="main--description--text">{birdsData[props.currentLevel][props.currentBirdId - 1].description}</p>
            </div> :
            'Прослушайте плеер. Выберите птицу из списка'
          }
        </div>
      </div>
      <div onClick={props.onLevelButtonClick} className="level--button"><span>Следующий уровень</span></div>
    </main>
  )
}