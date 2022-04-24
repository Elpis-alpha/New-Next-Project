import styled from "styled-components"

const MyCollector = ({ ...props }) => {

  return (

    <CollectorStyle>

      {props.children}

    </CollectorStyle>

  )

}

const CollectorStyle = styled.div`
  flex: 1; width: 100%;
  display: flex;
  flex-direction: column;
`

export default MyCollector
