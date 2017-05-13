import React from 'react';
import ReactDOM from 'react-dom';
import Games from './components/Games.jsx';

ReactDOM.render(
    <Games url="https://www.openligadb.de/api/getmatchdata/bl3/2016/36"/>,
    document.getElementById('app')
);
