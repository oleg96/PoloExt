import React, { Component } from 'react';
import Label from '../Label/Label.js';
import TextField from '../TextField/TextField.js';
import Button from '../Button/Button.js';
import ProgressBar from '../ProgressBar/ProgressBar.js';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import getNicehash from '../../actions/getNicehash.js';
import getSpeedLimit from '../../actions/getNicehashSpeedLimit.js';
import updateSpeedLimit from '../../actions/updateNicehashSpeedLimit.js';
import order from '../../actions/nicehashOrder.js';
import cancelOrder from '../../actions/nicehashCancelOrder.js';
import orderIncreasePrice from '../../actions/nicehashOrderIncreasePrice.js';
import orderDecreasePrice from '../../actions/nicehashOrderDecreasePrice.js';
import orderChangeLimit from '../../actions/nicehashOrderChangeLimit.js';
import setMessage from '../../actions/setMessage.js';
import Auth from '../../security/auth.js';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';

class Nicehash extends Component {

  isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      price: 0,
      orderPrice: '',
      newOrderPrice: 0,
      speed: '',
      speedLimit: 0,
      limit: '',
      newLimit: 0,
      orderAlgo: '-',
      orderBtcAvailable: 0,
      orderPool: '-',
      orderBtcPaid: 0,
      orderPoolUsername: '-',
      orderPoolPassword: '-',
      orderMiners: 0,
      orderSpeed: 0,
      sumBtc: '',
      order: '-',
      orderType: '-',
      confirmedBalance: 0,
      progress: 0
    };

    this.allOrdersColumns = [
      {
        Header: 'All orders',
        columns: [
          {
            Header: 'Order',
            accessor: 'id'
          },
          {
            Header: 'Type',
            accessor: 'type'
          },
          {
            Header: 'Price (BTC/TH/Day)',
            accessor: 'price',
            sortMethod: (a, b) => {
              return parseFloat(a) > parseFloat(b) ? 1 : -1;
            }
          },
          {
            Header: 'Limit (TH/s)',
            accessor: 'limit',
            sortMethod: (a, b) => {
              return parseFloat(a) > parseFloat(b) ? 1 : -1;
            }
          },
          {
            Header: 'Miners',
            accessor: 'rigsCount'
          },
          {
            Header: 'Speed (TH/s)',
            accessor: 'acceptedSpeed',
            sortMethod: (a, b) => {
              return parseFloat(a) > parseFloat(b) ? 1 : -1;
            }
          }
        ]
      }
    ];

    this.handleChange = this.handleChange.bind(this);
    this.onSetSumBtcClick = this.onSetSumBtcClick.bind(this);
    this.onSetSpeedLimitClick = this.onSetSpeedLimitClick.bind(this);
    this.onUpdateSpeedLimitClick = this.onUpdateSpeedLimitClick.bind(this);
    this.onOrderCreateClick = this.onOrderCreateClick.bind(this);
    this.onCancelOrderClick = this.onCancelOrderClick.bind(this);
    this.onOrderIncreasePriceClick = this.onOrderIncreasePriceClick.bind(this);
    this.onOrderDecreasePriceClick = this.onOrderDecreasePriceClick.bind(this);
    this.onOrderChangeLimitClick = this.onOrderChangeLimitClick.bind(this);
    this.onSetOrderPriceClick = this.onSetOrderPriceClick.bind(this);
    this.onSetOrderLimitClick = this.onSetOrderLimitClick.bind(this);
  }

  handleChange(event) {

    event.persist();
    this.setState({ [event.target.id]: event.target.value });
  }

  onSetSumBtcClick() {

    this.setState((state) => ({
      sumBtc: state.confirmedBalance
    }));
  }

  onSetSpeedLimitClick() {

    this.setState((state) => ({
      speed: state.speedLimit
    }));
  }

  onSetOrderPriceClick() {

    this.setState((state) => ({
      orderPrice: state.newOrderPrice
    }));
  }

  onSetOrderLimitClick() {

    this.setState((state) => ({
      limit: state.newLimit
    }));
  }

  onUpdateSpeedLimitClick() {

    this.props.updateSpeedLimit(this.state.speed)
      .then(response => {

        this.props.setMessage(response && response.message ? response.message : '', true);
        this.updateNicehash();
      })
      .catch(error => {

        this.props.setMessage(error.message || error.statusText, true);

        if (error.message === 'Failed to authenticate token.' || error.message === 'No token provided.') {
          Auth.deauthenticateUser();
          this.props.history.push('/login');
        }
      });
  }

  onOrderCreateClick() {

    this.props.order(this.state.sumBtc, this.state.price)
      .then(response => {

        this.props.setMessage(response && response.message ? response.message : '', true);
        this.updateNicehash();
      })
      .catch(error => {

        this.props.setMessage(error.message || error.statusText, true);

        if (error.message === 'Failed to authenticate token.' || error.message === 'No token provided.') {
          Auth.deauthenticateUser();
          this.props.history.push('/login');
        }
      });
  }

  onCancelOrderClick() {

    this.props.cancelOrder(this.state.order.toString())
      .then(response => {

        this.props.setMessage(response && response.message ? response.message : '', true);
        this.updateNicehash();
      })
      .catch(error => {

        this.props.setMessage(error.message || error.statusText, true);

        if (error.message === 'Failed to authenticate token.' || error.message === 'No token provided.') {
          Auth.deauthenticateUser();
          this.props.history.push('/login');
        }
      });
  }

  onOrderIncreasePriceClick() {

    this.props.orderIncreasePrice(this.state.order.toString(), this.state.orderPrice)
      .then(response => {

        this.props.setMessage(response && response.message ? response.message : '', true);
        this.updateNicehash();
      })
      .catch(error => {

        this.props.setMessage(error.message || error.statusText, true);

        if (error.message === 'Failed to authenticate token.' || error.message === 'No token provided.') {
          Auth.deauthenticateUser();
          this.props.history.push('/login');
        }
      });
  }

  onOrderDecreasePriceClick() {

    this.props.orderDecreasePrice(this.state.order.toString())
      .then(response => {

        this.props.setMessage(response && response.message ? response.message : '', true);
        this.updateNicehash();
      })
      .catch(error => {

        this.props.setMessage(error.message || error.statusText, true);

        if (error.message === 'Failed to authenticate token.' || error.message === 'No token provided.') {
          Auth.deauthenticateUser();
          this.props.history.push('/login');
        }
      });
  }

  onOrderChangeLimitClick() {

    this.props.orderChangeLimit(this.state.order.toString(), this.state.limit)
      .then(response => {

        this.props.setMessage(response && response.message ? response.message : '', true);
        this.updateNicehash();
      })
      .catch(error => {

        this.props.setMessage(error.message || error.statusText, true);

        if (error.message === 'Failed to authenticate token.' || error.message === 'No token provided.') {
          Auth.deauthenticateUser();
          this.props.history.push('/login');
        }
      });
  }

  getMaxOfArray(numArray = []) {

    return Math.max.apply(null, numArray);
  }

  getMinOfArray(numArray = []) {

    return Math.min.apply(null, numArray);
  }

  getSumOfArray(numArray = []) {

    return numArray.reduce((previous, current) => (
      parseFloat(previous) + parseFloat(current)
    ), 0);
  }

  getAverageOfArray(numArray = []) {

    return numArray.reduce((previous, current) => (
      parseFloat(previous) + parseFloat(current)
    ), 0) / numArray.length || 0;
  }

  getTotalStats(allOrders) {

    if (allOrders) {
      const max = this.getMaxOfArray(allOrders.map(order => (order.acceptedSpeed))).toFixed(4);
      const min = this.getMinOfArray(allOrders.map(order => (order.acceptedSpeed))).toFixed(4);
      const activeOrders = allOrders.filter(order => parseFloat(order.acceptedSpeed) > 0);
      const average = this.getAverageOfArray(activeOrders.map(order => (order.acceptedSpeed))).toFixed(4);
      const total = this.getSumOfArray(allOrders.map(order => (order.acceptedSpeed))).toFixed(4);

      return `${total} TH/s (${max} TH/s - max, ${min} TH/s - min, ${average} TH/s - average) (${activeOrders.length} active orders, ${allOrders.length} total orders)`;
    }

    return '0 TH/s (0 GH/s - max, 0 TH/s - min, 0 TH/s - avg) (0 active orders, 0 total orders)';
  }

  getOrderProgress(btcAvailable, btcPaid) {

    const btcAvailableParsed = parseFloat(btcAvailable);
    const btcPaidParsed = parseFloat(btcPaid);
    const btcTotal = btcAvailableParsed + btcPaidParsed;

    return +((btcPaidParsed * 100) / btcTotal).toFixed(4);
  }

  updateNicehash() {

    this.props.getNicehash()
      .then(nicehash => {

        if (this.isMounted) {
          const order = nicehash.userOrders && nicehash.userOrders.length ? nicehash.userOrders[0] : {};

          this.setState({
            allOrders: nicehash.allOrders,
            confirmedBalance: nicehash.userBalance ? nicehash.userBalance : 0,
            order: order.id ? order.id : '-',
            orderType: (order.type === 0 || order.type === 1) ? order.type === 1 ? 'Fixed' : 'Standard' : '-',
            newOrderPrice: order.price ? order.price : 0,
            newLimit: order.limit_speed ? order.limit_speed : 0,
            orderAlgo: order.algo ? order.algo === 20 ? 'DaggerHashimoto' : 'Unknown' : '-',
            orderBtcAvailable: order.btc_avail ? order.btc_avail : 0,
            orderPool: order.pool_host && order.pool_port ? `${order.pool_host}:${order.pool_port}` : '-',
            orderBtcPaid: order.btc_paid ? order.btc_paid : 0,
            orderPoolUsername: order.pool_user ? order.pool_user : '-',
            orderPoolPassword: order.pool_pass ? order.pool_pass : '-',
            orderMiners: order.workers ? order.workers : 0,
            orderSpeed: order.accepted_speed ? order.accepted_speed : 0,
            progress: order.btc_avail && order.btc_paid ? this.getOrderProgress(order.btc_avail, order.btc_paid) : 0
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

    this.props.getSpeedLimit()
      .then(response => {

        if (this.isMounted) {
          this.setState({
            speedLimit: response.speedLimit ? response.speedLimit : 0
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

  getHaveOrder() {

    return this.state.order !== '-';
  }

  componentDidMount() {

    this.isMounted = true;

    this.updateNicehash();

    this.timerUpdate = setInterval(() => this.updateNicehash(), 10000);
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
          <Label className="label__name" text="Nicehash" />
          <div className="flexRow">
            <Label className="label__common" text="Price BTC/TH/Day" />
            <TextField input={{ value: this.state.price, onChange: this.handleChange }} type="text" id="price" placeholder="Price BTC/TH/Day" className="textField" />
          </div>
          <div className="flexRow">
            <Label className="label__common" text="Speed TH/s" />
            <TextField input={{ value: this.state.speed, onChange: this.handleChange }} type="text" id="speed" placeholder={this.state.speedLimit} className="textField" />
            <Button className="button__warning" text="Update" onClick={this.onUpdateSpeedLimitClick} disabled={this.props.isAutomationEnabled} />
            <Button className="button__primary" text="Set" onClick={this.onSetSpeedLimitClick} disabled={this.props.isAutomationEnabled} />
          </div>
          <div className="flexRow">
            <Label className="label__common" text="Sum BTC" />
            <TextField input={{ value: this.state.sumBtc, onChange: this.handleChange }} type="text" id="sumBtc" placeholder={this.state.confirmedBalance} className="textField" />
            <Button className="button__primary" text="Set" onClick={this.onSetSumBtcClick} disabled={this.props.isAutomationEnabled} />
          </div>
          <div className="selfCentered">
            <div className="flexRow">
              <Button className="button__primary" text="Create" onClick={this.onOrderCreateClick} disabled={this.getHaveOrder() || this.props.isAutomationEnabled} />
              <Button className="button__danger" text="Cancel" onClick={this.onCancelOrderClick} disabled={!this.getHaveOrder() || this.props.isAutomationEnabled} />
            </div>
          </div>
          <div className="flexRow flexRow__wrap">
            <div className="halfWidth">
              <Label className="label__common" text={`Order ${this.state.order}`} />
            </div>
            <div className="halfWidth halfWidth__column">
              <div className="flexRow">
                <Label className="label__common" text="Price BTC/TH/Day" />
                <TextField input={{ value: this.state.orderPrice, onChange: this.handleChange }} type="text" id="orderPrice" placeholder={this.state.newOrderPrice} className="textField" />
                <Button className="button__primary" text="Set" onClick={this.onSetOrderPriceClick} disabled={!this.getHaveOrder() || this.props.isAutomationEnabled} />
              </div>
              <div className="flexRow flexRow__end">
                <Button className="button__primary" text="Increase" onClick={this.onOrderIncreasePriceClick} disabled={!this.getHaveOrder() || this.props.isAutomationEnabled} />
                <Button className="button__danger" text="Decrease" onClick={this.onOrderDecreasePriceClick} disabled={!this.getHaveOrder() || this.props.isAutomationEnabled} />
              </div>
            </div>
          </div>
          <div className="flexRow flexRow__wrap">
            <div className="halfWidth">
              <Label className="label__common" text={`Type ${this.state.orderType}`} />
            </div>
            <div className="halfWidth">
              <Label className="label__common" text="Limit TH/s" />
              <TextField input={{ value: this.state.limit, onChange: this.handleChange }} type="text" id="limit" placeholder={this.state.newLimit} className="textField" />
              <Button className="button__warning" text="Change" onClick={this.onOrderChangeLimitClick} disabled={!this.getHaveOrder() || this.props.isAutomationEnabled} />
              <Button className="button__primary" text="Set" onClick={this.onSetOrderLimitClick} disabled={!this.getHaveOrder() || this.props.isAutomationEnabled} />
            </div>
          </div>
          <div className="flexRow flexRow__wrap">
            <div className="halfWidth">
              <Label className="label__common" text={`Algorithm ${this.state.orderAlgo}`} />
            </div>
            <div className="halfWidth">
              <Label className="label__common" text={`BTC available ${this.state.orderBtcAvailable}`} />
            </div>
          </div>
          <div className="flexRow flexRow__wrap">
            <div className="halfWidth">
              <Label className="label__common" text={`Pool ${this.state.orderPool}`} />
            </div>
            <div className="halfWidth">
              <Label className="label__common" text={`BTC paid ${this.state.orderBtcPaid}`} />
            </div>
          </div>
          <div className="flexRow flexRow__wrap">
            <div className="halfWidth">
              <Label className="label__common" text={`Username ${this.state.orderPoolUsername}`} />
            </div>
            <div className="halfWidth">
              <ProgressBar percent={this.state.progress} />
            </div>
          </div>
          <div className="flexRow flexRow__wrap">
            <div className="halfWidth">
              <Label className="label__common" text={`Password ${this.state.orderPoolPassword}`} />
            </div>
            <div className="halfWidth">
              <Label className="label__common" text={`Confirmed balance ${this.state.confirmedBalance} BTC`} />
            </div>
          </div>
          <div className="flexRow flexRow__wrap">
            <div className="halfWidth">
              <Label className="label__common" text={`Miners ${this.state.orderMiners}`} />
            </div>
          </div>
          <div className="flexRow flexRow__wrap">
            <Label className="label__common" text={`Speed ${this.state.orderSpeed} GH/s`} />
          </div>
          <div className="flexRow flexRow__wrap">
            <Label className="label__common" text={`Total speed ${this.getTotalStats(this.state.allOrders)}`} />
          </div>
          <ReactTable
            data={this.state.allOrders}
            columns={this.allOrdersColumns}
            defaultPageSize={10}
            pageSizeOptions={[10, 25]}
            className="-striped -highlight"
            showPaginationBottom
            noDataText="No orders"
            defaultSorted={[
              {
                id: 'price',
                desc: true
              }
            ]} />
        </div>
      </div >
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
  getNicehash: getNicehash,
  getSpeedLimit: getSpeedLimit,
  updateSpeedLimit: updateSpeedLimit,
  order: order,
  cancelOrder: cancelOrder,
  orderIncreasePrice: orderIncreasePrice,
  orderDecreasePrice: orderDecreasePrice,
  orderChangeLimit: orderChangeLimit
};

Nicehash.propTypes = {
  setMessage: PropTypes.func.isRequired,
  getNicehash: PropTypes.func.isRequired,
  getSpeedLimit: PropTypes.func.isRequired,
  updateSpeedLimit: PropTypes.func.isRequired,
  order: PropTypes.func.isRequired,
  cancelOrder: PropTypes.func.isRequired,
  orderIncreasePrice: PropTypes.func.isRequired,
  orderDecreasePrice: PropTypes.func.isRequired,
  orderChangeLimit: PropTypes.func.isRequired
};

const NicehashConnected = connect(mapStateToProps, mapDispatchToProps)(Nicehash);

export default NicehashConnected;
