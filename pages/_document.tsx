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
            content="Servicio de alojamiento combinando naturaleza, confort y calidez. Mirador de las sierras, en las sierras"
          />
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:site_name" content="Cala cabana"/>
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