import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import SideBarLinks from './SideBarLinks';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../common/Loader';
import { logOut } from '../../../services/operations/authAPI';
import ConfirmationModel from '../../common/ConfirmationModel';
import { VscSignOut } from 'react-icons/vsc';

function SideBar({setMobileMenuOpen}) {
    const {user,loading:profileLoading}=useSelector((state)=>(state.profile));
    const {loading:authLoading}=useSelector((state)=>(state.auth));
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [confirmationModel,setConfirmationModel]=useState(null);

    if(authLoading || profileLoading){
        return(
            <div>
                <Loader></Loader>
            </div>
        )
    }

  return (
    <div className={`lg:h-[calc(100vh-3.5rem)] bg-richblack-800 w-[250px] lg: text-richblack-300 overflow-y-auto lg:overflow-hidden lg:sticky top-0 flex flex-col gap-4 lg:gap-5`}>
        <div className='flex flex-col pt-6 lg:pt-10 gap-2 lg:gap-3'>
            {
                sidebarLinks.map((link) =>{
                    if(link.type && user?.accountType !== link.type )return null;
                    return(
                        <div key={link.id} onClick={() => setMobileMenuOpen && setMobileMenuOpen(false)}>
                            <SideBarLinks link={link} icon={link.icon}></SideBarLinks>
                        </div>
                    )
                })
            }
        </div>

        <div className=' w-[85%] mx-auto bg-richblack-500 h-[1px]'></div>

        <div>
            <div onClick={() => setMobileMenuOpen && setMobileMenuOpen(false)}>
                <SideBarLinks link={{name:"Settings",path:"/dashboard/settings"} } icon={"VscSettingsGear"}></SideBarLinks>
            </div>

            <button className=' cursor-pointer w-full' onClick={()=> 
                setConfirmationModel({text1:"Are you sure ?",
                    text2:"You will be logged out of your account.",
                    btnText1:"Logout",
                    btnText2:"Cancel",
                    btn1Handler:()=>dispatch(logOut(navigate)),
                    btn2Handler:()=>setConfirmationModel(null)
                })}
            >
                <div className=' flex items-center p-3 lg:p-4 pl-6 lg:pl-8 gap-x-2'>
                    <VscSignOut className ="text-base lg:text-lg"></VscSignOut>
                    <span className='text-sm lg:text-base'>Logout</span>
                </div>
            </button>
        </div>
        {confirmationModel && <ConfirmationModel data={confirmationModel}></ConfirmationModel>}
    </div>
    
  )
}

export default SideBar