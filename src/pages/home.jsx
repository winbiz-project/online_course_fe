import Layout from '@/components/layout'
import Hero from '@/components/landingPage/hero'
import About from '@/components/landingPage/about'
import Benefit from '@/components/landingPage/benefit'

function Home() {

  return (
    <Layout>
      <Hero />
      <About />
      <Benefit />
    </Layout>
  )
}

export default Home
