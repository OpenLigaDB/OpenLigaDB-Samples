import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import Game from '../../app/components/Game.jsx';

describe('The <Game> component',() => {

  let wrapper;

  before(() => {
    wrapper = shallow(<Game/>);
  });

  it('Must render a <Card>',() => {
    expect(wrapper.find('Card')).to.have.length(1);
  });

  it('Must render a <CardText>',() => {
    expect(wrapper.find('Card').find('CardText')).to.have.length(1);
  });

  describe('Must display icon of hometeam',() => {

    it('Must render the homeicon',() => {
      expect(wrapper.find('img#homeicon')).to.have.length(1);
    });

    it('homeicon must have src of props.homeiconsrc',() => {
      wrapper = shallow(<Game homeiconsrc='beautifulIcon.png'/>);
      expect(wrapper.find('img#homeicon').prop('src')).to.equal('beautifulIcon.png');
    });

  });

  describe('Must display icon of guestteam',() => {

    it('Must render the guesticon',() => {
      expect(wrapper.find('img#guesticon')).to.have.length(1);
    });

    it('homeicon must have src of props.guesticonsrc',() => {
      wrapper = shallow(<Game guesticonsrc='beautifulIconTwo.JPEG'/>);
      expect(wrapper.find('img#guesticon').prop('src')).to.equal('beautifulIconTwo.JPEG');
    });

  });

  describe('Must display name of hometeam',() => {

    it('Must render the name of the hometeam',() => {
      expect(wrapper.find('p#hometeamname')).to.have.length(1);
    });

    it('hometeamname must have text of props.hometeamname',() => {
      wrapper = shallow(<Game hometeamname='Team01'/>);
      expect(wrapper.find('p#hometeamname').text()).to.equal('Team01');
    });

  });

  describe('Must display name of guestteam',() => {

    it('Must render the name of the guestteam',() => {
      expect(wrapper.find('p#guestteamname')).to.have.length(1);
    });

    it('guestteamname must have text of props.guestteamname',() => {
      wrapper = shallow(<Game guestteamname='Whatever'/>);
      expect(wrapper.find('p#guestteamname').text()).to.equal('Whatever');
    });

  });

});
