import styled from "styled-components"

import { useState } from "react"


const LinkQuery = ({ theLink }) => {

  const [linkText, setLinkText] = useState("")

  const [address, setAddress] = useState("")

  const addLink = e => {

    e.preventDefault()

    theLink(linkText, address);

  }

  return (

    <LinkStyle>

      <h1>Enter Your Link</h1>

      <form onSubmit={addLink}>

        <div className="form-pack">

          <label>Link Text</label>

          <input type="text" required value={linkText} onInput={e => setLinkText(e.target.value)} />

        </div>

        <div className="form-pack">

          <label>Link Address</label>

          <input type="text" required value={address} onInput={e => setAddress(e.target.value.trim())} />

        </div>

        <div className="btn-end">

          <button>Add Link</button>

        </div>

      </form>

    </LinkStyle>

  )

}

const LinkStyle = styled.div`

  background-color: #f4f4f4;
  box-shadow: 0 0 3px 1px grey;
  border-radius: 0.5rem;
  overflow: hidden;
  width: 20rem;
  padding: 1rem;

  h1{
    text-align: center;
    font-size: 1.2rem;
    line-height: 2rem;
    /* padding-bottom: 0.5rem; */
  }

  .form-pack{
    width: 100%;
    display: flex;
    flex-direction: column;
    /* padding: 0 1rem; */

    label{
      font-weight: bold;
    }

    input{
      background-color: transparent;
      border: 1px solid grey;
      outline: 0 none;
      border-radius: 0.3rem;
      padding: 0 .5rem;
    }
  }

  .btn-end{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 0.5rem;
    
    button{
      width: 100%;
      background-color: #3c73e9;
      line-height: 1rem;
      border: 0 none; outline: 0 none;
      padding: 0.5rem .5rem;
      color: white;
      border-radius: 0.2rem;
      cursor: pointer;
      transition: box-shadow .5s;

      &:hover{
        box-shadow: 0 0 4px 0 #3c73e9;
      }
    }
  }

`

export default LinkQuery
