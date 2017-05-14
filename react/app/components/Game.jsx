import React from 'react'
import {Card, CardText} from 'material-ui/Card';

const Game = (props) => {

  const {
    homeiconsrc,
    guesticonsrc,
    hometeamname,
    guestteamname,
    isGameFinished,
    hometeamgoals,
    guestteamgoals
  } = props;

  const imgStyle = {
    height: '75px',
  };

  let homeGoals = '-';
  let guestGoals = '-'

  if(isGameFinished){
    homeGoals = hometeamgoals;
    guestGoals = guestteamgoals;
  }

  return (
    <div>
      <Card>
        <CardText>
          <img
            id='homeicon'
            src={homeiconsrc}
            style={imgStyle}
          />
          <img
            id='guesticon'
            src={guesticonsrc}
            style={imgStyle}
          />
          <p id='hometeamname'>{hometeamname}</p>
          <h3 id='hometeamgoals'>{homeGoals}</h3>
          <p id='guestteamname'>{guestteamname}</p>
          <h3 id='guestteamgoals'>{guestGoals}</h3>
        </CardText>
      </Card>
    </div>
  );
}

export default Game;
