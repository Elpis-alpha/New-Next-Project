import { useEffect } from 'react';

import BigWrapper from '../source/components/general/BigWrapper';

import NavBar from '../source/components/general/NavBar';

import { processCookies } from '../source/controllers/GeneralCtrl';

import Message from '../source/controllers/Messages/Message';

import Authenticator from '../source/components/general/Authenticator';

import NextjsProgressbar from 'nextjs-progressbar';

import { Provider } from 'react-redux'

import GlobalStyles from '../source/beautify/GlobalStyles'

import store from '../source/store/store'


const MyApp = ({ Component, pageProps }) => {

  useEffect(() => { processCookies() }, []) // Queries user for permisission to use cookies

  return (

    <>

      <Provider store={store}>

        <GlobalStyles />

        <NextjsProgressbar color='#4472c3' />

        <Authenticator />

        <BigWrapper>

          <NavBar />

          <Component {...pageProps} />

        </BigWrapper>

        <Message />

      </Provider>

    </>

  )

}

export default MyApp;
