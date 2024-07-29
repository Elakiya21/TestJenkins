import React, { Component } from "react"

import { pagination } from "consts"
import Container from "../Components"

class Pagination extends Component {
  handleClick = (page, firstPage, lastPage) => {
    const { getData, setFirstPage, setLastPage,id } = this.props
    if (firstPage) {
      setFirstPage(firstPage)
    }
    if (lastPage) {
      setLastPage(lastPage)
    }
    getData({ page, id })
  }
  pageNumber = (number, prevPage, nextPage) => {
    const { currentPage, totalPages } = this.props
    const { firstPage, lastPage } = this.props.pagination
    if (number === pagination.prev) {
      if (currentPage > 1) {
        const first = firstPage - 1
        const last = lastPage - 1
        if (totalPages > pagination.displayPage) {
          return (<li key={number} className="page-item">
            <a onClick={() => this.handleClick(prevPage, first, last)} className="page-link">{number}</a>
          </li>)
        }
      }
      return (<li key={number} className="page-item disabled">
        <a className="page-link">{number}</a>
      </li>)
    } else if (number === pagination.next) {
      if (currentPage !== totalPages && lastPage < totalPages) {
        const first = Number(firstPage) + 1
        const last = lastPage + 1
        if (totalPages > 10) {
          return (<li key={number} className="page-item">
            <a onClick={() => this.handleClick(nextPage, first, last)} className="page-link">{number}</a>
          </li>)
        }
      }
      return (<li key={number} className="page-item disabled">
        <a className="page-link">{number}</a>
      </li>)
    } else if (number === currentPage) {
      return (<li key={number} className="page-item active">
        <a onClick={() => this.handleClick(number)} className="page-link">{number}</a>
      </li>)
    }
    return (<li key={number} className="page-item">
      <a onClick={() => this.handleClick(number)} className="page-link">{number}</a>
    </li>)
  }
  render() {
    const { totalPages, currentPage, setFirstPage, setLastPage } = this.props
    const { firstPage, lastPage } = this.props.pagination
    const pageNumbers = []
    pageNumbers.push(pagination.prev)
    if (totalPages < pagination.displayPage && totalPages !== lastPage) {
      setFirstPage(1)
      setLastPage(totalPages)
    }
    if(totalPages > pagination.displayPage && lastPage < pagination.displayPage )
    {
      setLastPage(pagination.displayPage)
    }
    for (let i = firstPage; i <= lastPage; i += 1) {
      pageNumbers.push(i)
    }
    pageNumbers.push(pagination.next)
    let prevPage = 0
    let nextPage = 0
    if (currentPage !== 1) {
      prevPage = currentPage - 1
    }
    if (currentPage !== totalPages) {
      nextPage = currentPage + 1
    }
    if (totalPages > 1) {
      return (
        <nav className="pg-wrap">
          <ul className="pagination justify-content-center">
            {pageNumbers.map(number => (
              this.pageNumber(number, prevPage, nextPage)
            ))}
          </ul>
        </nav>
      )
    }
    return null
  }

}

export default Container(Pagination)
