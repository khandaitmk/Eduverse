import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import SideBarLinks from './SideBarLinks';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../common/Loader';
import { logOut } from '../../../services/operations/authAPI';
import ConfirmationModel from '../../common/ConfirmationModel';
import { VscSignOut } from 'react-icons/vsc';

function SideBar() {
    const {user,loading:profileLoading}=useSelector((state)=>(state.profile));
    const {loading:authLoading}=useSelector((state)=>(state.auth));
    const dispatch=useDispatch();
    const navigate=useNavigate();

    if(authLoading || profileLoading){
        return(
            <div>
                <Loader></Loader>
            </div>
        )
    }

    const [confirmationModel,setConfirmationModel]=useState(null);

  return (
    <div className={` h-[calc(100vh-3.5rem)] bg-richblack-800 w-[14%] text-richblack-300 overflow-hidden sticky top-0 flex flex-col gap-5`}>
        <div className='flex flex-col pt-10 gap-3'>
            {
                sidebarLinks.map((link) =>{
                    if(link.type && user?.accountType !== link.type )return null;
                    return(
                        <SideBarLinks key={link.id} link={link} icon={link.icon}></SideBarLinks>
                    )
                })
            }
        </div>

        <div className=' w-[85%] mx-auto bg-richblack-500 h-[1px]'></div>

        <div>
            <SideBarLinks link={{name:"Settings",path:"/dashboard/settings"} } icon={"VscSettingsGear"}></SideBarLinks>

            <button className=' cursor-pointer' onClick={()=> 
                setConfirmationModel({text1:"Are you sure ?",
                    text2:"You will be logged out of your account.",
                    btnText1:"Logout",
                    btnText2:"Cancel",
                    btn1Handler:()=>dispatch(logOut(navigate)),
                    btn2Handler:()=>setConfirmationModel(null)
                })}
            >
                <div className=' flex items-center p-4 pl-8 gap-x-2'>
                    <VscSignOut className ="text-lg"></VscSignOut>
                    <span>Logout</span>
                </div>
            </button>
        </div>
        {confirmationModel && <ConfirmationModel data={confirmationModel}></ConfirmationModel>}
    </div>
    
  )
}

export default SideBar