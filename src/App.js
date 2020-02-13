import React, { Component } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import birdsData from './utils/birds-data';
import GameEndScreen from './components/GameEndScreen';

class App extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      attemptsCounter: -1,
      currentLevel: 0,
      currentBirdId: 0,
      randomBirdIndex: Math.round(Math.random() * 5),
      questionName: '******',
      questionPhotoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQS7HPpywZjopJT2zElwpoI2mUjrQtmD7m4Y7hjmjqpt1A7nVx',
      currentBird: null,
      isNextLevelAvailable: false,
      isEnded: false,
      isWinner: false
    }
  }

  onAnswerClick = (e) => {
    const target = e.target;
    this.setState({
      currentBirdId: e.target.id,
      attemptsCounter: e.target.isChosen ? this.state.attemptsCounter : this.state.attemptsCounter + 1
    }, () => {
      target.isChosen = true;
      if (birdsData[this.state.currentLevel][this.state.randomBirdIndex].id === +this.state.currentBirdId
        && !this.state.isNextLevelAvailable) {
        this.setState({
          questionName: birdsData[this.state.currentLevel][this.state.randomBirdIndex].name,
          questionPhotoURL: birdsData[this.state.currentLevel][this.state.randomBirdIndex].image,
          isNextLevelAvailable: true,
          score: this.state.score + (5 - this.state.attemptsCounter)
        })
        document.querySelector('.level--button').style.background = '#00BC8C';
        target.firstChild.style.background = '#00BC8C';
      } else if (this.state.isNextLevelAvailable) {
        return;
      } else {
        target.firstChild.style.background = '#D62C1A';
      }
    })
  }

  onLevelButtonClick = () => {
    if (!this.state.isNextLevelAvailable) {
      return;
    }
    if (this.state.currentLevel === 5) {
      this.setState({
        isEnded: true,
        isWinner: this.state.score === 30 ? true : false
      })
      document.querySelectorAll('.header--navbar--item')[this.state.currentLevel].classList.remove('active-item');
      return;
    }
    document.querySelector('.level--button').style.background = 'gray';
    this.setState({
      attemptsCounter: -1,
      currentLevel: this.state.currentLevel + 1,
      randomBirdIndex: Math.round(Math.random() * 5),
      questionName: '******',
      questionPhotoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQS7HPpywZjopJT2zElwpoI2mUjrQtmD7m4Y7hjmjqpt1A7nVx',
      currentBirdId: 0,
      currentBird: null,
      isNextLevelAvailable: false,
    }, () => {
      document.querySelectorAll('.header--navbar--item')[this.state.currentLevel - 1].classList.remove('active-item');
      document.querySelectorAll('.header--navbar--item')[this.state.currentLevel].classList.toggle('active-item');
      document.querySelectorAll('.main--answers--item').forEach(item => item.isChosen = false);
      document.querySelectorAll('.main--answers--item--indicator').forEach(item => item.style.background = '#444444');
    })
  }

  onRestartButton = () => {
    this.setState({
      score: 0,
      attemptsCounter: -1,
      currentLevel: 0,
      currentBirdId: 0,
      randomBirdIndex: Math.round(Math.random() * 5),
      questionName: '******',
      questionPhotoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQS7HPpywZjopJT2zElwpoI2mUjrQtmD7m4Y7hjmjqpt1A7nVx',
      currentBird: null,
      isNextLevelAvailable: false,
      isEnded: false,
      isWinner: false
    })
    document.querySelector('.header--navbar--item').classList.toggle('active-item');
  }

  componentDidMount() {
    document.querySelectorAll('.header--navbar--item')[this.state.currentLevel].classList.toggle('active-item');
  }

  render() {
    return (
      <div className="app--wrapper">
        <Header 
          score={this.state.score}
        />
        {this.state.isEnded ? 
          <GameEndScreen 
            isWinner={this.state.isWinner}
            score={this.state.score}
            onRestartButton={this.onRestartButton}
          /> : 
          <MainContent 
            currentLevel={this.state.currentLevel}
            onAnswerClick={this.onAnswerClick}
            currentBirdId={this.state.currentBirdId}
            randomBirdIndex={this.state.randomBirdIndex}
            questionName={this.state.questionName}
            questionPhotoURL={this.state.questionPhotoURL}
            onLevelButtonClick={this.onLevelButtonClick}
          />
        }
      </div>
    )
  }
}

export default App;
