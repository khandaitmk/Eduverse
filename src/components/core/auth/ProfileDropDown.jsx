import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../../../services/operations/authAPI';

const ProfileDropDown = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const user=useSelector((state) => state.profile);
  // console.log(user.user.firstName);
  // const image =
  //   user?.user?.image ||
  //   `https://api.dicebear.com/5.x/initials/svg?seed=${user?.user?.firstName || 'U'} ${user?.user?.lastName ||''}`;

  function logOutHandler(){
          dispatch(logOut(navigate));
      }

  return (
    <div className=''>
      <div className=' relative w-full group'>
        <img className=' rounded-full ' width={"30px"} src={user.user.image} alt="" />
        <div className='absolute left-0 mt-1 w-48 bg-richblack-800 rounded-lg shadow-lg p-2 z-50 invisible group-hover:visible '>
          <ul className='text-white'>
            <li>
              <Link to="/dashboard/my-profile" className='block px-4 py-2 hover:bg-richblack-700 rounded'>
                Dashboard
              </Link>
            </li>
            <li>
              <button
                onClick={logOutHandler}
                className='block w-full text-left px-4 py-2 hover:bg-richblack-700 rounded cursor-pointer'
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProfileDropDown