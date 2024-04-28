import Layout from '@/components/layout'
import Hero from '@/components/landingPage/hero'
import About from '@/components/landingPage/about'
import Benefit from '@/components/landingPage/benefit'
import Course from '@/components/landingPage/course'
import { Divider } from '@chakra-ui/react'
import Popular from '@/components/landingPage/popular'
import Testimony from '@/components/landingPage/testimony'

function Home() {

  return (
    <Layout>
      <Hero />
      <About />
      <Benefit />
      {/* <Course /> */}
      <Divider borderColor={"#108EE9"} borderBottomWidth={"4px"} orientation="horizontal" width={"unset"} my={10} mx={"20"} />
      <Popular />
      <Testimony />
    </Layout>
  )
}

export default Home
