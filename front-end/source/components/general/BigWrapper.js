import styled from "styled-components"

import { useSelector } from "react-redux"


const BigWrapper = ({ ...props }) => {

  const { tested } = useSelector(store => store.user)

  const { revealView } = useSelector(store => store.display)

  return (

    <BigWrapperStyle>

      {(tested && revealView) ? props.children : <></>}

    </BigWrapperStyle>

  )

}

const BigWrapperStyle = styled.div`
  z-index: 10;
  width: 100%;
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`

export default BigWrapper


