import React, { Component } from "react";
import "./index.css";
import ReactTooltip from "react-tooltip"
import { get, startCase, truncate } from "lodash";
const Completed = "Complete"
const Failed = 2

const Info = ({ description }) => (
  <span>
    <i className="gm gm-info ps-1" data-tip={`${description}`} />
    <ReactTooltip place="top" class="tooltip" />
  </span>
)
class StatusTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.name,
      name: props.name,
    };
  }

  render() {
    const { disabled, status, name, list, ...props } = this.props;
    const inputProps = {
      ...props,
    };
    const data = {
      name: "KYC Completed",
    }
    // list.push(newDocument);
    return (

      <div className="container mt-4">
        <div className="stepper-wrapper">
          {list.map((step, index) => (
            <div className={`stepper-item ${get(step, status) == "Complete" ? `completed` : ""}`}>
              <div className="step-counter"></div>
              <span className="step-name" title={startCase(get(step, name))} >{truncate(get(step, name), { length: 10 })}{get(step, name) && get(step, name).length > 10 && <Info description={get(step, name)} />}</span>
            </div>
          ))}
          {/* <div className={`stepper-item ${disabled == false ? "completed" : ""}`}>
            <div className="step-counter"></div>
            <span className="step-name" title={startCase(data.name)} >{truncate(data.name, { length: 10 })}
              {data.name && data.name.length > 10 && <Info description={data.name} />}</span>
          </div> */}
        </div>
      </div>
    );
  }
}

export default StatusTracker;
