import React, { lazy, useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from '../../assets/Logo/LearnSphere.png'
import {NavbarLinks} from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { CiShoppingCart } from "react-icons/ci"
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { IoIosArrowDown, IoIosArrowDropdown } from 'react-icons/io'

const subLinks = [
  {
      title: "python",
      link:"/catalog/python"
  },
  {
      title: "web dev",
      link:"/catalog/web-development"
  },
];


const Navbar = () => {
    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    const {totalItems} = useSelector((state) => state.cart)

    const location = useLocation()

    const [ssubLinks, setSubLinks] = useState([])

    const fetchSublinks = async() => {
      try {
          const result = await apiConnector("GET", categories.CATEGORIES_API)
          console.log("Printing sublinks result: ",result)
          setSubLinks(result?.data?.data)
      } catch (error) {
          console.log("Could not fetch the category list",error.message);
      }
   }
    useEffect( () => {
      // fetchSublinks();
    },[])

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)
    }
  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        <Link>
            <img
                src={logo}
                width={160}
                height={42}
                loading='lazy'
            />
        </Link>

        <nav>
            <ul className='flex gap-x-6 text-richblack-25'>
              {
                  NavbarLinks.map((link, index) => (
                    <li key={index}>
                      {
                          link.title === "Catalog" ? (
                            <div className='relative flex items-center gap-2 group'>
                                <p>{link.title}</p>
                                <IoIosArrowDropdown/>

                                <div className='invisible absolute left-[50%]
                                    translate-x-[-50%] translate-y-[80%]
                                 top-[50%]
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px]'>

                                <div className='absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                </div>

                                {
                                    subLinks.length ? (
                                            subLinks.map( (subLink, index) => (
                                                <Link to={`${subLink.link}`} key={index}>
                                                    <p>{subLink.title}</p>
                                                </Link>
                                            ) )
                                    ) : (<div></div>)
                                }

                                </div>


                            </div>
                          ) : (
                                <Link to={link?.path}>
                                    <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"} `}>
                                        {link.title}
                                    </p>
                                </Link>
                          )
                      }
                    </li>
                  ))
              }
            </ul>
        </nav>

        <div className='flex gap-5 items-center'>

          {
              user && user?.accountType !== "Instructor" && (
                  <Link to={'/dashboard/cart'} className='relative'>
                      <CiShoppingCart/>
                      {
                         totalItems > 0 && (
                            <span>
                              {totalItems}
                            </span>
                         )
                      }
                  </Link>
              )
          }
          {
               token === null && (
                   <Link to='/login'>
                       <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                                    text-richblack-100 rounded-md'>
                          Login
                       </button>
                   </Link>
               )
          }
          {
               token === null && (
                   <Link to='/signup'>
                       <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                                    text-richblack-100 rounded-md'>
                          Signup
                       </button>
                   </Link>
               )
          }
          {
               token !== null && <ProfileDropDown/>
          }
        </div>

      </div>
    </div>
  )
}

export default Navbar
