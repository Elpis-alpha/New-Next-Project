import styled from "styled-components"

import { useEffect, useState } from 'react'

import EmojiBox from './EmojiBox'

import EmojiSearch from './EmojiSearch'

import emojiJSON from "./emoji-min.json"


const Emoji = ({ theEmoji }) => {

  const val = ["Search Mode", "Tab Mode"]

  const [viewText, setViewText] = useState(val[0])

  const toggleMode = () => {

    if (viewText === val[0]) setViewText(val[1])

    else if (viewText === val[1]) setViewText(val[0])

  }

  return (

    <EmojiStyle>

      {viewText === "Search Mode" ? <EmojiBox theEmoji={theEmoji} emojiJSON={emojiJSON} /> : <EmojiSearch theEmoji={theEmoji} />}

      <div className="name-tx" onClick={toggleMode}>{viewText}</div>

    </EmojiStyle>

  )
}

const EmojiStyle = styled.div`

  background-color: white;
  box-shadow: 0 0 3px 1px grey;
  border-radius: 0.5rem;
  overflow: hidden;
  width: ${emojiJSON.length * 3}rem;
  background-color: #f4f4f4;

  .name-tx{
    border-top: 1px solid #d0d0d0;
    text-align: center;
    background-color: rgba(0,0,0,.1);
    cursor: pointer;
    transition: background-color .5s, color .5s;
    
    &:hover{
      background-color: rgba(0,0,0,.3);
      color: white;
    }
  }

`

export default Emoji