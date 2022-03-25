import { useState } from "react"

import { MdEmojiEmotions, MdEmojiFlags, MdEmojiSymbols, MdEmojiPeople, MdEmojiNature, MdLocalActivity, MdEmojiObjects, MdEmojiFoodBeverage, MdEmojiTransportation } from "react-icons/md"

import styled from "styled-components"


const EmojiBox = ({ theEmoji, emojiJSON }) => {

  const [emojiIndex, setEmojiIndex] = useState(0)

  return (

    <EmojiBoxStyle>

      <div className="emoji-bar">

        {emojiJSON.map((emojiHead, index) => <div key={emojiHead.key} onClick={() => setEmojiIndex(index)} className="emoji-bar-item">{findIcon(emojiHead.key)}</div>)}

        <div className="emoji-under" style={{ left: `${emojiIndex * 3}rem` }}></div>

      </div>

      <div className="emoji-icons">

        {emojiJSON[emojiIndex].emoji.map(emoji => <div key={emoji.name} onClick={e => theEmoji(e.target.innerText)} className="emoji-icon">{emoji.emoji}</div>)}

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

    .emoji-bar-item{
      width: 3rem;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: background-color .5s, color .5s;

      &:hover{
        background-color: rgba(0, 0, 0, .2);
      }

      &.active{
        background-color: rgba(0, 0, 0, .4);
        color: white;
      }
    }

    .emoji-under{
      position: absolute;
      height: .2rem;
      width: 3rem;
      padding: 0 .25rem;
      background-color: #1b1b7f;
      border-radius: .1rem;
      bottom: 0;
      left: 0;
      transition: left .5s;
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
`

const findIcon = key => {

  const iconSize = "1.2rem"

  switch (key) {

    case 'smileys-&-emotion': return <MdEmojiEmotions size={iconSize} />

    case 'people-&-body': return <MdEmojiPeople size={iconSize} />

    case 'animals-&-nature': return <MdEmojiNature size={iconSize} />

    case 'food-&-drink': return <MdEmojiFoodBeverage size={iconSize} />

    case 'travel-&-places': return <MdEmojiTransportation size={iconSize} />

    case 'activities': return <MdLocalActivity size={iconSize} />

    case 'symbols': return <MdEmojiSymbols size={iconSize} />

    case 'objects': return <MdEmojiObjects size={iconSize} />

    case 'flags': return <MdEmojiFlags size={iconSize} />

    default: return <MdEmojiEmotions size={iconSize} />

  }

}

export default EmojiBox
