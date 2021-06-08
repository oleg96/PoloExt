import React, { Component } from 'react';
import Label from '../Label/Label.js';
import TextField from '../TextField/TextField.js';
import Button from '../Button/Button.js';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import getCalculator from '../../actions/getCalculator.js';
import getCalculatorSpeed from '../../actions/getCalculatorSpeed.js';
import updatePrice from '../../actions/updateCalculatorPrice.js';
import updateProfit from '../../actions/updateCalculatorProfit.js';
import updateOrderSum from '../../actions/updateCalculatorOrderSum.js';
import updateSpeed from '../../actions/updateCalculatorSpeed.js';
import setMessage from '../../actions/setMessage.js';
import Auth from '../../security/auth.js';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';

class Calculator extends Component {

  isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      lastPriceUsd: 0,
      pastDayPriceUsd: 0,
      lastPriceEth: 0,
      pastDayPriceEth: 0,
      profitability: 0,
      profit: '',
      newProfit: 0,
      differenceUsd: 0,
      differenceEth: 0,
      difficulty: 0,
      coins: 0,
      coinsBtc: 0,
      dayProfitability: 0,
      dayCoinsBTC: 0,
      dayCoinsUSD: 0,
      price: '',
      newPrice: 0,
      orderSum: '',
      newOrderSum: 0,
      prediction: [],
      speed: '',
      newSpeed: 0,
      nicehashTime: '0:00:00',
      fullTime: '0:00:00'
    };

    this.predictionColumns = [
      {
        columns: [
          {
            Header: 'Sum BTC',
            accessor: 'sumBtc',
            width: 125
          },
          {
            Header: 'Sum USD',
            accessor: 'sumUsd',
            width: 125
          },
          {
            Header: 'Date',
            accessor: 'date',
            Cell: row => (
              <div>{`${new Date(row.value)}`}</div>
            ),
            width: 550
          }
        ]
      }
    ];

    this.handleChange = this.handleChange.bind(this);
    this.onUpdatePriceClick = this.onUpdatePriceClick.bind(this);
    this.onUpdateProfitClick = this.onUpdateProfitClick.bind(this);
    this.onUpdateOrderSumClick = this.onUpdateOrderSumClick.bind(this);
    this.onUpdateSpeedClick = this.onUpdateSpeedClick.bind(this);
    this.onSetPriceClick = this.onSetPriceClick.bind(this);
    this.onSetProfitClick = this.onSetProfitClick.bind(this);
    this.onSetOrderSumClick = this.onSetOrderSumClick.bind(this);
    this.onSetSpeedClick = this.onSetSpeedClick.bind(this);
  }

  handleChange(event) {

    event.persist();
    this.setState({ [event.target.id]: event.target.value });
  }

  updateCalculator() {

    this.props.getCalculator()
      .then(calculator => {

        if (this.isMounted) {
          this.setState({
            lastPriceUsd: calculator.lastPriceUsd ? calculator.lastPriceUsd : 0,
            pastDayPriceUsd: calculator.pastDayPriceUsd ? calculator.pastDayPriceUsd : 0,
            lastPriceEth: calculator.lastPriceEth ? calculator.lastPriceEth : 0,
            pastDayPriceEth: calculator.pastDayPriceEth ? calculator.pastDayPriceEth : 0,
            newProfit: calculator.profit ? calculator.profit : 0,
            profitability: calculator.profitability ? calculator.profitability : 0,
            differenceUsd: this.getDifference(calculator.lastPriceUsd, calculator.pastDayPriceUsd),
            differenceEth: this.getDifference(calculator.lastPriceEth, calculator.pastDayPriceEth),
            difficulty: calculator.difficulty ? calculator.difficulty : 0,
            coins: calculator.coins ? calculator.coins : 0,
            dayProfitability: calculator.dayProfitability ? calculator.dayProfitability : 0,
            coinsBtc: calculator.coinsBTC ? calculator.coinsBTC : 0,
            dayCoinsBTC: calculator.dayCoinsBTC ? calculator.dayCoinsBTC : 0,
            dayCoinsUSD: calculator.dayCoinsBTC && calculator.lastPriceUsd ? (calculator.dayCoinsBTC * calculator.lastPriceUsd).toFixed(8) : 0,
            newPrice: calculator.price ? calculator.price : 0,
            newOrderSum: calculator.orderSum ? calculator.orderSum : 0,
            prediction: calculator.prediction ? calculator.prediction : [],
            nicehashTime: calculator.nicehashTimeString ? calculator.nicehashTimeString : '0:00:00',
            fullTime: calculator.fullTimeString ? calculator.fullTimeString : '0:00:00'
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

    this.props.getCalculatorSpeed()
      .then(response => {

        if (this.isMounted) {
          this.setState({
            newSpeed: response.speed ? response.speed : 0,
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

    this.updateCalculator();

    this.timerUpdate = setInterval(() => this.updateCalculator(), 10000);
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

  onUpdatePriceClick() {

    this.props.updatePrice(this.state.price)
      .then(response => {

        this.props.setMessage(response && response.message ? response.message : '', true);
        this.updateCalculator();
      })
      .catch(error => {

        this.props.setMessage(error.message || error.statusText, true);

        if (error.message === 'Failed to authenticate token.' || error.message === 'No token provided.') {
          Auth.deauthenticateUser();
          this.props.history.push('/login');
        }
      });
  }

  onUpdateProfitClick() {

    this.props.updateProfit(this.state.profit)
      .then(response => {

        this.props.setMessage(response && response.message ? response.message : '', true);
        this.updateCalculator();
      })
      .catch(error => {

        this.props.setMessage(error.message || error.statusText, true);

        if (error.message === 'Failed to authenticate token.' || error.message === 'No token provided.') {
          Auth.deauthenticateUser();
          this.props.history.push('/login');
        }
      });
  }

  onUpdateOrderSumClick() {

    this.props.updateOrderSum(this.state.orderSum)
      .then(response => {

        this.props.setMessage(response && response.message ? response.message : '', true);
        this.updateCalculator();
      })
      .catch(error => {

        this.props.setMessage(error.message || error.statusText, true);

        if (error.message === 'Failed to authenticate token.' || error.message === 'No token provided.') {
          Auth.deauthenticateUser();
          this.props.history.push('/login');
        }
      });
  }

  onUpdateSpeedClick() {

    this.props.updateSpeed(this.state.speed)
      .then(response => {

        this.props.setMessage(response && response.message ? response.message : '', true);
        this.updateCalculator();
      })
      .catch(error => {

        this.props.setMessage(error.message || error.statusText, true);

        if (error.message === 'Failed to authenticate token.' || error.message === 'No token provided.') {
          Auth.deauthenticateUser();
          this.props.history.push('/login');
        }
      });
  }

  onSetPriceClick() {

    this.setState((state) => ({
      price: state.newPrice
    }));
  }

  onSetProfitClick() {

    this.setState((state) => ({
      profit: state.newProfit
    }));
  }

  onSetOrderSumClick() {

    this.setState((state) => ({
      orderSum: state.newOrderSum
    }));
  }

  onSetSpeedClick() {

    this.setState((state) => ({
      speed: state.newSpeed
    }));
  }

  render() {

    return (
      <div className="flexWrap">
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
          <div className="flexRow">
            <Label className="label__common" text="Price BTC/TH/Day" />
            <TextField input={{ value: this.state.price, onChange: this.handleChange }} type="text" id="price" placeholder={this.state.newPrice} className="textField" />
            <Button className="button__warning" text="Update" onClick={this.onUpdatePriceClick} disabled={this.props.isAutomationEnabled} />
            <Button className="button__primary" text="Set" onClick={this.onSetPriceClick} disabled={this.props.isAutomationEnabled} />
          </div>
          <div className="flexRow">
            <Label className="label__common" text="Speed TH/s" />
            <TextField input={{ value: this.state.speed, onChange: this.handleChange }} type="text" id="speed" placeholder={this.state.newSpeed} className="textField" />
            <Button className="button__warning" text="Update" onClick={this.onUpdateSpeedClick} disabled={this.props.isAutomationEnabled} />
            <Button className="button__primary" text="Set" onClick={this.onSetSpeedClick} disabled={this.props.isAutomationEnabled} />
          </div>
          <Label className="label__common" text={`Current profit ${this.state.profitability} %`} />
          <div className="flexRow">
            <Label className="label__common" text="Needed profit" />
            <TextField input={{ value: this.state.profit, onChange: this.handleChange }} type="text" id="profit" placeholder={this.state.newProfit} className="textField" />
            <Label className="label__common" text="%" />
            <Button className="button__warning" text="Update" onClick={this.onUpdateProfitClick} disabled={this.props.isAutomationEnabled} />
            <Button className="button__primary" text="Set" onClick={this.onSetProfitClick} disabled={this.props.isAutomationEnabled} />
          </div>
          <div className="flexRow">
            <Label className="label__common" text="Order sum" />
            <TextField input={{ value: this.state.orderSum, onChange: this.handleChange }} type="text" id="orderSum" placeholder={this.state.newOrderSum} className="textField" />
            <Button className="button__warning" text="Update" onClick={this.onUpdateOrderSumClick} disabled={this.props.isAutomationEnabled} />
            <Button className="button__primary" text="Set" onClick={this.onSetOrderSumClick} disabled={this.props.isAutomationEnabled} />
          </div>
          <Label className="label__common" text={`Difficulty ${this.state.difficulty}`} />
          <Label className="label__common" text={`BTC/TH/Day ${this.state.coinsBtc}`} />
          <Label className="label__common" text={`ETH/TH/Day ${this.state.coins}`} />
          <Label className="label__common" text={`Daily profitability ${this.state.dayProfitability} %`} />
          <Label className="label__common" text={`Daily BTC ${this.state.dayCoinsBTC}`} />
          <Label className="label__common" text={`Daily USD ${this.state.dayCoinsUSD}`} />
          <Label className="label__common" text={`Nicehash time ${this.state.nicehashTime}`} />
          <Label className="label__common" text={`Full time ${this.state.fullTime}`} />
          <ReactTable
            data={this.state.prediction}
            columns={this.predictionColumns}
            defaultPageSize={10}
            pageSizeOptions={[5, 10]}
            className="-striped -highlight"
            showPaginationBottom
            noDataText="No prediction" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {

  return {
    isAutomationEnabled: state.automation.isEnabled
  }
}

const mapDispatchToProps = {
  setMessage: setMessage,
  getCalculator: getCalculator,
  getCalculatorSpeed: getCalculatorSpeed,
  updatePrice: updatePrice,
  updateProfit: updateProfit,
  updateOrderSum: updateOrderSum,
  updateSpeed: updateSpeed
};

Calculator.propTypes = {
  setMessage: PropTypes.func.isRequired,
  getCalculator: PropTypes.func.isRequired,
  getCalculatorSpeed: PropTypes.func.isRequired,
  updatePrice: PropTypes.func.isRequired,
  updateProfit: PropTypes.func.isRequired,
  updateOrderSum: PropTypes.func.isRequired,
  updateSpeed: PropTypes.func.isRequired
};

const CalculatorConnected = connect(mapStateToProps, mapDispatchToProps)(Calculator);

export default CalculatorConnected;
