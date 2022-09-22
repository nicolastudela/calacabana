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
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Aguafina+Script&family=MonteCarlo&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=MonteCarlo&display=swap" rel="stylesheet"></link>
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