import React from 'react'
import { NavLink  } from 'react-router' 

function Header() {
  return (
    <nav className='flex justify-between bg-green-300 h-20'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s"  className='' alt="" width="50px"/>
       <ul className='flex gap-5 pt-2.5 ml-3.5'>
            <li>
                <NavLink  to='/' className={({isActive})=>isActive?"text-white bg-fuchsia-400":" "}>Home</NavLink>
            </li>
            <li>
                <NavLink to='adduser' className={({isActive})=>isActive?"text-white bg-fuchsia-400":" "}>AddUser</NavLink>
            </li>
            <li>
                <NavLink to='userlist' className={({isActive})=>isActive?"text-white bg-fuchsia-400":" "}>UserList</NavLink>
            </li>
          
        </ul>
    </nav>
  )
}

export default Header