import React from 'react'
import "./EnsuringPopup.css"
import Modal from 'react-modal'

export default function EnsuringPopup() {
  return (
    <div className='ensuringPopupContainer'>
        <div className='ensuringPopup'>
            <div className='ensuringPopup_text'></div>
            <div className="ensuringPopup_buttons">
                <button>Cancel</button>
                <button>Continue</button>
            </div>
        </div>
    </div>
  )
}
