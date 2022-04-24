import styled from "styled-components"

import { useState } from "react"


const ImageQuery = ({ theImage }) => {

  const [image, setImage] = useState("")

  const [imageName, setImageName] = useState("Choose an Image")

  const addImage = e => {

    e.preventDefault()

    theImage(image);

  }

  const inputHandler = e => {

    const image = e.target.files[0]

    if (!image) { setImage(""); return setImageName("Choose an Image") }

    if (image.size > 5e6) { setImage(""); return setImageName("Too Large") }

    const img = new Image()

    img.src = URL.createObjectURL(image)

    img.onload = () => {

      const canvas = document.createElement('canvas')

      canvas.width = img.width

      canvas.height = img.height

      const ctx = canvas.getContext('2d')

      ctx.drawImage(img, 0, 0)

      const retVal = canvas.toDataURL("image/jpeg", 0.3)

      setImageName(image.name)

      setImage(retVal)

    }

  }

  return (

    <ImageStyle>

      <h1>Insert Image</h1>

      <form onSubmit={addImage}>

        <div className="form-pack">

          <div className="img-hide">

            {imageName}

            <input type="file" accept="image/png, image/jpg, image/jpeg, image/webpg" onInput={inputHandler} />

          </div>

        </div>

        <div className="btn-end">

          <button>Add Image</button>

        </div>

      </form>

    </ImageStyle>

  )

}

const ImageStyle = styled.div`

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

    .img-hide{
      background-color: grey;
      border-radius: 0.3rem;
      color: white;
      text-align: center;
    }

    input{
      position: absolute;
      top: 0; bottom: 0;
      left: 0; right: 0;
      background-color: transparent;
      width: 100%;
      cursor: pointer;
      opacity: 0;
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

export default ImageQuery
