import styled from "styled-components"

import StarterKit from "@tiptap/starter-kit"

import { useEditor, EditorContent } from "@tiptap/react"

import TextStyle from "@tiptap/extension-text-style"

import EditorLink from "@tiptap/extension-link"

import EditorImage from "@tiptap/extension-image"

import EditorPlaceholder from "@tiptap/extension-placeholder"

import { FontSize, WorkClass, TextColor, FontFamily, BgColor, LineHeight, Underline } from "./customExtensions"


const FullEditor = ({ editorState, setEditorState }) => {

  const editor = useEditor({

    extensions: [

      StarterKit, TextStyle, FontSize,

      WorkClass, TextColor, FontFamily,

      BgColor, LineHeight, EditorImage.configure({ allowBase64: true, }),

      EditorLink.configure({ openOnClick: true }),

      Underline, EditorPlaceholder.configure({ placeholder: "An Empty Note" })

    ],

    editable: false,

    content: editorState,

    onUpdate: ({ editor }) => setEditorState(editor.getHTML())

  })

  if (!editor) { return null }

  return (

    <EditorStyle>

      <EditorContent editor={editor} />

    </EditorStyle>

  )

}

const EditorStyle = styled.div`

  border: 0 none;
  outline: 0 none;
  padding: .2rem .5rem;
  min-height: 5rem;
  width: 100%;

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

`

export default FullEditor
