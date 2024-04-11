import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/CTAButton';
import Banner from '../assets/Images/banner.mp4'
import CodeBlock from '../components/core/HomePage/CodeBlock';
const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <div className='relative mx-auto flex flex-col w-11/12 items-center
      text-white justify-between'>

        <Link to={'/signup'}>
            <div>
                <p>Become an Instructor</p>
                <FaArrowRight/>
            </div>
        </Link>
        
        <div>
            Empower Your Future with 
            <HighlightText text={"Coding Skills"}>Coding Skills</HighlightText>
        </div>
        <div>
            With our online coding courses, you can learn at your own pace,
            from anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from Instructors.
        </div>
        <div className='flex flex-row gap-7 mt-8'>
            <CTAButton active={true} linkto={'/signup'}>Learn More</CTAButton>
            <CTAButton active={false} linkto={'/login'}>Book a Demo</CTAButton>
        </div>

        <div>
            <video
            muted
            loop
            autoPlay
            >
                <source src={Banner} type='video/mp4'/>
            </video>
        </div>

        <div>
            <CodeBlock
                position={"lg:flex-row"}
                heading={
                    <div>
                        Unlock Your
                        <HighlightText text={"coding potential"}/>
                        with out online courses
                    </div>
                }
                subheading={"outrljflkdsj"}
                ctabtn1={
                    {
                        btnText: "try it yourself",
                        linkto: '/signup',
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText: "Learn More",
                        linkto: '/login',
                        active: false
                    }
                }
                
                codeblock={`<<!DOCTYPE html>\n<html></html>`}
                codeColor={"text-yellow-25"}

            />
        </div>


      </div>



      {/* Section 2 */}
      {/* Section 3 */}
      {/* Section 4 */}
    </div>
  )
}

export default Home
