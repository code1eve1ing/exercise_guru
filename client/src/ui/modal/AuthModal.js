import React, { useRef, useState } from 'react'
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
import { setIsAuthenticated, setStats, setUser } from '../../action/auth'
import { showLoginModal } from '../../action/modal'
import { setSchedules } from '../../action/exercise'
import { useForm, Controller } from "react-hook-form"

const AuthModal = () => {

    const { control, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })
    const modal = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const variant = "underlined"
    const [isLoading, setIsLoading] = useState(false)
    const [selected, setSelected] = useState('signup')


    const onRegister = async (userData) => {
        setIsLoading(true)
        const result = await apiHandler('POST', '/auth/signup', userData)
        setIsLoading(false)

        if (result) {
            localStorage.setItem('Authorization', result.token)
            dispatch(setIsAuthenticated(true))
            dispatch(setUser(result.user))
            dispatch(showLoginModal(false))
        }
    }

    const onSubmit = (data) => {
        const { email, password}= data
        selected==='signup' ? onRegister(data) : onLogin({email, password})
    }

    const onLogin = async (userData) => {

        setIsLoading(true)
        const result = await apiHandler('POST', '/auth/login', userData)
        setIsLoading(false)

        if (result) {
            localStorage.setItem('Authorization', result.token)
            dispatch(setIsAuthenticated(true))
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
                                isDisabled={isLoading}
                                aria-label="Options"
                                variant={"light"}
                                color="default"
                                selectedKey={selected}
                                onSelectionChange={setSelected}
                            >
                                <Tab key="signup" title="Signup"></Tab>
                                <Tab key="login" title="Login"></Tab>
                            </Tabs>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Card className="bg-gray-800 mt-3">
                                    <CardBody>
                                        {
                                            selected === 'signup' &&
                                            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-2 gap-4">
                                                <Controller
                                                    name="name"
                                                    control={control}
                                                    rules={{
                                                        required: true
                                                    }}
                                                    render={({ field }) => <Input
                                                        {...field}
                                                        className="text-slate-300"
                                                        color="primary"
                                                        type="text"
                                                        variant={variant}
                                                        label="Name"
                                                        placeholder="Enter your name"
                                                        isInvalid={errors.name}
                                                        errorMessage="Name is required"
                                                    />}
                                                />
                                            </div>
                                        }
                                        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-2 gap-4">
                                            <Controller
                                                name="email"
                                                control={control}
                                                rules={{
                                                    required: true, pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Invalid email address"
                                                    }
                                                }}
                                                render={({ field }) => <Input
                                                    {...field}
                                                    className="text-slate-300"
                                                    color="primary"
                                                    type="text"
                                                    variant={variant}
                                                    label="Email"
                                                    placeholder="Enter your email"
                                                    isInvalid={errors.email}
                                                    errorMessage={errors.email && (errors.email.message || 'Email is required')}
                                                />}
                                            />
                                        </div>
                                        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-2 gap-4">
                                            <Controller
                                                name="password"
                                                control={control}
                                                rules={{
                                                    required: true,
                                                    minLength: {
                                                        value: 8,
                                                        message: 'Username must be at least 8 characters long.'
                                                    }
                                                }}
                                                render={({ field }) => <Input
                                                    {...field}
                                                    className="text-slate-300"
                                                    color="primary"
                                                    type="password"
                                                    variant={variant}
                                                    label="Password"
                                                    placeholder="Enter your password"
                                                    autocomplete="none"
                                                    isInvalid={errors.password}
                                                    errorMessage={errors.password && (errors.password.message || 'Password is required')}
                                                />}
                                            />
                                        </div>
                                    </CardBody>
                                </Card>
                                <Button
                                    type='submit'
                                    isLoading={isLoading}
                                    color="primary"
                                    className="w-full mt-6"
                                >
                                    {selected === 'signup' ? 'Register' : 'Login'}
                                </Button>
                            </form>
                        </ModalHeader>
                    </>
                )}
            </ModalContent>
        </Modal >
    )
}

export default AuthModal