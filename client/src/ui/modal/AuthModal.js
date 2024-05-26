import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    Modal,
    ModalContent,
    ModalHeader,
    Input,
    Button,
    Card,
    CardBody
} from "@nextui-org/react"
import { Tabs, Tab } from "@nextui-org/tabs"
import apiHandler from '../../api/apiHandler'
import { setStats, setUser } from '../../action/auth'
import { showLoginModal } from '../../action/modal'
import { setSchedules } from '../../action/exercise'

const AuthModal = () => {

    const modal = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const variant = "underlined"

    const regName = useRef()
    const regEmail = useRef()
    const regPassword = useRef()

    const onRegister = async () => {

        const userData = {
            name: regName.current.value,
            email: regEmail.current.value,
            password: regPassword.current.value
        }

        const result = await apiHandler('POST', '/auth/signup', userData)
        if (result) {
            localStorage.setItem('Authorization', result.token)
            dispatch(setStats({ isAuthenticated: true }))
            dispatch(setUser({ name: userData.name, email: userData.email }))
            dispatch(showLoginModal(false))
        }
    }

    const logEmail = useRef()
    const logPassword = useRef()

    const onLogin = async () => {
        const userData = {
            email: logEmail.current.value,
            password: logPassword.current.value
        }
        const result = await apiHandler('POST', '/auth/login', userData)
        if (result) {
            localStorage.setItem('Authorization', result.token)
            dispatch(setStats({ isAuthenticated: true }))
            dispatch(setUser(result.user))
            dispatch(setSchedules(result.schedules))
            dispatch(showLoginModal(false))
        }
    }

    return (
        <Modal
            isOpen={modal.showLoginModal}
            placement="center-center"
            hideCloseButton={true}
            className="bg-gray-900"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <Tabs
                                aria-label="Options"
                                key={"d"}
                                variant={"light"}
                                color="default"
                            >
                                <Tab key="login" title="Signup">
                                    <Card className="bg-gray-800">
                                        <CardBody>
                                            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-2 gap-4">
                                                <Input
                                                    ref={regName}
                                                    className="text-slate-300"
                                                    color="primary"
                                                    type="text"
                                                    variant={variant}
                                                    label="Name"
                                                    placeholder="Enter your name"
                                                />
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-2 gap-4">
                                                <Input
                                                    ref={regEmail}
                                                    className="text-slate-300"
                                                    color="primary"
                                                    type="text"
                                                    variant={variant}
                                                    label="Email"
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-2 gap-4">
                                                <Input
                                                    ref={regPassword}
                                                    onChange={() => {
                                                        regPassword.current.type = "password"
                                                    }}
                                                    className="text-slate-300"
                                                    color="primary"
                                                    type="text"
                                                    variant={variant}
                                                    label="Password"
                                                    placeholder="Enter your password"
                                                />
                                            </div>
                                        </CardBody>
                                    </Card>
                                    <Button
                                        onClick={onRegister}
                                        color="primary"
                                        className="w-full mt-6"
                                    >
                                        Register
                                    </Button>
                                </Tab>
                                <Tab key="signup" title="Login">
                                    <Card className="bg-gray-800">
                                        <CardBody>
                                            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-2 gap-4">
                                                <Input
                                                    ref={logEmail}
                                                    className="text-slate-300"
                                                    color="primary"
                                                    type="text"
                                                    variant={variant}
                                                    label="Email"
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-2 gap-4">
                                                <Input
                                                    ref={logPassword}
                                                    className="text-slate-300"
                                                    onChange={() => {
                                                        logPassword.current.type = "password"
                                                    }}
                                                    type="text"
                                                    color="primary"
                                                    variant={variant}
                                                    label="Password"
                                                    placeholder="Enter your password"
                                                />
                                            </div>
                                        </CardBody>
                                    </Card>
                                    <Button
                                        onClick={onLogin}
                                        color="primary"
                                        className="w-full mt-6"
                                    >
                                        Login
                                    </Button>
                                </Tab>
                            </Tabs>
                        </ModalHeader>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default AuthModal