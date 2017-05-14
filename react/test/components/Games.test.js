import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Games from '../../app/components/Games.jsx';

describe('Games',() => {

  it('must have [] as default value for state.games',() => {
    const wrapper = shallow(<Games />);
    expect(wrapper.state().games).to.have.length(0);
  });

  describe('API call on componentDidMount',() => {

    it('must call ´fetchAllGames´ when component is loaded',() => {
  			let spyForAPICall = sinon.spy(Games.prototype, 'fetchAllGames');

  			const wrapper = mount(<Games url="validUrl"/>);

  			expect(spyForAPICall.calledOnce).to.be.true;

  			spyForAPICall.restore();
  		});

    it('must call ´axios.get()´ with props.url',() => {
    			let spyForAxiosCall = sinon.spy(axios, 'get');

    			const wrapper = mount(<Games url="validUrl"/>);

          expect(spyForAxiosCall.calledWith("validUrl")).to.be.true;

    			spyForAxiosCall.restore();
    });

    describe('when API call successful',() => {

      let mock,
          stubResponse,
          wrapper;

      before(() => {
        mock = new MockAdapter(axios);
        stubResponse = require('../testUtils/validStubResponse.json');

        mock.onGet('validUrl').reply(200, stubResponse);

        wrapper = mount(<Games url="validUrl"/>);
      });

      after(() => {
        mock.restore();
      });

      it('must update the state.game if API call was successfull',() => {

        return wrapper.instance().fetchAllGames().then(resp => {
          expect(resp.data).not.to.be.null;
          expect(resp.data).not.to.be.undefined;
          expect(wrapper.state().games).to.equal(resp.data);
        });

      });

      it('must render prop homeiconsrc to <Game> component',() => {

        return wrapper.instance().fetchAllGames().then(resp => {
          expect(wrapper.find('Game').at(0).prop('homeiconsrc')).to.equal("http://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Chemnitzer_FC_Logo.svg/200px-Chemnitzer_FC_Logo.svg.png");
        });

      });

      it('must render prop guesticonsrc to <Game> component',() => {

        return wrapper.instance().fetchAllGames().then(resp => {
          expect(wrapper.find('Game').at(0).prop('guesticonsrc')).to.equal("http://www.openligadb.de/images/teamicons/MSV_Duisburg.gif");
        });

      });

      it('must render prop hometeamname to <Game> component',() => {

        return wrapper.instance().fetchAllGames().then(resp => {
          expect(wrapper.find('Game').at(0).prop('hometeamname')).to.equal("Chemnitzer FC");
        });

      });

      it('must render prop guestteamname to <Game> component',() => {

        return wrapper.instance().fetchAllGames().then(resp => {
          expect(wrapper.find('Game').at(0).prop('guestteamname')).to.equal("MSV Duisburg");
        });

      });

    });

    it('must not update the state.game if API call was not successfull',() => {
      const mock = new MockAdapter(axios);

      mock.onGet('invalidUrl').reply(404);

      const wrapper = mount(<Games url="invalidUrl"/>);

      return wrapper.instance().fetchAllGames().catch(error => {
        expect(wrapper.state().games).to.have.length(0);
      });

      mock.restore();
    });

  });

  describe('render function', function(){

    let wrapper;

    before(() => {
      wrapper = shallow(<Games/>);
    });

    it('must render a <MuiThemeProvider>',() => {
      expect(wrapper.find('MuiThemeProvider')).to.have.length(1);
    });

    describe('must render as much <Game> elements as games are available',() => {

      it('for 0 games',() => {
        wrapper.setState({
          games: []
        });

        expect(wrapper.find('MuiThemeProvider').find('Game')).to.have.length(0);
      });

      it('for 1 game',() => {
        const oneGameStub = require('../testUtils/validStubResponse.json');

        wrapper.setState({
          games: oneGameStub
        });

        expect(wrapper.find('MuiThemeProvider').find('Game')).to.have.length(1);
      });

      it('for 3 games',() => {
        const multipleGamesStub = require('../testUtils/multipleStubResponse.json');

        wrapper.setState({
          games: multipleGamesStub
        });

        expect(wrapper.find('MuiThemeProvider').find('Game')).to.have.length(3);
      });

    });

  });

});
