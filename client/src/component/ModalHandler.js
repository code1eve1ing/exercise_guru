import React from 'react'
import AuthModal from '../ui/modal/AuthModal'
import ScheduleModal from '../ui/modal/ScheduleModal'
import ExercisePlayerModal from '../ui/modal/ExercisePlayerModal'

const ModalHandler = () => {
    return (
        <>
            <AuthModal />
            <ScheduleModal />
            <ExercisePlayerModal/>
        </>
    )
}

export default ModalHandler