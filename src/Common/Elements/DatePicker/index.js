import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import calenderIcon from "images/Common/icons8-calendar-24.png"
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import { DATE_FORMAT, TODAY_DATE } from './consts';

class DatePickerComponent extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  handleChange = date => {
    if (date) {
      this.props.input.onChange(moment(date).format('YYYY-MM-DD'));
    }
  };

  openDatepicker = () => this._calendar.setOpen(true);

  resetDatePicker = () =>  {
    this.props.input.onChange('');
  }

  render() {
    const {
      input: { name },
      label,
      required,
      applyLabel = true,
      meta: { touched, error, warning },
    } = this.props;
    let value = '';
    if (this.props.input.value) {
      value = moment(this.props.input.value);
    }
    return (
      <div className="col-sm">
        <div className="d-block">
          {applyLabel && (
            <label htmlFor={name} className="control-label">
              {label}
              {required &&
                <span className="text-danger">*</span>
              }
            </label>
          )}
        </div>
        <div className="d-inline-flex">
          <DatePicker
            dateFormat={DATE_FORMAT}
            minDate={TODAY_DATE}
            selected={value}
            className={value ? `date-with-cancel` : `date-no-cancel`}
            placeholderText="Click to select date"
            onChange={this.handleChange}
            monthsShown={1}
            required
            showMonthDropdown
            showYearDropdown
            popperClassName="react-datepicker__tether-element
              react-datepicker__tether-abutted
              react-datepicker__tether-abutted-left
              react-datepicker__tether-element-attached-left
              react-datepicker__tether-target-attached-left
              react-datepicker__tether-element-attached-top
              react-datepicker__tether-target-attached-bottom
              react-datepicker__tether-enabled"
              ref={(c) => this._calendar = c}
          />
          {value &&
            <div className="cancel" onClick={this.resetDatePicker}>
              <i className="gm gm-cancel" />
            </div>
          }
          <img  className="calender-icon" height={25} src={calenderIcon} onClick={this.openDatepicker} />
        </div>
        {touched &&
          ((error && (
            <div className="invalid-feedback d-block">{error}</div>
          )) ||
            (warning && (
              <div className="invalid-feedback d-block">{warning}</div>
        )))}
      </div>
    );
  }
}

export default DatePickerComponent;
