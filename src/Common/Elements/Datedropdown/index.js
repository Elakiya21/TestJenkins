import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';

class DateDropDown extends Component {
  constructor(props) {
    super(props);
    const initialValue = props.initialValue || '';
    const initialDate = initialValue ? new Date(props.initialValue) : '';
    let dayValue = null;
    let monthValue = null;
    let yearValue = null;
    if (initialDate) {
      monthValue = initialDate.getMonth();
      dayValue = initialDate.getDate();
      yearValue = initialDate.getFullYear();
    }
    this.state = {
      year: yearValue,
      month: monthValue,
      day: dayValue,
      initialValue,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const initialValue = props.initialValue || '';
    const initialDate = initialValue ? new Date(props.initialValue) : '';
    let dayValue = '';
    let monthValue = '';
    let yearValue = '';
    if (initialDate) {
      monthValue = initialDate.getMonth();
      dayValue = initialDate.getDate();
      yearValue = initialDate.getFullYear();
    }
    if (initialValue !== state.initialValue) {
      return {
        day: dayValue,
        month: monthValue,
        year: yearValue,
        initialValue,
      };
    }
    return null;
  }

  handleChange = () => {
    if (
      this.state.year &&
      (this.state.month || this.state.month === 0) &&
      this.state.day
    ) {
      let { month, day } = this.state;
      month = `${parseInt(month, 10) + 1}`;
      if (month.length < 2) {
        month = `0${month}`;
      }
      if (day.length < 2) {
        day = `0${day}`;
      }
      const date = [this.state.year, month, day].join('-');
      this.props.input.onChange(date);
      this.props.input.onBlur();
    } else {
      this.props.input.onChange(null);
    }
  };

  render() {
    const {
      input: { name },
      label,
      required,
      applyLabel = true,
      meta: { touched, error, warning },
      startYear,
      endYear,
      reverseYearOrder = true,
    } = this.props;
    let yearStartValue = startYear;
    let yearEndValue = endYear;
    if (!yearEndValue) {
      const date = new Date();
      yearEndValue = parseInt(date.getFullYear(), 10);
    }
    if (!yearStartValue) {
      yearStartValue = parseInt(yearEndValue, 10) - 100;
    }
    return (
      <div className="col">
        <div className={`form-group${required ? ' required' : ''}`}>
          {applyLabel && (
            <label htmlFor={name} className="control-label">
              {label}
            </label>
          )}
          <div className="row">
            <div className="col-md-4">
              <YearPicker
                defaultValue="Year"
                start={yearStartValue}
                end={yearEndValue}
                reverse={reverseYearOrder}
                value={this.state.year}
                onChange={year => {
                  this.setState({ year, month: '', day: '' }, () => {
                    this.handleChange();
                  });
                }}
                id="year"
                name="year"
                classes="form-control"
              />
            </div>
            <div className="col-md-4">
              <MonthPicker
                defaultValue="Month"
                short
                endYearGiven
                year={this.state.year}
                value={this.state.month}
                onChange={month => {
                  this.setState({ month, day: '' }, () => {
                    this.handleChange();
                  });
                }}
                id="month"
                name="month"
                classes="form-control"
              />
            </div>
            <div className="col-md-4">
              <DayPicker
                defaultValue="Day"
                endYearGiven
                year={this.state.year}
                month={this.state.month}
                value={this.state.day}
                onChange={day => {
                  this.setState({ day }, () => {
                    this.handleChange();
                  });
                }}
                id="day"
                name="day"
                classes="form-control"
              />
            </div>
          </div>
          {touched &&
            ((error && (
              <div className="invalid-feedback d-block">{error}</div>
            )) ||
              (warning && (
                <div className="invalid-feedback d-block">{warning}</div>
              )))}
        </div>
      </div>
    );
  }
}
DateDropDown.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  applyLabel: PropTypes.bool,
  reverseYearOrder: PropTypes.bool,
  startYear: PropTypes.number,
  endYear: PropTypes.number,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string,
  }),
  initialValue: PropTypes.string,
};
export default DateDropDown;
