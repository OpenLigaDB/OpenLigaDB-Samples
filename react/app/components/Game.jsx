import React from 'react'
import {Card, CardText} from 'material-ui/Card';

const Game = ({homeiconsrc, guesticonsrc}) => {
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
        </CardText>
      </Card>
    </div>
  );
}

export default Game;
