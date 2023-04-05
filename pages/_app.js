import LangContext from '../context/langContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <LangContext><Component {...pageProps} /></LangContext>
}

export default MyApp
