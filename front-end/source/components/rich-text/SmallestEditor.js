import EditorPlaceholder from "@tiptap/extension-placeholder"

import StarterKit from "@tiptap/starter-kit"

import styled from "styled-components"

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react"

import TextStyle from "@tiptap/extension-text-style"

import EditorLink from "@tiptap/extension-link"

import EditorImage from "@tiptap/extension-image"

import { FaBold, FaItalic, FaUnderline, FaCode } from "react-icons/fa"

import { BsBlockquoteLeft, BsListOl, BsListUl, BsLink45Deg, BsImageFill } from "react-icons/bs"

import { AiOutlineFontColors, AiOutlineBgColors, AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai"

import { HiOutlineEmojiHappy } from "react-icons/hi"

import { FontSize, WorkClass, TextColor, FontFamily, BgColor, LineHeight, Underline } from "./customExtensions"

import Emoji from "../emoji/Emoji"

import { useState } from "react"

import LinkQuery from "./LinkQuery"

import ImageQuery from "./ImageQuery"


const FullEditor = ({ editorState, setEditorState }) => {

  const [showEmoji, setShowEmoji] = useState(false)

  const [showFontFamilies, setShowFontFamilies] = useState(false)

  const [showLinkQ, setShowLinkQ] = useState(false)

  const [showImageQ, setShowImageQ] = useState(false)

  const [showLineHeights, setShowLineHeights] = useState(false)

  const listOfFonts = [

    { name: "Default Font", text: "" },

    { name: "Serif Font", text: "serif" },

    { name: "Cursive Font", text: "cursive" },

    { name: "Sans Serif", text: "sans-serif" },

    { name: "Monospace", text: "monospace" },

    { name: "Fantasy", text: "fantasy" },

    { name: "Times New Roman", text: "'Times New Roman', Times, serif" },

    { name: "Arial", text: "Arial, Helvetica, sans-serif" },

    { name: "Cambria", text: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif" },

    { name: "Impact", text: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif" },

    { name: "Verdana", text: "Verdana, Geneva, Tahoma, sans-serif" },

    { name: "Courier New", text: "'Courier New', Courier, monospace" },

  ]

  const editor = useEditor({

    extensions: [

      StarterKit, TextStyle, FontSize,

      WorkClass, TextColor, FontFamily,

      LineHeight, EditorImage.configure({ allowBase64: true, }),

      EditorLink.configure({ openOnClick: false }),

      Underline, EditorPlaceholder.configure({ placeholder })

    ],

    content: editorState,

    autofocus: true,

    onUpdate: ({ editor }) => setEditorState(editor.getHTML())

  })

  const chainX = command => {

    if (!editor) { return null }

    const incrementList = [
      '0.2rem', '0.4rem', '0.6rem', '0.8rem', '1.0rem',
      '1.2rem', '1.4rem', '1.6rem', '1.8rem', '2.0rem',
      '2.2rem', '2.4rem', '2.6rem', '2.8rem', '3.0rem',
      '3.2rem', '3.4rem', '3.6rem', '3.8rem', '4.0rem',
      '4.2rem', '4.4rem', '4.6rem', '4.8rem', '5.0rem',
      '5.2rem', '5.4rem', '5.6rem', '5.8rem', '6.0rem',
    ]

    switch (command) {

      case "font": return setShowFontFamilies(!showFontFamilies)

      case "line-height": return setShowLineHeights(!showLineHeights)

      case "bold": return editor.chain().focus().toggleBold().run()

      case "italic": return editor.chain().focus().toggleItalic().run()

      case "code": return editor.chain().focus().toggleCode().run()

      case "underline": return editor.chain().focus().toggleUnderline().run()

      case "blockquote": return editor.chain().focus().toggleBlockquote().run()

      case "o-list": return editor.chain().focus().toggleOrderedList().run()

      case "u-list": return editor.chain().focus().toggleBulletList().run()

      case "emoji": setShowEmoji(!showEmoji); return editor.chain().focus().run()

      case "link-x": setShowLinkQ(!showLinkQ); return editor.chain().focus().run()

      case "image-x": setShowImageQ(!showImageQ); return editor.chain().focus().run()

      case "h+":

        let newSize = editor.getAttributes('textStyle').fontSize

        newSize = typeof newSize !== 'string' ? "0.8rem" : newSize

        newSize = incrementList.findIndex(x => x === newSize) + 1

        newSize = newSize >= incrementList.length ? incrementList[newSize - 1] : incrementList[newSize]

        const newLineHeight = parseFloat(newSize) * 2 + 'rem'

        return editor.chain().focus().setFontSize(newSize).setLineHeight(newLineHeight).run()

        break;

      case "h-":

        let newSizeX = editor.getAttributes('textStyle').fontSize

        newSizeX = typeof newSizeX !== 'string' ? "0.8rem" : newSizeX

        newSizeX = incrementList.findIndex(x => x === newSizeX) - 1

        newSizeX = newSizeX < 0 ? incrementList[newSizeX + 1] : incrementList[newSizeX]

        const newLineHeightX = parseFloat(newSizeX) * 2 + 'rem'

        return editor.chain().focus().setFontSize(newSizeX).setLineHeight(newLineHeightX).run()

        break;

      default: return editor.chain().focus().run()

    }

  }

  const activeClass = (test) => {

    if (!editor) { return null }

    switch (test) {

      case 'emoji': return showEmoji ? 'is-active' : 'inactive'

      case 'font': return showFontFamilies ? 'is-active' : 'inactive'

      case 'link': return showLinkQ ? 'is-active' : 'inactive'

      case 'image': return showImageQ ? 'is-active' : 'inactive'

      case 'line': return showLineHeights ? 'is-active' : 'inactive'

      default: return editor.isActive(test) ? 'is-active' : 'inactive'

    }

  }

  const removeEmoji = e => {

    try {

      if (e.target.classList.contains('emoji-hol')) { setShowEmoji(false) }

      if (e.target.classList.contains('emoji-hol')) { setShowLinkQ(false) }

      if (e.target.classList.contains('emoji-hol')) { setShowImageQ(false) }

    } catch (e) {

      // do nothing

    }

  }

  const findFont = font => {

    let fon = listOfFonts.find(item => item.text === font)

    return fon === undefined ? 'Default Font' : fon.name

  }

  const findColor = color => color === undefined ? 'transparent' : color;

  const changeFont = font => editor.chain().focus().setFontFamily(font.text).run()

  const changeColor = color => editor.chain().focus().setTextColor(color).run()

  const addImage = base64 => editor.commands.setImage({ src: base64, alt: 'inserted image' })

  const setLinkStuff = (text, address) => {

    return editor.chain().focus().extendMarkRange('link').setLink({

      href: address,

      target: '_blank'

    }).command(({ tr }) => {

      tr.insertText(text)

      return true

    }).run()

  }

  if (!editor) { return null }

  return (

    <EditorStyle>

      <div className="editor-icons">

        <div className="editor-icons-row">

          <div onClick={() => chainX('font')} className={"editor-norm-icon with-arrow fmt " + activeClass('font')}>

            <div className="xmt">{findFont(editor.getAttributes('textStyle').fontFamily)}</div>

            <AiOutlineCaretDown size=".9rem" style={{ paddingLeft: ".25rem" }} />

            {showFontFamilies && <div className="overflow-list">

              {listOfFonts.map(font => <li key={font.name} onClick={() => changeFont(font)} >{font.name}</li>)}

            </div>}

          </div>

          <div onClick={() => chainX('h+')} className="editor-norm-icon with-arrow">

            <div>A</div>

            <AiOutlineCaretUp size=".9rem" style={{ paddingLeft: ".1rem" }} />

          </div>

          <div onClick={() => chainX('h-')} className="editor-norm-icon with-arrow">

            <div>A</div>

            <AiOutlineCaretDown size=".9rem" style={{ paddingLeft: ".1rem" }} />

          </div>

          <div onClick={() => chainX('emoji')} className={"editor-norm-icon " + activeClass('emoji')}><HiOutlineEmojiHappy size="1rem" /></div>

          <div className="editor-norm-icon">

            <AiOutlineFontColors size=".8rem" />

            <div className="absol-me" style={{ backgroundColor: `${findColor(editor.getAttributes('textStyle').textColor)}` }}>

              <input type="color" onInput={e => changeColor(e.currentTarget.value)} />

            </div>

          </div>

          <div onClick={() => chainX('link-x')} className={"editor-norm-icon " + activeClass('link')}><BsLink45Deg size="1rem" /></div>

          <div onClick={() => chainX('blockquote')} className={"editor-norm-icon " + activeClass('blockquote')}><BsBlockquoteLeft size="1rem" /></div>

          <div onClick={() => chainX('o-list')} className={"editor-norm-icon " + activeClass('orderedList')}><BsListOl size="1rem" /></div>

          <div onClick={() => chainX('u-list')} className={"editor-norm-icon " + activeClass('bulletList')}><BsListUl size="1rem" /></div>

          <div onClick={() => chainX('image-x')} className={"editor-norm-icon " + activeClass('image')}><BsImageFill size="1rem" /></div>

        </div>

        <div className="overflow-items">

          {showEmoji && <div className="emoji-hol" onClick={removeEmoji}>

            <Emoji theEmoji={em => { editor.commands.insertContent(em); setShowEmoji(false); editor.chain().focus() }} />

          </div>}

          {showLinkQ && <div className="emoji-hol" onClick={removeEmoji}>

            <LinkQuery theLink={(linkText, address) => { setLinkStuff(linkText, address); setShowLinkQ(false); editor.chain().focus() }} />

          </div>}

          {showImageQ && <div className="emoji-hol" onClick={removeEmoji}>

            <ImageQuery theImage={base64 => { addImage(base64); setShowImageQ(false); editor.chain().focus() }} />

          </div>}

        </div>

      </div>

      <div className="editor-holder">

        {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 500 }}>

          <div className="select-text">

            <div onClick={() => chainX('h+')} className="editor-sel-icon with-arrow">

              <div>A</div>

              <AiOutlineCaretUp size=".9rem" style={{ paddingLeft: ".1rem" }} />

            </div>

            <div onClick={() => chainX('h-')} className="editor-sel-icon with-arrow">

              <div>A</div>

              <AiOutlineCaretDown size=".9rem" style={{ paddingLeft: ".1rem" }} />

            </div>

            <div onClick={() => chainX('bold')} className={"editor-sel-icon " + activeClass('bold')}><FaBold size=".8rem" /></div>

            <div onClick={() => chainX('italic')} className={"editor-sel-icon " + activeClass('italic')}><FaItalic size=".8rem" /></div>

            <div onClick={() => chainX('underline')} className={"editor-sel-icon " + activeClass({ underline: 'underline' })}><FaUnderline size=".8rem" /></div>

            <div onClick={() => chainX('code')} className={"editor-sel-icon " + activeClass('code')}><FaCode size=".8rem" /></div>

          </div>

        </BubbleMenu>}

        <EditorContent editor={editor} />

      </div>


    </EditorStyle>

  )

}

const EditorStyle = styled.div`

  box-shadow: 0 0 2px;
  border-collapse: collapse;
  width: 100%;

  .editor-icons{
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    padding: .8rem .5rem;
    /* box-shadow: 0 0 2px; */
    
    .editor-icons-row{
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-wrap: wrap;
      width: 100%;
      padding: 0;
    }
    
    .editor-norm-icon{
      width: 1.8rem;
      height: 1.8rem;
      line-height: 1rem;
      font-size: 1rem;
      color: black;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.1rem;
      margin: .25rem .3rem;
      cursor: pointer;
      box-shadow: 0 0 1px 0 black;
      background-color: transparent;
      transition: background-color .5s;
      z-index: 5;
      
      &.with-arrow{
        width: auto;
        padding: 0 .4rem;
        z-index: 10;
      }
      
      &.fmt{
        z-index: 15;
        .xmt{
          max-width: 10rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      &:hover{
        background-color: rgba(0, 0, 0, .2);
      }

      &.is-active{
        background-color: rgba(0, 0, 0, .3);
      }

      .overflow-list{
        position: absolute;
        top: 105%; left: 0;
        width: 100%;
        border-radius: .2rem;
        background-color: #c0c0c0;
        max-height: 7rem;
        overflow: auto;

        li{
          width: 100%;
          text-align: left;
          list-style-type: none;
          padding: 0.2rem;
          padding-left: .5rem;
          transition: background-color .5s;
          overflow: hidden;
          font-size: .8rem;

          &:hover{
            background-color: rgba(0, 0, 0, .2);
          }

          &.is-active{
            background-color: rgba(0, 0, 0, .3);
          }

          max-width: 10rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;

        }
      }

      .absol-me{
        position: absolute;
        top: 0; bottom: 0;
        left: 0; right: 0;
        width: 100%;
        height: 100%;
        z-index: 5;
        cursor: pointer;
        opacity: .3;
        background-color: transparent;
        
        input{
          opacity: 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0; bottom: 0;
          left: 0; right: 0;
        }
      }
    }

    .break-two{ width: 100%}
    .break-three{ width: 0%}
    
    @media screen and (max-width: 550px) {
      .break-two{ width: 0%}
      .break-three{ width: 100%}
      .editor-norm-icon{
        margin: .25rem .4rem;
      }
    }
    
    @media screen and (max-width: 380px) {
      .editor-norm-icon{
        margin: .25rem .3rem;
      }
    }

  }

  .overflow-items{
    position: absolute;
    top: 101%; left: 0;
    right: 0; z-index: 20;

    .emoji-hol{
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .editor-holder{
    z-index: 5;

    .ProseMirror{
      border-top: 1px solid #c1c1c1;
      outline: 0 none;
      padding: .2rem .5rem;
      min-height: 10rem;

      code{
        font-family: 'Courier New', Courier, monospace;
        background-color: rgba(0, 0, 0, .8);
        display: inline-block;
        color: white;
      }

      blockquote{
        display: block;
        padding-left: .5rem;
        margin-left: .5rem;
        border-left: 3px solid #c0c0c0;
      }

      .make-sub{
        font-size: .5em;
        vertical-align: sub;
      }

      .make-sup{
        font-size: .5em;
        vertical-align: super;
      }

      ul,ol{
        padding-left: 2rem;
      }

      img{
        max-width: 100%;
        max-height: 50vh;
        display: block;
        border-radius: .2rem;
      }

      p.is-editor-empty:first-child::before{
        content: attr(data-placeholder);
        color: rgba(0, 0, 0, .5);
        float: left;
        height: 0;
        pointer-events: none;
      }

    }

    .select-text{
      display: flex;
      background-color: #c0c0c0;
      border-radius: .5rem;
      overflow: hidden;

      .editor-sel-icon{
        width: 2rem;
        height: 2rem;
        line-height: 1rem;
        font-size: 1rem;
        color: black;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.1rem;
        cursor: pointer;
        background-color: transparent;
        transition: background-color .5s;
        border-right: 1px solid rgba(0, 0, 0, .2);
        
        &.with-arrow{
          width: auto;
          padding: 0 .4rem;
        }

        &:hover{
          background-color: rgba(0, 0, 0, .2);
        }

        &.is-active{
          background-color: rgba(0, 0, 0, .3);
        }

        &:last-of-type{
          border-right: 0 none;
        }
      }
    }
  }

`

export default FullEditor
