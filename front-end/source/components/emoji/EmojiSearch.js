import { useState } from "react"

import styled from "styled-components"

import emojiSearchJSON from "./emoji-search-min.json"


const EmojiBox = ({ theEmoji }) => {

  const [filteredEmojis, setFilteredEmojis] = useState(emojiSearchJSON)

  const filterEmoji = e => {

    const text = e.target.value.trim().toLowerCase()

    setFilteredEmojis(emojiSearchJSON.filter(item => item.name.includes(text)))

  }

  return (

    <EmojiBoxStyle>

      <div className="emoji-bar">

        <input type="text" placeholder="Search for an emoji..." onInput={filterEmoji} />

      </div>

      <div className="emoji-icons">

        {filteredEmojis.map(emoji => <div key={emoji.name} onClick={e => theEmoji(e.target.innerText)} className="emoji-icon">{emoji.emoji}</div>)}

        {filteredEmojis.length === 0 && <div className="nil">Emoji not found</div>}

      </div>

    </EmojiBoxStyle>

  )

}

const EmojiBoxStyle = styled.div`

  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  width: 100%;
  background-color: #f4f4f4;

  .emoji-bar{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-bottom: 1px solid #d0d0d0;

    input{
      width: 100%;
      border: 0 none;
      outline: 0 none;
      background-color: transparent;
      padding: 0.5rem;
      font-size: 1rem;
      text-align: center;
    }

  }

  .emoji-icons{
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    flex-wrap: wrap;
    height: ${5 * 3}rem;
    overflow: auto;

    .emoji-icon{
      font-size: 1rem;
      width: 2.95rem;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: background-color .5s, color .5s;

      &:hover{
        background-color: rgba(0, 0, 0, .2);
      }
    }

  }

  .nil{
    width: 100%;
    font-size: 2rem;
    line-height: 5rem;
    text-align: center;
  }
`

export default EmojiBox
