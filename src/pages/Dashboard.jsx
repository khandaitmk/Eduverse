import React from 'react'
import { useSelector } from 'react-redux'
import Loader from '../components/common/Loader';
import SideBar from '../components/core/Dashboard/SideBar';
import { Outlet } from 'react-router-dom';

function Dashboard() {
    const {loading: authLoading} = useSelector(state => state.auth.loading);
    const {loading:profileLoading} = useSelector(state => state.profile.loading);

    if(profileLoading || authLoading){
        return (
            <div>
                <Loader></Loader>
            </div>
        )
    }
  return (
    <div className=' flex bg-richblack-800 sticky top-0 h-[calc(100vh-3.5rem)]'>
        <SideBar className=""></SideBar>
        <div className=' flex-1 overflow-auto bg-richblack-900'>
            <div className=''>
                <Outlet></Outlet>
            </div>
        </div>
    </div>
  )
}

export default Dashboard