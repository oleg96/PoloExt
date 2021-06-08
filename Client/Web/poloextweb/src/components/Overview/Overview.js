import React, { Component } from 'react';
import Label from '../Label/Label.js';
import { connect } from 'react-redux';
import getOverview from '../../actions/getOverview.js';
import setMessage from '../../actions/setMessage.js';
import Auth from '../../security/auth.js';
import PropTypes from 'prop-types';

class Overview extends Component {

  isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      lastPriceUsd: 0,
      pastDayPriceUsd: 0,
      lastPriceEth: 0,
      pastDayPriceEth: 0,
      profitability: 0,
      profit: 0,
      differenceUsd: 0,
      differenceEth: 0,
      ethVolume: 0,
      ethVolumeInUsd: 0,
      btcVolume: 0,
      btcVolumeInUsd: 0,
      poloniexActiveOrders: 0,
      nicehashActiveOrders: 0,
      nicehashOrderSpeed: 0,
      nicehashOrderMiners: 0,
      nicehashOrderProgress: 0,
      nicehashConfirmedBalance: 0
    };
  }
  
  getOrderProgress(btcAvailable, btcPaid) {

    const btcAvailableParsed = parseFloat(btcAvailable);
    const btcPaidParsed = parseFloat(btcPaid);
    const btcTotal = btcAvailableParsed + btcPaidParsed;

    return +((btcPaidParsed * 100) / btcTotal).toFixed(4);
  }

  updateOverview() {

    this.props.getOverview()
      .then(overview => {

        if (this.isMounted) {
          this.setState({
            lastPriceUsd: overview.lastPriceUsd && overview.lastPriceUsd.data ? overview.lastPriceUsd.data : 0,
            pastDayPriceUsd: overview.pastDayPriceUsd ? overview.pastDayPriceUsd : 0,
            lastPriceEth: overview.lastPriceEth && overview.lastPriceEth.data ? overview.lastPriceEth.data : 0,
            pastDayPriceEth: overview.pastDayPriceEth ? overview.pastDayPriceEth : 0,
            profit: overview.profit ? overview.profit : 0,
            profitability: overview.profitability ? overview.profitability : 0,
            differenceUsd: this.getDifference(overview.lastPriceUsd.data, overview.pastDayPriceUsd),
            differenceEth: this.getDifference(overview.lastPriceEth.data, overview.pastDayPriceEth),
            ethVolume: overview.balances && overview.balances.data && overview.balances.data.ETH ? overview.balances.data.ETH : 0,
            ethVolumeInUsd: overview.balances && overview.balances.data && overview.balances.data.ETH && overview.lastPriceEth && overview.lastPriceEth.data && overview.lastPriceUsd && overview.lastPriceUsd.data ? (overview.balances.data.ETH * overview.lastPriceEth.data * overview.lastPriceUsd.data).toFixed(8) : 0,
            btcVolume: overview.balances && overview.balances.data && overview.balances.data.BTC ? overview.balances.data.BTC : 0,
            btcVolumeInUsd: overview.balances && overview.balances.data && overview.balances.data.BTC && overview.lastPriceUsd && overview.lastPriceUsd.data ? (overview.balances.data.BTC * overview.lastPriceUsd.data).toFixed(8) : 0,
            poloniexActiveOrders: overview.orders && overview.orders.data ? overview.orders.data.length : 0,
            nicehashActiveOrders: overview.userOrders ? overview.userOrders.length : 0,
            nicehashOrderSpeed: overview.userOrders && overview.userOrders.length && overview.userOrders[0].accepted_speed ? overview.userOrders[0].accepted_speed : 0,
            nicehashOrderMiners: overview.userOrders && overview.userOrders.length && overview.userOrders[0].workers ? overview.userOrders[0].workers : 0,
            nicehashOrderProgress: overview.userOrders && overview.userOrders.length && overview.userOrders[0].btc_avail && overview.userOrders[0].btc_paid ? this.getOrderProgress(overview.userOrders[0].btc_avail, overview.userOrders[0].btc_paid) : 0,
            nicehashConfirmedBalance: overview.userBalance ? overview.userBalance : 0
          });
        }
      })
      .catch(error => {

        this.props.setMessage(error.message, true);

        if (error.message === 'Failed to authenticate token.' || error.message === 'No token provided.') {
          Auth.deauthenticateUser();
          this.props.history.push('/login');
        }
      });
  }

  componentDidMount() {

    this.isMounted = true;

    this.updateOverview();

    this.timerUpdate = setInterval(() => this.updateOverview(), 10000);
  }

  componentWillUnmount() {

    this.isMounted = false;

    clearInterval(this.timerUpdate);
  }

  getDifference(last, past) {

    if (last && past) {
      const difference = ((last / past - 1) * 100).toFixed(2);

      return difference > 0 ? `+${difference}` : difference;
    }

    return 0;
  }

  getLabelClass(last, past) {

    const lastParsed = +last;
    const pastParsed = +past;

    if ((lastParsed && pastParsed) && lastParsed !== pastParsed) {
      const difference = ((lastParsed / pastParsed - 1) * 100).toFixed(2);

      return difference > 0 ? 'label__green' : 'label__red';
    }

    return 'label__common';
  }

  getPluralText(number, singleText, pluralText) {

    if (number === 1) {
      return `${number} ${singleText}`;
    }

    return `${number} ${pluralText}`;
  }

  render() {

    return (
      <div className="flexWrap flexWrap__centered">
        <div className="emptyBlock"></div>
        <div className="block">
          <Label className="label__name" text="Calculator" />
          <div className="flexRow space-between">
            <Label className="label__common" text={`BTC/USD ${this.state.lastPriceUsd}`} />
            <Label className="label__common" text={`BTC/USD day ago ${this.state.pastDayPriceUsd}`} />
            <Label
              className={this.getLabelClass(this.state.lastPriceUsd, this.state.pastDayPriceUsd)}
              text={`${this.state.differenceUsd} %`} />
          </div>
          <div className="flexRow space-between">
            <Label className="label__common" text={`ETH/BTC ${this.state.lastPriceEth}`} />
            <Label className="label__common" text={`ETH/BTC day ago ${this.state.pastDayPriceEth}`} />
            <Label
              className={this.getLabelClass(this.state.lastPriceEth, this.state.pastDayPriceEth)}
              text={`${this.state.differenceEth} %`} />
          </div>
          <Label className="label__common" text={`Current profit ${this.state.profitability} %`} />
          <Label className="label__common" text={`Needed profit ${this.state.profit} %`} />
        </div>
        <div className="block">
          <Label className="label__name" text="Poloniex" />
          <div className="flexRow space-between">
            <Label className="label__common" text={`ETH volume ${this.state.ethVolume}`} />
            <Label className="label__common" text={`In USD ${this.state.ethVolumeInUsd}`} />
          </div>
          <div className="flexRow space-between">
            <Label className="label__common" text={`BTC volume ${this.state.btcVolume}`} />
            <Label className="label__common" text={`In USD ${this.state.btcVolumeInUsd}`} />
          </div>
          <Label className="label__common" text={this.getPluralText(this.state.poloniexActiveOrders, 'active order', 'active orders')} />
        </div>
        <div className="block">
          <Label className="label__name" text="Nicehash" />
          <Label className="label__common" text={this.getPluralText(this.state.nicehashActiveOrders, 'active order', 'active orders')} />
          <Label className="label__common" text={`Speed ${this.state.nicehashOrderSpeed} GH/s`} />
          <Label className="label__common" text={`Miners ${this.state.nicehashOrderMiners}`} />
          <Label className="label__common" text={`Progress ${this.state.nicehashOrderProgress} %`} />
          <Label className="label__common" text={`Confirmed balance ${this.state.nicehashConfirmedBalance} BTC`} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setMessage: setMessage,
  getOverview: getOverview,
};

Overview.propTypes = {
  setMessage: PropTypes.func.isRequired,
  getOverview: PropTypes.func.isRequired
};

const OverviewConnected = connect(null, mapDispatchToProps)(Overview);

export default OverviewConnected;
