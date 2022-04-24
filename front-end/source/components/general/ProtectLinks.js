import { useRouter } from 'next/router'

import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { authLink, protectedLinks } from '../../__env';

import { setShowNav, setRevealView } from '../../store/slice/displaySlice';


const ProtectLinks = () => {

  const router = useRouter()

  const dispatch = useDispatch()

  const { available, tested } = useSelector(store => store.user)

  const handleRouteChange = url => {

    let isProtected = false

    protectedLinks.forEach(link => {

      if (link.split('*').length === 2 && url.startsWith(link.slice(0, -1))) {

        isProtected = true

      } else if (link === url || url.startsWith(link + '?') || url.startsWith(link + '/?')) {

        isProtected = true

      }

    })

    if (url === '/verify') { dispatch(setShowNav(false)) }

    else { dispatch(setShowNav(true)) }

    if (!tested) { return dispatch(setRevealView(false)) }

    if (isProtected === true && available === false) { router.push(authLink); return dispatch(setRevealView(false)) }

    dispatch(setRevealView(true))

  }

  useEffect(() => {

    handleRouteChange(router.asPath)

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {

      router.events.off('routeChangeComplete', handleRouteChange)

    }

  }, [available, tested])



  return <></>

}

export default ProtectLinks
