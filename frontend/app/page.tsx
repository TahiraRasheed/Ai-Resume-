"use client"

import { useState,useEffect } from "react"
import Image from "next/image"
import Link from "next/link" 
import { Button } from "@/components/ui/button"
import { FileText, Star, Database, Twitter, Facebook, Instagram, Github, Menu, X } from "lucide-react"

export default function Homes() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false) //for scroll
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

//for scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

    // Simulate bot reply
    setTimeout(() => {
      const botReply = {
        role: "bot",
        text: "Thanks for your message! How can I assist you further?",
      }

      setMessages((prev) => [...prev, botReply])
      setIsTyping(false)
    }, 1500)
  

  return (
    <div className="flex flex-col min-h-screen">
       <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-purple-900 shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
          <Image src="/images/logo-white.png" alt="AI Resume Logo" style={{height:"30px", width:"auto"}} width={32} height={32} />
          </Link>
          <nav className="hidden md:flex space-x-8">
           
            <Link href="#" className="text-white hover:text-purple-200 flex items-center">
              Pricing
            </Link>
            <Link href="#" className="text-white hover:text-purple-200 flex items-center">
              Support
            </Link>
            <Link href="#" className="border border-[#B602DE] text-white bg-transparent hover:bg-transparent hover:text-[#B602DE] font-semibold py-2 px-4 rounded-full transition duration-300">
            Login
            </Link>
           
          </nav>
          <Button className="md:hidden bg-purple-700 hover:bg-purple-600" onClick={toggleMenu}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-purple-900 shadow-lg py-4 px-6 z-50">
            <nav className="flex flex-col space-y-4">
              {["Products", "Features", "Pricing", "Support"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-white hover:text-purple-200 py-2 border-b border-purple-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="radial-hero-bg text-white py-20 md:py-28 relative overflow-hidden">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="z-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Resume Analyzer</h1>
              <p className="text-lg mb-8">
                AI CV Analyzer is an intelligent ATS system that evaluates resumes for relevance, structure, and keyword
                optimization. Instantly score and enhance CVs to improve hiring accuracy or job application success.
                Built for recruiters, job seekers, and HR teams seeking smarter, faster screening.
              </p>
              <Link href="/dashboard">
              <Button className="border border-[#B602DE] text-white bg-transparent hover:bg-transparent hover:text-[#B602DE] font-semibold py-2 px-4 rounded-full transition duration-300">
                Get Started
              </Button>
              </Link>
            </div>
            <div className="relative z-10 flex justify-center">
              <Image
                src="/images/resume-top-img.png"
                alt="Resume Analysis Dashboard"
                width={500}
                height={400}
                className=""
              />
            </div>
          </div>
          <div className="blob-hero-1">
          <Image
                src="/images/blob-hero-shape.png"
                alt="Resume Analysis Dashboard"
                width={500}
                height={400}
                className=""
              />
          </div>
          <div className="blob-hero-2">
          <Image
                src="/images/blob-hero-shape.png"
                alt="Resume Analysis Dashboard"
                width={500}
                height={400}
                className=""
              />
          </div>
          <div className="blob-hero-3">
          <Image
                src="/images/blob-hero-shape.png"
                alt="Resume Analysis Dashboard"
                width={500}
                height={400}
                className=""
              />
          </div>
           </section>


        {/* Why Choose Section */}
        <section className="py-16 md:py-24  bg-white">
          <div className="container mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose AI CV Analyzer</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Discover how our intelligent features streamline the resume screening process.
            </p>
            <p className="text-gray-600 max-w-3xl mx-auto mt-2">
              From powerful analysis to smart scoring and easy management — it's everything you need to hire or apply
              smarter.
            </p>
          </div>

          <div className="container mx-auto grid md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm relative shadow relative">
              <div className="ra-bg-1"></div>
              <div className="w-16 h-16  rounded-lg flex items-center justify-center mb-6" style={{zIndex:"1",position:"relative"}}>
              <Image
                src="/images/ra-icon.svg"
                alt="Resume Analysis Dashboard"
                width={500}
                height={400}
                className=""
              />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4" style={{zIndex:"1",position:"relative"}}>Resume Analysis</h3>
              <ul className="text-gray-600 space-y-2">
                <li>Analyze resumes in seconds with machine learning algorithms trained on recruitment data.</li>
                <li>Identify strengths, weaknesses, and keyword gaps with precision.</li>
                <li>Ensure every CV aligns with ATS standards for better visibility.</li>
              </ul>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm relative shadow">
            <div className="ra-bg-2"></div>
              <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-6" style={{zIndex:"1",position:"relative"}}>
              <Image
                src="/images/smart-scoring-icon.svg"
                alt="Resume Analysis Dashboard"
                width={500}
                height={400}
                className=""
              />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4" style={{zIndex:"1",position:"relative"}}>Smart Scoring</h3>
              <ul className="text-gray-600 space-y-2">
                <li>Get instant CV scores based on structure, relevance, and keyword match.</li>
                <li>Receive actionable feedback to optimize resumes for specific job roles.</li>
                <li>Make faster, data-driven hiring or application decisions.</li>
              </ul>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm relative shadow">
              
              <div className="ra-bg-3"></div>
              <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-6" style={{zIndex:"1",position:"relative"}}>
              <Image
                src="/images/cv-mgt-icon.svg"
                alt="Resume Analysis Dashboard"
                width={500}
                height={400}
                className=""
              />
              </div>
            
              <h3 className="text-xl font-bold text-gray-800 mb-4" style={{zIndex:"1",position:"relative"}}>CV Management</h3>
              <ul className="text-gray-600 space-y-2">
                <li>Easily upload, store, and manage multiple resumes in one place.</li>
                <li>Track performance history and download enhanced versions instantly.</li>
                <li>Perfect for HR teams handling bulk hiring or job seekers managing applications.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24  bg-gradient-to-br from-purple-900 to-indigo-800 text-white">
          <div className="container mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How does it work?</h2>
            <p className="text-lg opacity-80">Our AI-powered resume analysis process</p>
          </div>

          <div className="container mx-auto">
            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white text-purple-900 rounded-full flex items-center justify-center text-xl font-bold mb-8 z-10">
                  1
                </div>
                <div className="text-center p-6">
                  <Image
                    src="/placeholder.svg?height=150&width=150"
                    alt="Upload Resume"
                    width={150}
                    height={150}
                    className="mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">Upload Resume</h3>
                  <p className="text-sm opacity-80">Upload your resume in PDF, DOCX, or TXT format.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white text-purple-900 rounded-full flex items-center justify-center text-xl font-bold mb-8 z-10">
                  2
                </div>
                <div className="text-center p-6">
                  <Image
                    src="/placeholder.svg?height=150&width=150"
                    alt="AI Analysis"
                    width={150}
                    height={150}
                    className="mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
                  <p className="text-sm opacity-80">
                    Our LLM-powered system extracts skills, experience, and qualifications.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white text-purple-900 rounded-full flex items-center justify-center text-xl font-bold mb-8 z-10">
                  3
                </div>
                <div className="text-center p-6">
                  <Image
                    src="/placeholder.svg?height=150&width=150"
                    alt="Job Matching"
                    width={150}
                    height={150}
                    className="mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">Job Matching</h3>
                  <p className="text-sm opacity-80">Semantic search matches your profile with relevant job openings.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white text-purple-900 rounded-full flex items-center justify-center text-xl font-bold mb-8 z-10">
                  4
                </div>
                <div className="text-center p-6">
                  <Image
                    src="/placeholder.svg?height=150&width=150"
                    alt="View Results"
                    width={150}
                    height={150}
                    className="mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">View Results</h3>
                  <p className="text-sm opacity-80">
                    Get personalized job recommendations and insights about your resume.
                  </p>
                </div>
              </div>

              {/* Connecting Line */}
              <div className="hidden md:block absolute top-8 left-[14%] right-[14%] h-0.5 bg-white/30"></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#1a1530] text-white pt-8 border-t border-purple-900">
      <div className="container mx-auto  flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        {/* Left: Logo and Brand */}
        <div className="flex items-center space-x-2">
          <Image src="/images/logo-white.png" alt="AI Resume Logo" style={{height:"30px", width:"auto"}} width={32} height={32} />
          
        </div>

        {/* Center: Navigation */}
        <nav className="flex flex-wrap justify-center space-x-6 text-sm font-medium">
          <Link href="#" className="hover:text-purple-300">
            Product
          </Link>
          <Link href="#" className="hover:text-purple-300">
            Features
          </Link>
          <Link href="#" className="hover:text-purple-300">
            Pricing
          </Link>
          <Link href="#" className="hover:text-purple-300">
            Support
          </Link>
        </nav>

        {/* Right: Social Icons */}
        <div className="flex space-x-4">
          <Link href="#" className="hover:text-purple-300">
            <Twitter className="w-5 h-5" />
          </Link>
          <Link href="#" className="hover:text-purple-300">
            <Facebook className="w-5 h-5 fill-purple-500 text-purple-500" />
          </Link>
          <Link href="#" className="hover:text-purple-300">
            <Instagram className="w-5 h-5" />
          </Link>
          <Link href="#" className="hover:text-purple-300">
            <Github className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="text-center text-sm text-purple-300 py-4">
        © Copyright 2022, All Rights Reserved by Webwiz
      </div>
    </footer>
    </div>
  )
}