import React from 'react'
import axios from 'axios';

export default class GameCard extends React.Component{

  constructor(props){
    super(props);

    this.state = {
			game: null
		};

    this.fetchAllGames = this.fetchAllGames.bind(this);
  }

  getUrl(){
    return "https://www.openligadb.de/api/getmatchdata/"+this.props.matchID;
  }

  fetchAllGames(){

    const url = this.getUrl();

    return axios.get(url);
  }

  componentDidMount(){
    this.fetchAllGames()
      .then(result => {
        this.setState({
          game: result.data
        });
      })
      .catch(error => {
				return error;
			});
  }

  render(){
    return(
      <div></div>
    );
  }
}
