import React, { Component } from "react"
import Button from "Common/Elements/Button"

class Dashboard extends Component {
  getBodyData = listData => (
    <tr>
      {listData.values.map((data, index) => {
        if (listData.type[index] === "activate") {
          return <td><Button onClick={listData.onclick[index]}>{data}</Button></td>
        } else if (listData.type[index] === "Edit") {
          return (
            <td>
              <div className="edit" onClick={listData.onclick[index]}>
                <Button>
                  <strong>{data}</strong>
                </Button>
              </div>
            </td>
          )
        } else if (listData.type[index] === "link") {
          return (
            <td>{data}</td>
            // <td><a href={data} target="_blank">{data}</a></td>
          )
        } else if (listData.type[index] === "View") {
          return (
            <td>
              <div className="view" onClick={listData.onclick[index]}>
                <Button>
                  <strong>{data}</strong>
                </Button>
              </div>
            </td>
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
    return (
      <table className="table table-bordered text-center table-sm table-striped">
        <thead>
          {this.getHeadData(list[0])}
        </thead>
        <tbody>
          {body.map(data => this.getBodyData(data))}
        </tbody>
      </table>
    )
  }
}

export default Dashboard
