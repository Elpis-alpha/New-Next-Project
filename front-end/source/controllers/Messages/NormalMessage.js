import { useSelector } from "react-redux"

import styled from "styled-components"

import { FaTimes } from "react-icons/fa"

import { useDispatch } from "react-redux"

import { setNormalMessageAnswer } from "../../store/slice/messagesSlice"


const NormalMessage = () => {

  const dispatch = useDispatch()

  const { show, heading, content, style } = useSelector(store => store.messages.normalMessage)

  if (!show) { return <></> }

  return (

    <NormalMessageStyle onClick={e => { if (!e.target.classList.contains('normal-message')) dispatch(setNormalMessageAnswer('done')) }}>

      <div className="normal-message" style={style}>

        <div className="heading" style={heading.style}>{heading.text}</div>

        <div className="content" style={content.style}>{content.text}</div>

        <div className="close-x" onClick={e => dispatch(setNormalMessageAnswer('done'))}><FaTimes size="1rem" color="darkred" /></div>

      </div>

    </NormalMessageStyle>

  )

}

const NormalMessageStyle = styled.div`

  @keyframes fade-in-normal-message-left{
    0%{opacity: 0;}
    100%{opacity: 1;}
  }

  @keyframes slide-in-normal-message-left{
    0%{right: 80vw;}
    100%{right: 0;}
  }

  position: fixed;
  right: 0; top: 0;
  bottom: 0; left: 0;
  z-index: 30;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 1;
  display: flex;
  animation: fade-in-normal-message-left .5s 1;

  div.normal-message{
    justify-content: center;
    text-align: center;
    background-color: #e0e0e0;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    padding: 1.5rem 2rem;
    width: 80vw;
    max-height: 70vh;
    overflow: auto;
    font-size: 1rem;
    line-height: 2rem;
    animation: slide-in-normal-message-left 1s 1 ease-out;
    background: linear-gradient(145deg, #cacaca, #f0f0f0);
    box-shadow: 10px 10px 20px #7f7f7f, -10px -10px 20px #bdbdbd;

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

export default NormalMessage
