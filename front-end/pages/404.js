import HeadTag from '../source/components/general/HeadTag'

import styled from "styled-components"

import { complain } from '../source/__env'


const PageNotFound = () => {

  return (

    <PageStyle>

      <HeadTag title="404" />

      <div className='nm'>

        <h1>404</h1>

        <p>Unfortunately, it seemes the page you requested for does not currently exist.</p>

        <small>If you have any doubts regarding why this does not exist, kindly <a href={complain} target="_blank" rel="noopener noreferrer">lodge a complaint here</a></small>

      </div>

    </PageStyle>

  )

}

const PageStyle = styled.div`

  padding: 2rem;
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  color: black;
  
  .nm{
    margin: auto;
    text-align: center;

    h1{
      font-size: 5rem;
      line-height: 6rem;
    }

    p{
      font-size: 1rem;
      padding: .5rem;
    }

    small{
      font-size: .8rem;
      font-style: italic;
    }
  }
`

export default PageNotFound
