import styled from "styled-components"

import { useDispatch } from "react-redux"

import { setXMessageAnswer } from "../../store/slice/messagesSlice"



const XButton = ({ text, styleX, waitFor }) => {

  const dispatch = useDispatch()

  return (

    <ButtonStyle style={styleX} onClick={e => dispatch(setXMessageAnswer(waitFor))}><span>{text}</span></ButtonStyle>

  )

}

const ButtonStyle = styled.button`

  cursor: pointer;
  background-color: #4472c1;
  border: 0 none; outline: 0 none;
  padding: .1rem 1rem;
  border-radius: .5rem;
  margin: .2rem;
  overflow: hidden;
  color: white;
  /* transition: all .5s; */

  span{
    display: inline-block;
    transition: 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  span:after {
    content: "\\00bb";
    position: absolute;
    opacity: 0;
    top: 0; bottom: 0;
    height: 100%;
    font-size: 1.5rem;
    line-height: 2rem;
    right: -1rem;
    transition: 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover span {
    padding-right: 1rem;
  }

  &:hover span:after {
    opacity: 1;
    right: 0;
  }

`

export default XButton
