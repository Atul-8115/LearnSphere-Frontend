import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'

const CodeBlock = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock,  backgroundGradient, codeColor
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
      <div className='w-[50%] flex flex-col gap-8'>
        {heading}
        <div className='text-richblcak-300 font-bold'>
            {subheading}
        </div>
        <div className='flex gap-7 mt-7'>
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className='flex gap-2 items-center'>
                {ctabtn1.btnText}
                <FaArrowRight/>
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      <div>
        
      </div>
    </div>
  )
}

export default CodeBlock
