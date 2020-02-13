import React from 'react';

export default function GameEndScreen(props) {
  return (
    <main className="game__end__screen">
      {props.isWinner ? 
        <div className="winner__screen--container">
          Поздравляем! Вы набрали максимально возможное количество баллов!
          <img src="https://avatars.mds.yandex.net/get-pdb/225396/6c9f2309-9efb-4100-a706-73b1abcebc0d/orig" alt="fireworks" />
        </div> :
        <div className="game__end--container">
          <p className="game__end--text">
              Поздравляем!<br />
            <span>Вы прошли викторину и набрали {props.score} из 30 возможных баллов!</span>
          </p>
          <button className="restart__button" onClick={props.onRestartButton}>Попробовать еще раз</button>
        </div>
      }
    </main>
  )
}