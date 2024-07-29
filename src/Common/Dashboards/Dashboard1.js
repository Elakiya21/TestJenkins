import React, { Component } from "react"
import Button from "Common/Elements/Button"
import Toggle from "Common/Elements/Toggle"
import classNames from "classnames"
import Checkbox from "Common/Elements/Checkbox"
import RenderCheckbox from "Common/FormFields/RenderCheckbox"
import "./style.css"


class Dashboard extends Component {
  state = {
    val: [],
    checkval: [],
    arrayVal: '',
  }
  arrowClick = (value) => {
    const { val, checkval, arrayVal } = this.state
    const { sortData } = this.props
    let count = 0
    let dummyVal
    let uniqueVal = []
    if (value) {
      checkval.push(value)
    }
    let arr = val.concat(checkval)
    uniqueVal = Array.from(new Set(arr));
    for (let i = 0; i < arr.length; i++) {
      if (value == arr[i]) {
        count = count + 1
        dummyVal = i
      }
    }
    if (count > 1) {
      if (dummyVal !== -1) {
        arr.splice(dummyVal, 1)
      }
      for (let j = 0; j < arr.length; j++) {
        if (value == arr[j]) {
          arr.splice(j, 1)
          checkval.splice(0, checkval.length)
        }
      }
      checkval.push(...arr)
    }
    sortData({ arr })
  }


  getBodyData = (listData, len) => (
    <tr>
      {listData.values.map((data, index) => {
         const { roles, disabled } = this.props
        if (listData.type[index] === "activate") {
        return(
            <td>
          <Toggle
            checked={data == "Active" ? "true" : ""}
            onChange={listData.onclick[index]}
            disabled={disabled}
          >
          </Toggle>
        </td>
        )
        } else if (listData.newValues[0] === "employeeProfiles") {
          if (listData.type[index] === "func") {
            return (
              <td>
                <div className="employee-name" onClick={listData.onclick[index]}>
                  {data}
                </div>
              </td>
            )
          }
          else if (listData.type[index] === "check") {
            return (
              <td>
                <input id="myCheck" type="checkbox" onClick={() => this.arrowClick(listData.values[index])} multiple></input>
              </td>
            )
          }
        }
        else if (listData.type[index] === "link") {
          if (data) {
            return (
              <td>
                <div className={classNames("link")} >
                  {data && data.fileName
                    ? <a href={data.filePath} target="_blank">{data.fileName ? truncate(data.fileName, { length: 15 }) : truncate(data.fileName, { length: 15 })}</a>
                    : ""}
                </div>
              </td>
            )
          }
        }
        else if (listData.type[index] === "edit") {
          const { disabled } = this.props
          return (

            <td>
              <div className={classNames("edit", { "disable-button": disabled })} onClick={listData.onclick[index]}>
                <i className="edit"></i>{data}
              </div>
            </td>
          )
        }
        else if (listData.type[index] === "noInfo") {
          return (
            <td colSpan={len}>{data}</td>
          )
        }
        return (<td>{data}</td>)
      })}
    </tr>
  )
  getHeadData = listData => (
    <tr>
      {listData.values.map((data, index) => {
        if (listData.type[index] === "head") {
          return (<th>{data}</th>)
        }
        return null
      })}
    </tr>
  )
  render() {
    const { list } = this.props
    const body = list.slice(1)
    var len = Object.keys(list[0].newValues).length;
    return (
      <table className="table table-bordered text-center table-sm table-striped text-left lmsd mx-auto">
        <thead className="border_color  dashboard_color">
          {this.getHeadData(list[0])}
        </thead>
        <tbody className="border_color">
          {body.map(data => this.getBodyData(data, len))}
        </tbody>
      </table>
    )
  }
}

export default Dashboard
