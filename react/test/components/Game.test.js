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
      expect(wrapper.find('#hometeamname')).to.have.length(1);
    });

    it('hometeamname must have text of props.hometeamname',() => {
      wrapper = shallow(<Game hometeamname='Team01'/>);
      expect(wrapper.find('#hometeamname').text()).to.equal('Team01');
    });

  });

  describe('Must display name of guestteam',() => {

    it('Must render the name of the guestteam',() => {
      expect(wrapper.find('#guestteamname')).to.have.length(1);
    });

    it('guestteamname must have text of props.guestteamname',() => {
      wrapper = shallow(<Game guestteamname='Whatever'/>);
      expect(wrapper.find('#guestteamname').text()).to.equal('Whatever');
    });

  });

  describe('Must display goals of hometeam',() => {

    it('Must render the hometeam goals',() => {
      expect(wrapper.find('#hometeamgoals')).to.have.length(1);
    });

    describe('hometeamgoals must have value of props.hometeamgoals',() => {

      it('goals must be displayed if game is finished',() => {
        const testProps = {
          isGameFinished: true,
          hometeamgoals: 99
        }
        wrapper = shallow(<Game {...testProps}/>);
        expect(wrapper.find('#hometeamgoals').text()).to.equal('99');
      });

      it('no goals must be displayed if game is not finished',() => {
        const testProps = {
          isGameFinished: false,
          hometeamgoals: 13
        }
        wrapper = shallow(<Game {...testProps}/>);
        expect(wrapper.find('#hometeamgoals').text()).to.equal('-');
      });

    });

  });

  describe('Must display goals of guestteam',() => {

    it('Must render the guestteam goals',() => {
      expect(wrapper.find('#guestteamgoals')).to.have.length(1);
    });

    describe('guestteamgoals must have value of props.guestteamgoals',() => {

      it('goals must be displayed if game is finished',() => {
        const testProps = {
          isGameFinished: true,
          guestteamgoals: 7
        }
        wrapper = shallow(<Game {...testProps}/>);
        expect(wrapper.find('#guestteamgoals').text()).to.equal('7');
      });

      it('no goals must be displayed if game is not finished',() => {
        const testProps = {
          isGameFinished: false,
          guestteamgoals: 7
        }
        wrapper = shallow(<Game {...testProps}/>);
        expect(wrapper.find('#guestteamgoals').text()).to.equal('-');
      });

    });
  });

});
