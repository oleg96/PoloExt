import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AutomationEvents.scss';
import Label from '../Label/Label.js';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '../Button/Button.js';

class AutomationEvents extends Component {

  isMounted = false;

  constructor(props) {
    super(props);

    this.eventColumns = [
      {
        columns: [
          {
            Header: 'Success',
            accessor: 'success',
            id: 'successCriteria',
            Cell: props => <span>{props.value ? 'Yes' : 'No'}</span>,
            width: 160
          },
          {
            Header: 'Message',
            accessor: 'message',
            width: 280
          },
          {
            Header: 'Time',
            accessor: 'timestamp',
            Cell: props => <span>{props.value ? (new Date(props.value)).toString() : ''}</span>,
            width: 290
          },
          {
            Header: 'Price',
            accessor: 'price',
            width: 75
          },
          {
            Header: 'Profitability',
            accessor: 'profitability',
            width: 125
          },
          {
            Header: 'Sum',
            accessor: 'sum',
            width: 125
          }
        ]
      }
    ];
  }

  render() {

    if (this.props.isShown) {
      return (
        <div className="automationEvents">
          <div className="block block__no-padding automationEvents__content">
            <div className="flexRow space-between">
              <Label className="label__name" text="Automation events" />
              <Button className="button__primary" text="" onClick={this.props.clickHandler} iconName="clear" />
            </div>
            <ReactTable
              data={this.props.events}
              columns={this.eventColumns}
              defaultPageSize={10}
              pageSizeOptions={[5, 10]}
              className="-striped -highlight"
              showPaginationBottom
              noDataText="No events"
              defaultSorted={[
                {
                  id: 'timestamp',
                  desc: true
                }
              ]} />
          </div>
        </div>
      );
    } else {
      return <div className="invisible"></div>;
    }
  }
}

AutomationEvents.propTypes = {
  events: PropTypes.array.isRequired
};

export default AutomationEvents;
