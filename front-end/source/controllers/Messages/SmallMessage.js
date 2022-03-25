import { useSelector } from "react-redux"

import styled from "styled-components"

import { FaTimes } from "react-icons/fa"

import { removeSmallMessage } from "../MessageCtrl"


const SmallMessage = () => {

  const { show, heading, content, style } = useSelector(store => store.messages.smallMessage)

  if (!show) { return <></> }

  return (

    <SmallMessageStyle>

      <div className="small-message" style={style}>

        <div className="heading" style={heading.style}>{heading.text}</div>

        <div className="content" style={content.style}>{content.text}</div>

        <div className="close-x" onClick={e => removeSmallMessage()}><FaTimes size="1rem" color="darkred" /></div>

      </div>

    </SmallMessageStyle>

  )

}

const SmallMessageStyle = styled.div`
  
  @keyframes slide-small-message-left{
    0%{top: 0vh; opacity: 0;}
    100%{top: 10vh; opacity: 1;}
  }

  position: fixed;
  top: 10vh; left: 15vw;
  z-index: 50;
  align-items: center;
  justify-content: center;
  display: flex;
  animation: slide-small-message-left .5s 1 ease-in-out;

  div.small-message{
    min-height: 6rem;
    align-items: center;
    justify-content: center;
    width: 70vw;
    display: flex;
    border-radius: 1rem;
    padding: 1rem;
    background: linear-gradient(145deg, #cacaca, #f0f0f0);
    text-align: center;
    /* background: #e0e0e0; */
    box-shadow: 10px 10px 20px #797979, -10px -10px 20px #fff;
    font-size: 1rem;
    line-height: 2rem;
    flex-direction: column;

    .heading{
      font-size: 1.5rem;
      font-weight: bold;
    }

    .close-x{
      position: absolute;
      top: .7rem; right: .7rem;
      cursor: pointer;
    }
  }

`

export default SmallMessage
