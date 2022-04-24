import Head from 'next/head'

import { siteName, siteDescription, creator, keywordx } from '../../__env'


const HeadTag = ({ title, description, keywords = [], crawl = false }) => {

  return (

    <Head>

      <meta charSet="UTF-8" />

      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      <meta name="author" content={creator} />

      {crawl ? <meta name='robots' content='index,follow' /> : <meta name='robots' content='noindex,follow' />}

      <meta name="theme-color" content="#000" />

      <meta name="keywords" content={(keywordx.concat(keywords)).toString()} />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta name="description" content={description ? description : siteDescription} />

      <title>{siteName} {title && `| ${title}`}</title>

      <link rel="icon" href="/favicon.ico" />

      <link rel="apple-touch-icon" href="/logo192.png" />

      <link rel="manifest" href="/manifest.json" />

    </Head>

  )

}

export default HeadTag