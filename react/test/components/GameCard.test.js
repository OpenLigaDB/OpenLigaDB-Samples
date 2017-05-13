import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import GameCard from '../../app/components/GameCard.jsx';

describe('GameCard',() => {

  it('must have a default state value null for ´game`',() => {
    const wrapper = shallow(<GameCard />);
    expect(wrapper.state().game).to.be.null;
  });

  describe('API call on componentDidMount',() => {

    it('must make the call when component is loaded',() => {
  			let spyForAPICall = sinon.spy(GameCard.prototype, 'fetchAllGames');

  			const wrapper = mount(<GameCard matchID={40085}/>);

  			expect(spyForAPICall.calledOnce).to.be.true;

  			spyForAPICall.restore();
  		});

    it('must get the proper URL with prop.matchID',() => {
      const wrapper = mount(<GameCard matchID={12345}/>);
      expect(wrapper.instance().getUrl()).to.equal("https://www.openligadb.de/api/getmatchdata/12345");
    });

    it('must update the state.game if API call was successfull',() => {
      const mock = new MockAdapter(axios);
      const stubResponse = require('../testUtils/validStubResponse.json');

      mock.onGet(/\/getmatchdata\/\d+/).reply(200, stubResponse);

      const wrapper = mount(<GameCard matchID={1234}/>);
      let spyForGetUrl = sinon.spy(GameCard.prototype, 'getUrl');

      return wrapper.instance().fetchAllGames().then(resp => {
        expect(spyForGetUrl.calledOnce).to.be.true;
        expect(resp.data).not.to.be.null;
        expect(resp.data).not.to.be.undefined;
        expect(wrapper.state().game).to.equal(resp.data);
      });

      mock.restore();
    });

    it('must not update the state.game if API call was not successfull',() => {
      const mock = new MockAdapter(axios);

      mock.onGet(/\/getmatchdata\/\d+/).reply(404);

      const wrapper = mount(<GameCard matchID={1234}/>);

      return wrapper.instance().fetchAllGames().catch(error => {
        expect(wrapper.state().game).to.be.null;
      });

      mock.restore();
    });

  });

  describe('render function', function(){

    let wrapper;

    before(() => {
      wrapper = shallow(<GameCard/>);
    });

    it('must render a <MuiThemeProvider>',() => {
      expect(wrapper.find('MuiThemeProvider')).to.have.length(1);
    });

    it('must render a <Card>',() => {
      expect(wrapper.find('MuiThemeProvider').find('Card')).to.have.length(1);
    });

    it('must render a <CardHeader>',() => {
      expect(wrapper.find('Card').find('CardHeader')).to.have.length(1);
    });

  });

});
