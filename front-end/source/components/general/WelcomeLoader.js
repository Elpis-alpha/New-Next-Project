import { useEffect } from 'react'

import styled from 'styled-components'

import Cookies from 'universal-cookie'

import { getUser } from '../../api'

import { useDispatch } from 'react-redux'

import { setUserData, setUserTest } from '../../store/slice/userSlice'

import { siteName } from '../../__env'


const InitialLoader = ({ status }) => {

  const dispatch = useDispatch()

  useEffect(async () => {

    // Start tracking time
    const timeNow = performance.now()

    const cookies = new Cookies()

    const token = cookies.get('user-token')

    let userData = undefined

    // Fetch and Validate user
    if (token !== undefined) {

      const user = await fetch(getUser(), {

        method: 'GET',

        headers: {

          'Content-type': 'application/json',

          'Authorization': `Bearer ${token}`

        }

      })

      userData = await user.json()

      userData.token = token

    }

    // End the Wait
    const timeEnd = performance.now()

    const remainingTime = 1500 - (timeEnd - timeNow)

    if (remainingTime > 1) { await new Promise(resolve => setTimeout(resolve, remainingTime)) }


    // Set data accordinly
    if (userData) { if (!userData.error) { dispatch(setUserData(userData)) } else { dispatch(setUserTest(true)) } }

    else { dispatch(setUserTest(true)) }

  }, [])

  if (status === "none") { return <></> }

  return (

    <InitLoaderStyle className={status}>

      <div>

        <div className="image-pack">

          <img src="/logo.png" alt="logo" />

        </div>

        <h1>Welcome to {siteName}</h1>

      </div>

    </InitLoaderStyle>

  )

}

const InitLoaderStyle = styled.div`
  position: fixed;
  top: 0; bottom: 0;
  right: 0; width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d8d8d8;
  color: black;
  z-index: 20;
  overflow: hidden;
  box-shadow: 0 0 5px 0 black;

  @keyframes slide-out {
    from{right: 0;}
    to{right: 110%;}
  }

  .image-pack{
    max-width: 45%;
    max-height: 45vh;
    margin: 0 auto;
    display: flex;
    align-items: stretch;
    justify-content: center;

    img{
      display: block;
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

  }

  h1{
    font-size: 3rem;
    line-height: 3rem;
    padding: 3rem 0;
    text-align: center;
    font-family: Redressed;
  }
    
  &.remove{
    animation: slide-out .7s ease-in 1;
    right: 110%;
  }
`

export default InitialLoader
