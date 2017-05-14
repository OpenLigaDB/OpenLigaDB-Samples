import React from 'react'
import {Card, CardText} from 'material-ui/Card';

const Game = (props) => {

  const {
    homeiconsrc,
    guesticonsrc,
    hometeamname,
    guestteamname
  } = props;

  return (
    <div>
      <Card>
        <CardText>
          <img
            id='homeicon'
            src={homeiconsrc}
          />
          <img
            id='guesticon'
            src={guesticonsrc}
          />
          <p id='hometeamname'>{hometeamname}</p>
          <p id='guestteamname'>{guestteamname}</p>
        </CardText>
      </Card>
    </div>
  );
}

export default Game;
