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

      const props = {
    			key: game.MatchID,
          homeiconsrc: game.Team1.TeamIconUrl,
          guesticonsrc: game.Team2.TeamIconUrl,
          hometeamname: game.Team1.TeamName,
          guestteamname: game.Team2.TeamName,
          isGameFinished: game.MatchIsFinished,
          hometeamgoals: game.MatchResults[1].PointsTeam1,
          guestteamgoals: game.MatchResults[1].PointsTeam2
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
