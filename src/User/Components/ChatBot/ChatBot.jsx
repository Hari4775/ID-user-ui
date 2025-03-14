import React from 'react'
import "./ChatBot.css"
import { wa } from '../../../assets/Index'
import { phoneIcon } from '../../../assets/icons/IconIndex'

const ChatBot = () => {
  return (
    <div className="whatsapp-logo ">
    <a  href="tel:9344963795">
      <img className="mb-2" src={phoneIcon} alt="Phone Icon" />
    </a>
    <a     href="https://api.whatsapp.com/message/4QD4M525ED3PN1?autoload=1&app_absent=0" style={{ marginTop: '20px' }}>
      <img src={wa} className="" alt="WhatsApp Icon" />
    </a>
  </div>
  
  )
}

export default ChatBot
