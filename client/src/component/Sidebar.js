import React from 'react'
import { Sidebar as SidebarPro, Menu, MenuItem } from 'react-pro-sidebar';
import { FaHome, FaList, FaUser } from "react-icons/fa";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Sidebar = () => {

    const scheduleState = useSelector(state => state.exercise)
    const Auth = useSelector(state => state.auth)
    const navigate = useNavigate()
    const navigateTo = path => navigate(path)
    const pathname = window.location.pathname

    return (
        <SidebarPro
            collapsed={true}
            className='h-dvh z-50'
            backgroundColor='#e2e8f0'
            rootStyles={{ color: '#e5e5e5' }}>

            <Menu
                className='sm:pt-20'
                menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                        if (level === 0)
                            return {
                                color: active ? '#ffffff' : '#60a5fa',
                                backgroundColor: active ? '#60a5fa' : 'undefined',
                            };
                    },
                }}>

                <MenuItem active={pathname === '/'} onClick={() => navigateTo('/')} icon={<FaHome />}> Home</MenuItem>
                {
                    scheduleState.schedules.length > 0
                    && <MenuItem active={pathname.includes('/schedule')} onClick={() => navigateTo('/schedule')} icon={<FaList />}>Schedules</MenuItem>
                }
                {
                    Auth.user.id
                    && <MenuItem active={pathname.includes('/profile')} onClick={() => navigateTo('/profile')} icon={<FaUser />}>Profile</MenuItem>

                }

            </Menu>
        </SidebarPro>
    )
}

export default Sidebar