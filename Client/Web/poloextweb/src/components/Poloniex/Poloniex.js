import React, { Component } from 'react';
import Label from '../Label/Label.js';
import TextField from '../TextField/TextField.js';
import Button from '../Button/Button.js';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import getPoloniex from '../../actions/getPoloniex.js';
import updateExchangeRatio from '../../actions/updatePoloniexExchangeRatio.js';
import getExchangeRatio from '../../actions/getPoloniexExchangeRatio.js';
import exchange from '../../actions/poloniexExchange.js';
import cancelExchange from '../../actions/poloniexCancelExchange.js';
import getWallet from '../../actions/getPoloniexWallet.js';
import updateWallet from '../../actions/updatePoloniexWallet.js';
import withdraw from '../../actions/poloniexWithdraw.js';
import setMessage from '../../actions/setMessage.js';
import Auth from '../../security/auth.js';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';

const ReactHighstock = require('react-highcharts/ReactHighstock');

class Poloniex extends Component {

  isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      price: '',
      lastPriceEth: 0,
      totalBtc: 0,
      lastPriceUsd: 0,
      totalUsd: 0,
      ethVolume: 0,
      btcVolume: 0,
      volume: '',
      sumBtc: '',
      sumUsd: 0,
      orders: [],
      deposits: [],
      withdrawals: [],
      exchangeRatio: '',
      newExchangeRatio: 0,
      wallet: '',
      newWallet: ''
    };

    this.config = {
      title: {
        text: 'ETH/BTC'
      },
      series: [{
        name: 'ETH/BTC',
        tooltip: {
          valueDecimals: 8
        }
      }],
      chart: {
        height: 300
      }
    };

    this.ordersColumns = [
      {
        Header: 'Orders',
        columns: [
          {
            Header: 'Order number',
            accessor: 'orderNumber'
          },
          {
            Header: 'Type',
            accessor: 'type'
          },
          {
            Header: 'Rate',
            accessor: 'rate'
          },
          {
            Header: 'Amount',
            accessor: 'amount'
          },
          {
            Header: 'Total',
            accessor: 'total'
          },
          {
            Header: 'Date',
            accessor: 'date'
          },
          {
            Header: 'Action',
            accessor: 'orderNumber',
            Cell: row => (
              <Button className="button__danger button__danger--small" text="Cancel" onClick={() => this.onCancelExchangeClick(row.value)} disabled={this.props.isAutomationEnabled} />
            )
          }
        ]
      }
    ];

    this.depositsColumns = [
      {
        Header: 'Deposits',
        columns: [
          {
            Header: 'Currency',
            accessor: 'currency',
            width: 100
          },
          {
            Header: 'Address',
            accessor: 'address'
          },
          {
            Header: 'Amount',
            accessor: 'amount',
            width: 200
          },
          {
            Header: 'Confirmations',
            accessor: 'confirmations',
            width: 150
          },
          {
            Header: 'Status',
            accessor: 'status',
            width: 125
          },
          {
            Header: 'Date',
            accessor: 'timestamp',
            Cell: row => (
              <div>{`${new Date(row.value * 1000)}`}</div>
            )
          }
        ]
      }
    ];

    this.withdrawalsColumns = [
      {
        Header: 'Withdrawals',
        columns: [
          {
            Header: 'Withdrawal number',
            accessor: 'withdrawalNumber',
            width: 175
          },
          {
            Header: 'Currency',
            accessor: 'currency',
            width: 100
          },
          {
            Header: 'Address',
            accessor: 'address'
          },
          {
            Header: 'Amount',
            accessor: 'amount',
            width: 125
          },
          {
            Header: 'Fee',
            accessor: 'fee',
            width: 100
          },
          {
            Header: 'IP address',
            accessor: 'ipAddress',
            width: 125
          },
          {
            Header: 'Status',
            accessor: 'status',
            width: 125
          },
          {
            Header: 'Date',
            accessor: 'timestamp',
            Cell: row => (
              <div>{`${new Date(row.value * 1000)}`}</div>
            )
          }
        ]
      }
    ];

    this.handleChange = this.handleChange.bind(this);
    this.onSetPriceClick = this.onSetPriceClick.bind(this);
    this.onSetVolumeClick = this.onSetVolumeClick.bind(this);
    this.onCancelExchangeClick = this.onCancelExchangeClick.bind(this);
    this.onUpdateExchangeRatioClick = this.onUpdateExchangeRatioClick.bind(this);
    this.onSetExchangeRatioClick = this.onSetExchangeRatioClick.bind(this);
    this.onExchangeClick = this.onExchangeClick.bind(this);
    this.onUpdateWalletClick = this.onUpdateWalletClick.bind(this);
    this.onSetWalletClick = this.onSetWalletClick.bind(this);
    this.onSetSumBtcClick = this.onSetSumBtcClick.bind(this);
    this.onWithdrawClick = this.onWithdrawClick.bind(this);
  }

  handleChange(event) {

    event.persist();
    this.setState({ [event.target.id]: event.target.value });
    this.updateTextFields(event.target.id);
  }

  updateTextFields(id) {

    if (id === 'price') {
      this.setState((state) => ({
        totalBtc: ((parseFloat(state.price) * parseFloat(state.volume)) || 0.00000000).toFixed(8),
        totalUsd: ((parseFloat(state.price) * parseFloat(state.volume) * parseFloat(state.lastPriceUsd)) || 0.00000000).toFixed(8)
      }));
    }

    if (id === 'volume') {
      this.setState((state) => ({
        totalBtc: ((parseFloat(state.price) * parseFloat(state.volume)) || 0.00000000).toFixed(8),
        totalUsd: ((parseFloat(state.price) * parseFloat(state.volume) * parseFloat(state.lastPriceUsd)) || 0.00000000).toFixed(8)
      }));
    }

    if (id === 'sumBtc') {
      this.setState((state) => ({
        sumUsd: ((parseFloat(state.sumBtc) * parseFloat(state.lastPriceUsd)) || 0.00000000).toFixed(8)
      }));
    }
  }

  onSetPriceClick() {

    this.setState((state) => ({
      price: state.lastPriceEth,
      totalBtc: ((parseFloat(state.lastPriceEth) * parseFloat(state.volume)) || 0.00000000).toFixed(8),
      totalUsd: ((parseFloat(state.lastPriceEth) * parseFloat(state.volume) * parseFloat(state.lastPriceUsd)) || 0.00000000).toFixed(8)
    }));
  }

  onSetVolumeClick() {

    this.setState((state) => ({
      volume: state.ethVolume,
      totalBtc: ((parseFloat(state.price) * parseFloat(state.ethVolume)) || 0.00000000).toFixed(8),
      totalUsd: ((parseFloat(state.price) * parseFloat(state.ethVolume) * parseFloat(state.lastPriceUsd)) || 0.00000000).toFixed(8)
    }));
  }

  onSetSumBtcClick() {

    this.setState((state) => ({
      sumBtc: state.btcVolume,
      sumUsd: ((parseFloat(state.btcVolume) * parseFloat(state.lastPriceUsd)) || 0.00000000).toFixed(8)
    }));
  }

  onCancelExchangeClick(orderNumber) {

    this.props.cancelExchange(orderNumber)
      .then(response => {

        this.props.setMessage(response && response.message ? response.message : '', true);
        this.updatePoloniex();
      })
      .catch(error => {

        this.props.setMessage(error.message || error.statusText, true);

        if (error.message === 'Failed to authenticate token.' || error.message === 'No token provided.') {
          Auth.deauthenticateUser();
          this.props.history.push('/login');
        }
      });
  }

  onUpdateExchangeRatioClick() {

    this.props.updateExchangeRatio(this.state.exchangeRatio)
      .then(response => {

        this.props.setMessage(response && response.message ? response.message : '', true);
        this.updatePoloniex();
      })
      .catch(error => {

        this.props.setMessage(error.message || error.statusText, true);

        if (error.message === 'Failed to authenticate token.' || error.message === 'No token provided.') {
          Auth.deauthenticateUser();
          this.props.history.push('/login');
        }
      });
  }

  onExchangeClick() {

    this.props.exchange(this.state.price, this.state.volume)
      .then(response => {

        this.props.setMessage(response && response.message ? response.message : '', true);
        this.updatePoloniex();
      })
      .catch(error => {

        this.props.setMessage(error.message || error.statusText, true);

        if (error.message === 'Failed to authenticate token.' || error.message === 'No token provided.') {
          Auth.deauthenticateUser();
          this.props.history.push('/login');
        }
      });
  }

  onUpdateWalletClick() {

    this.props.updateWallet(this.state.wallet)
      .then(response => {

        this.props.setMessage(response && response.message ? response.message : '', true);
        this.updatePoloniex();
      })
      .catch(error => {

        this.props.setMessage(error.message || error.statusText, true);

        if (error.message === 'Failed to authenticate token.' || error.message === 'No token provided.') {
          Auth.deauthenticateUser();
          this.props.history.push('/login');
        }
      });
  }

  onWithdrawClick() {

    this.props.withdraw(this.state.sumBtc)
      .then(response => {

        this.props.setMessage(response && response.message ? response.message : '', true);
        this.updatePoloniex();
      })
      .catch(error => {

        this.props.setMessage(error.message || error.statusText, true);

        if (error.message === 'Failed to authenticate token.' || error.message === 'No token provided.') {
          Auth.deauthenticateUser();
          this.props.history.push('/login');
        }
      });
  }

  onSetExchangeRatioClick() {

    this.setState((state) => ({
      exchangeRatio: state.newExchangeRatio
    }));
  }

  onSetWalletClick() {

    this.setState((state) => ({
      wallet: state.newWallet
    }));
  }

  getChartData(chart) {

    if (chart) {
      return chart.map(item => ([
        item.date * 1000,
        item.close
      ]));
    }

    return [];
  }

  updatePoloniex() {

    this.props.getPoloniex()
      .then(poloniex => {

        if (this.isMounted) {
          const chart = this.refs.chart.getChart();

          this.setState({
            ethVolume: poloniex.balances && poloniex.balances.data && poloniex.balances.data.ETH ? poloniex.balances.data.ETH : 0,
            btcVolume: poloniex.balances && poloniex.balances.data && poloniex.balances.data.BTC ? poloniex.balances.data.BTC : 0,
            lastPriceEth: poloniex.lastPriceEth && poloniex.lastPriceEth.data ? poloniex.lastPriceEth.data : 0,
            lastPriceUsd: poloniex.lastPriceUsd && poloniex.lastPriceUsd.data ? poloniex.lastPriceUsd.data : 0,
            orders: poloniex.orders && poloniex.orders.data ? poloniex.orders.data : [],
            deposits: poloniex.depositsWithdrawals && poloniex.depositsWithdrawals.data && poloniex.depositsWithdrawals.data.deposits ? poloniex.depositsWithdrawals.data.deposits : [],
            withdrawals: poloniex.depositsWithdrawals && poloniex.depositsWithdrawals.data && poloniex.depositsWithdrawals.data.withdrawals ? poloniex.depositsWithdrawals.data.withdrawals : []
          });

          chart.series[0].setData(poloniex.chart ? this.getChartData(poloniex.chart.data) : []);
        }
      })
      .catch(error => {

        this.props.setMessage(error.message, true);

        if (error.message === 'Failed to authenticate token.' || error.message === 'No token provided.') {
          Auth.deauthenticateUser();
          this.props.history.push('/login');
        }
      });

    this.props.getExchangeRatio()
      .then(response => {

        if (this.isMounted) {
          this.setState({
            newExchangeRatio: response.exchangeRatio ? response.exchangeRatio : 0
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

    this.props.getWallet()
      .then(response => {

        if (this.isMounted) {
          this.setState({
            newWallet: response.wallet ? response.wallet : ''
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

    const chart = this.refs.chart.getChart();
    const now = new Date();

    chart.xAxis[0].setExtremes(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() - 4), Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));

    this.updatePoloniex();

    this.timerUpdate = setInterval(() => this.updatePoloniex(), 10000);
  }

  componentWillUnmount() {

    this.isMounted = false;

    clearInterval(this.timerUpdate);
  }

  render() {

    return (
      <div className="flexWrap">
        <div className="emptyBlock"></div>
        <div className="block">
          <Label className="label__name" text="Poloniex" />
          <div className="selfCentered selfCentered__padding">
            <ReactHighstock data={this.state.chartData} config={this.config} ref="chart" isPureConfig="true"></ReactHighstock>
          </div>
          <div className="flexRow">
            <Label className="label__common" text="Price ETH/BTC" />
            <TextField input={{ value: this.state.price, onChange: this.handleChange }} type="text" id="price" placeholder={this.state.lastPriceEth} className="textField" />
            <Button className="button__primary" text="Set" onClick={this.onSetPriceClick} disabled={this.props.isAutomationEnabled} />
          </div>
          <div className="flexRow">
            <Label className="label__common" text="Volume ETH" />
            <TextField input={{ value: this.state.volume, onChange: this.handleChange }} type="text" id="volume" placeholder={this.state.ethVolume} className="textField" />
            <Button className="button__primary" text="Set" onClick={this.onSetVolumeClick} disabled={this.props.isAutomationEnabled} />
          </div>
          <ReactTable
            data={this.state.deposits}
            columns={this.depositsColumns}
            defaultPageSize={3}
            pageSizeOptions={[3, 10]}
            className="-striped -highlight"
            showPaginationBottom
            noDataText="No deposits"
            defaultSorted={[
              {
                id: 'timestamp',
                desc: true
              }
            ]} />
          <div className="flexRow">
            <Label className="label__common" text="Total BTC" />
            <TextField input={{ value: this.state.totalBtc, onChange: this.handleChange }} type="text" id="totalBtc" placeholder="Total BTC" className="textField" />
            <Label className="label__common" text="Total USD" />
            <TextField input={{ value: this.state.totalUsd, onChange: this.handleChange }} type="text" id="totalUsd" placeholder="Total USD" className="textField" />
          </div>
          <div className="flexRow">
            <Label className="label__common" text="Exchange ratio" />
            <TextField input={{ value: this.state.exchangeRatio, onChange: this.handleChange }} type="text" id="exchangeRatio" placeholder={this.state.newExchangeRatio} className="textField" />
            <Button className="button__warning" text="Update" onClick={this.onUpdateExchangeRatioClick} disabled={this.props.isAutomationEnabled} />
            <Button className="button__primary" text="Set" onClick={this.onSetExchangeRatioClick} disabled={this.props.isAutomationEnabled} />
          </div>
          <div className="selfCentered">
            <div className="flexRow">
              <Button className="button__primary" text="Exchange" onClick={this.onExchangeClick} disabled={this.props.isAutomationEnabled} />
            </div>
          </div>
          <ReactTable
            data={this.state.orders}
            columns={this.ordersColumns}
            defaultPageSize={3}
            pageSizeOptions={[3, 10]}
            className="-striped -highlight"
            showPaginationBottom
            noDataText="No orders" />
          <div className="flexRow">
            <Label className="label__common" text="Wallet" />
            <TextField input={{ value: this.state.wallet, onChange: this.handleChange }} type="text" id="wallet" placeholder={this.state.newWallet} className="textField" />
            <Button className="button__warning" text="Update" onClick={this.onUpdateWalletClick} disabled={this.props.isAutomationEnabled} />
            <Button className="button__primary" text="Set" onClick={this.onSetWalletClick} disabled={this.props.isAutomationEnabled} />
          </div>
          <div className="flexRow">
            <Label className="label__common" text="Sum BTC" />
            <TextField input={{ value: this.state.sumBtc, onChange: this.handleChange }} type="text" id="sumBtc" placeholder={this.state.btcVolume} className="textField" />
            <Button className="button__primary" text="Set" onClick={this.onSetSumBtcClick} disabled={this.props.isAutomationEnabled} />
            <Label className="label__common" text="Sum USD" />
            <TextField input={{ value: this.state.sumUsd, onChange: this.handleChange }} type="text" id="sumUsd" placeholder="Sum USD" className="textField" />
          </div>
          <div className="selfCentered">
            <div className="flexRow">
              <Button className="button__primary" text="Withdraw" onClick={this.onWithdrawClick} disabled={this.props.isAutomationEnabled} />
            </div>
          </div>
          <ReactTable
            data={this.state.withdrawals}
            columns={this.withdrawalsColumns}
            defaultPageSize={3}
            pageSizeOptions={[3, 10]}
            className="-striped -highlight"
            showPaginationBottom
            noDataText="No withdrawals"
            defaultSorted={[
              {
                id: 'timestamp',
                desc: true
              }
            ]} />
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
  getPoloniex: getPoloniex,
  updateExchangeRatio: updateExchangeRatio,
  getExchangeRatio: getExchangeRatio,
  exchange: exchange,
  cancelExchange: cancelExchange,
  getWallet: getWallet,
  updateWallet: updateWallet,
  withdraw: withdraw
};

Poloniex.propTypes = {
  setMessage: PropTypes.func.isRequired,
  getPoloniex: PropTypes.func.isRequired,
  updateExchangeRatio: PropTypes.func.isRequired,
  getExchangeRatio: PropTypes.func.isRequired,
  exchange: PropTypes.func.isRequired,
  cancelExchange: PropTypes.func.isRequired,
  getWallet: PropTypes.func.isRequired,
  updateWallet: PropTypes.func.isRequired,
  withdraw: PropTypes.func.isRequired
};

const PoloniexConnected = connect(mapStateToProps, mapDispatchToProps)(Poloniex);

export default PoloniexConnected;
