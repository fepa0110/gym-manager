import Layout from '@/components/Layout'
import Head from 'next/head'

import { Play } from 'next/font/google'

import '@/styles/globals.css'


import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const play = Play({
  weight: '400',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }) {
  return (
    <main className={play.className}>
      <Component {...pageProps} />
    </main>
  )
}
