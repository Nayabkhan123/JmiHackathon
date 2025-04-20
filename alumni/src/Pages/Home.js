import React from 'react'
import { Main } from '../components/Main'
import Directory from '../components/Directory'
import { TotalAlumni } from '../components/TotalAlumni'
import { CommunityFeed } from '../components/CommunityFeed'
import { Footer } from '../components/Footer'
import Navbar from '../components/Navbar'
import CommunityPage from './CommunityPage'

export const Home = () => {
  return (
    <div>
        <main className="bg-gray-900 flex flex-col gap-10">
            <Main/>
            <Directory />
            <TotalAlumni/>
            <CommunityFeed/>
            <Footer/>
        </main>
    </div>
  )
}

