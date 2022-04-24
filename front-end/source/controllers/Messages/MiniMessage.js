import styled from "styled-components"

import { BiCheckShield } from "react-icons/bi"

import { FaCopy, FaSave, FaTimes } from "react-icons/fa"

import { useSelector } from "react-redux"

import { Oval } from "react-loader-spinner"


const MiniMessage = () => {

  const { show, icon, content, style } = useSelector(store => store.messages.miniMessage)

  const iconObject = {

    'ok': <BiCheckShield size="1.2rem" />,

    'copy': <FaCopy size="1.2rem" />,

    'save': <FaSave size="1.2rem" />,

    'times': <FaTimes size="1.2rem" />,

    'loading': <Oval width="1.2rem" height="1.2rem" color="white" secondaryColor="white" />,

  }

  if (!show) { return <></> }

  return (

    <MiniMessageStyle>

      <div className="mini-message" style={style}>

        <div className="mini-icon" style={icon.style}>{iconObject[icon.name]}</div>

        <div className="mini-divider"></div>

        <div className="mini-text" style={content.style}>{content.text}</div>

      </div>

    </MiniMessageStyle>

  )

}

const MiniMessageStyle = styled.div`

  @keyframes slide-mini-message-up{
    0%{bottom: -3rem;}
    100%{bottom: 1rem;}
  }

  position: fixed;
  right: 0;
  left: 0; 
  bottom: 1rem;
  z-index: 50;
  margin: 1rem auto;
  display: none;
  align-items: center;
  justify-content: center;

  display: flex;
  animation: slide-mini-message-up .5s 1;

  div.mini-message{
    background-color: rgb(53, 53, 53);
    color: white;
    fill: white;
    display: flex;
    border-radius: .5rem;

    .mini-divider{
      align-self: stretch;
      width: 1px;
      background-color: #878787;
    }

    .mini-text{
      padding: 1rem;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 50vw;
    }

    .mini-icon{
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

`

export default MiniMessage
