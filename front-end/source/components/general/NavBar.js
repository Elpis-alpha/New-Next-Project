import Link from "next/link"

import styled from "styled-components"

import { Twirl as Hamburger } from "hamburger-react"

import { useEffect, useRef, useState } from "react"

import { HiOutlineNewspaper } from "react-icons/hi"

import { FaUser, FaInfoCircle } from "react-icons/fa"

import { siteName } from "../../__env"


const NavBar = () => {

  const [isNavOpened, setIsNavOpened] = useState(false)

  const navChildrenRef = useRef(null)

  useEffect(() => {

    if (isNavOpened) { navChildrenRef.current.style.right = "0vw" }

    else { navChildrenRef.current.style.right = "105vw" }

  }, [isNavOpened])


  return (

    <NavStyle>

      <div className="heading">

        <Link href="/"><a>{siteName}</a></Link>

      </div>

      <div className="ham-holder">

        <Hamburger color="black" size={20} toggled={isNavOpened} toggle={setIsNavOpened} duration={1} distance="sm" rounded />

      </div>

      <div className="children" ref={navChildrenRef}>

        <div className="ham-spe-hol">

          <Hamburger color="black" size={20} toggled={isNavOpened} toggle={setIsNavOpened} duration={1} distance="sm" rounded />

        </div>

        <ul>

          <li><Link href="/"><a>

            News <HiOutlineNewspaper />

          </a></Link></li>

          <li><Link href="/"><a>

            Profile <FaUser />

          </a></Link></li>

          <li><Link href="/"><a>

            Contact <FaInfoCircle />

          </a></Link></li>

        </ul>

      </div>

    </NavStyle>

  )

}

const NavStyle = styled.nav`

  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(128, 128, 128, 0.3);
  z-index: 100;
  width: 100%;

  .heading {

    a{
      padding: 1.5rem;
      line-height: 2rem;
      display: block;
      font-size: 1.5rem;
      color: black;
      text-decoration: none;
      font-weight: bold;
    }
    
  }

  .ham-holder{
    display: none;
  }

  .children{
    display: flex;
    position: static;
    right: 105vw;

    ul{
      display: flex;
      list-style-type: none;

      li{
        padding: .5rem 1rem;

        a{
          color: black;
          text-decoration: none;
          font-size: .9rem;
          line-height: .9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color .5s, background-color .5s;

          svg{margin-left: .3rem; transition: color .5s;}

          &:hover{
            color: green;
            svg{color: green;}
          }
        }
      }
    }

    .ham-spe-hol{
      display: none;
    }
  }

  @media screen and (max-width: 600px) {

    .ham-holder{
      display: flex;
    }    

    .children{
      position: fixed;
      align-items: center;
      justify-content: center;
      width: 100vw;
      top: 0; bottom: 0;
      background-color: #a4a4a4;
      box-shadow: 0 0 3px 0 black;
      z-index: 15;
      transition: right 1s;

      .ham-spe-hol{
        display: flex;
        position: absolute;
        top: 1rem; right: 1rem;
        z-index: 3;
      }

      
      ul{
        flex-direction: column;
        width: 100%;

        li{
          padding: 0;

          a{
            padding: 1rem;
          }
          
          a:hover{
            background-color: rgba(0, 0, 0, 0.3);
            color: black;
            svg{color: black;}
          }
        }
      }
    }
  }
  
`

export default NavBar
