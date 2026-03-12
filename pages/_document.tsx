import { ColorModeScript } from '@chakra-ui/react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import theme from '../theme'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          <meta
            name="description"
            content="Cala Cabana: alquiler de departamentos vacacionales en Tanti, Córdoba. Vista a las sierras, pileta, WiFi y estacionamiento."
          />
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:site_name" content="Cala Cabana"/>
          <meta property="og:locale" content="es_AR"/>
          <meta property="og:type" content="website"/>
          <meta name="author" content="Nicolas Tudela"></meta>
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument