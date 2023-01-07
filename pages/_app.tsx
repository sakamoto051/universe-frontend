import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Header } from '../components/organisms/Header'
import { Footer } from '../components/organisms/Footer'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathname = router.pathname;
  return (
    <>
      { pathname !== '/register' && 
        pathname !== '/login' &&
        pathname !== '/' &&
        <Header />
      }
      <Component {...pageProps} />
      {/* <Footer /> */}
    </>
  )
}
