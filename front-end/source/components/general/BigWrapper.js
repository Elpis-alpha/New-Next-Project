import styled from "styled-components"

const BigWrapper = ({ ...props }) => {

  return (

    <BigWrapperStyle>{props.children}</BigWrapperStyle>

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


