import { useSelector } from "react-redux"

import WelcomeLoader from "./WelcomeLoader"


const Authenticator = () => {

  const { available, tested } = useSelector(store => store.user)

  return <WelcomeLoader status={(available || tested) ? (tested ? 'remove' : 'none') : 'show'} />

}


export default Authenticator

