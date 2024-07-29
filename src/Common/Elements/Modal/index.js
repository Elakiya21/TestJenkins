import React, { Component } from "react"
import Button from "Common/Elements/Button"

import "./modal.css"

class Modal extends Component {
  state = {}
  render() {
    const {
      headerContent,
      primaryBtnContent,
      primaryBtnAction,
      secondaryBtnAction,
      secondaryBtnContent,
      className,
      headerClassName,
      closeBtnAction,
    } = this.props
    return (
      <div className="modal" tabIndex="-1" role="dialog" aria-hidden="false">
        <div className={`${className} modal-dialog`} role="document" >
          <div className="modal-content">
            <div className={`${headerClassName} ${headerContent ? "modal-header" : ""} `}>
              <h5 className="modal-title w-100 text-center">{headerContent}</h5>
              {closeBtnAction &&
             <button type="button" class="close" onClick={closeBtnAction} aria-label="Close">
             <span aria-hidden="true">&times;</span>
             </button>     
             }
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
            <div className={`${headerContent ? "modal-footer" : "" }`}>
              {secondaryBtnContent &&
                <Button type="button" className="btn" secondary onClick={secondaryBtnAction}>{secondaryBtnContent}</Button>
              }
              {primaryBtnContent &&
                <Button type="button" className="btn" primary onClick={primaryBtnAction}>{primaryBtnContent}</Button>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
