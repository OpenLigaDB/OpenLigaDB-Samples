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

  const style = {
    imgStyle: {
      height: '75px',
      padding: '10px'
    },
    imgDiv: {
      display: 'flex',
      justifyContent: 'center'
    },
    nameDiv: {
      display: 'flex',
      justifyContent: 'center',
      padding: '20px'
    }
  };

  let homeGoals = isGameFinished ? hometeamgoals : '-';
  let guestGoals = isGameFinished ? guestteamgoals : '-';

  return (
    <div style={{width: 400}}>
      <Card>
        <CardText>
          <div style={style.imgDiv}>
            <img
              id='homeicon'
              src={homeiconsrc}
              style={style.imgStyle}
            />
            <img
              id='guesticon'
              src={guesticonsrc}
              style={style.imgStyle}
            />
          </div>
          <div style={style.imgDiv}>
            <p id='hometeamname'>{hometeamname}</p>
            <p style={{width: 25, textAlign: 'center'}}> : </p>
            <p id='guestteamname'>{guestteamname}</p>
          </div>
          <div style={style.imgDiv}>
            <h1 id='hometeamgoals'>{homeGoals}</h1>
            <p style={{width: 75}}></p>
            <h1 id='guestteamgoals'>{guestGoals}</h1>
          </div>
        </CardText>
      </Card>
    </div>
  );
}

export default Game;
