import React from 'react';
import ReactDOM from 'react-dom';
import Games from './components/Games.jsx';

ReactDOM.render(
    <Games url="https://api.openligadb.de/getmatchdata/bl1/2016/33"/>,
    document.getElementById('app')
);
