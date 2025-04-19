import React from 'react'
import { Main } from '../components/Main'
import Directory from '../components/Directory'
import { TotalAlumni } from '../components/TotalAlumni'
import { CommunityFeed } from '../components/CommunityFeed'
import { Footer } from '../components/Footer'
import Navbar from '../components/Navbar'

export const Home = () => {
  return (
    <div>
        <main className="px-4 pb-4 flex flex-col gap-8">
            <Main/>
            <Directory />
            <TotalAlumni/>
            <CommunityFeed/>
            <Footer/>
        </main>
    </div>
  )
}
