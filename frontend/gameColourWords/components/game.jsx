const React = require('react');
const GameStore = require('../stores/game_store')
const SoundStore = require('../stores/sound_store')
const GameActions= require('../actions/game_actions')
const GameBoard= require('./gameBoard.jsx')
const LevelStart = require('./levelStart.jsx')
const GameOver = require('./gameOver.jsx')
const ScoreList = require('./scoreList.jsx')
const Sound = require('react-sound');

var Game = React.createClass({
  getInitialState: function() {
    return {
            gameover:false,
            sound:{
              soundFile:"",
              playing:false
            },
            level: {
              no:1,
              running: false,
              title:"",
              seconds:0,
              question: {
                key:"",
                title: "",
                hex: "",  
                match: ""
              },
              colours: []
            }
          }
  },
  onStoreChange: function(data){
    this.setState({
      gameover: data.gameover,
      level: data.level
    }, this.onStateUpdated);
  },
  onStateUpdated: function(){
   
  },
  onSoundChange: function(data){
    this.setState({
      sound: data 
    }, this.onStateUpdated);
  },
  onSoundFinished: function(){
    GameActions.SoundFinished()
  },
  conponentWillMount: function(){
    
  },
  componentDidMount: function() {
      this.unsubscribe = GameStore.listen(this.onStoreChange);
      this.unsubscribe = SoundStore.listen(this.onSoundChange);
      GameActions.Load()
    },
  componentWillUnmount: function() {
    this.unsubscribe();
  },
  render: function() {

    let content = null;
    let sound = null;
    if (this.state.sound.playing){
      sound = <Sound url={this.state.sound.soundFile} onFinishedPlaying={this.onSoundFinished} playStatus={Sound.status.PLAYING} />
    }
    if(this.state.gameover==true){
      content = <GameOver />
    }else if (this.state.level.running==false){
      content = <LevelStart/>;
    }else{
      content = <GameBoard level={this.state.level}></GameBoard>
    }
    return (
      <div className="gamecolourwords game-container card text-center">
        <div className="game card-header heading-bk">
          <div className="game-title">
            <h2 className="card-title"> Word Colour Game</h2>
          </div>
        </div>
      <div className="levelStart card text-center">
        <div className="card-header">
          <div className="question-title">
            <h4 className="card-title"> {this.state.level.title}</h4>
          </div>
        </div>
        {content}
        <ScoreList />
      </div>
      {sound}
    </div>
    );
  }
});

module.exports = React.createFactory(Game);
