import React from 'react'
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Game from './Game.jsx'

export default class Games extends React.Component{

  constructor(props){
    super(props);

    this.state = {
			games: []
		};

    this.fetchAllGames = this.fetchAllGames.bind(this);
  }

  fetchAllGames(){

    return axios.get(this.props.url);
  }

  componentDidMount(){
    this.fetchAllGames()
      .then(result => {
        this.setState({
          games: result.data
        });
      })
      .catch(error => {
				return error;
			});
  }

  render(){

    const listOfGames = this.state.games.map((game, index) => {

      // Das Endergebnis über die ligaübergreifende resultTypeID 2 ermitteln
      // und nicht über die Position im matchResults-Array.
      const finalResult = (game.matchResults || [])
        .find(result => result.resultTypeID === 2);

      const props = {
    			key: game.matchID,
          homeiconsrc: game.team1.teamIconUrl,
          guesticonsrc: game.team2.teamIconUrl,
          hometeamname: game.team1.teamName,
          guestteamname: game.team2.teamName,
          isGameFinished: game.matchIsFinished && finalResult !== undefined,
          hometeamgoals: finalResult ? finalResult.pointsTeam1 : null,
          guestteamgoals: finalResult ? finalResult.pointsTeam2 : null
    		}

      return (
        <Game {...props}/>
      );
    });

    return(
      <MuiThemeProvider>
        <div>
          {listOfGames}
        </div>
      </MuiThemeProvider>
    );
  }
}
