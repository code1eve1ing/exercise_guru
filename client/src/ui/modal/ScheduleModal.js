import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    RadioGroup,
    Radio,
    cn,
    Button
} from "@nextui-org/react"
import { showScheduleModal } from '../../action/modal';
import apiHandler from '../../api/apiHandler';
import { addExercise, addSchedule } from '../../action/exercise';
import { createSearchParams, useNavigate } from 'react-router-dom'

export const CustomRadio = (props) => {
    const { children, ...otherProps } = props;

    return (
        <Radio
            {...otherProps}
            classNames={{
                base: cn(
                    "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                    "flex-row-reverse max-w-[700px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                    "data-[selected=true]:border-primary"
                ),
            }}
        >
            {children}
        </Radio>
    );
}

const ScheduleModal = () => {

    const modal = useSelector(state => state.modal)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const exercise = useSelector(state => state.exercise)
    const { schedules, selectedExercise } = exercise

    const [selectedScheduleId, setSelectedScheduleId] = useState(null)

    const saveSchedule = async () => {

        const data = { exercise: selectedExercise }

        dispatch(showScheduleModal(false))

        if (selectedScheduleId === 'new_schedule') {

            data.name = `Schedule ${schedules.length + 1}`
            const result = await apiHandler('POST', '/schedule/', data)
            if (result) dispatch(addSchedule(result))
            navigate({
                pathname: '/schedule',
                search: createSearchParams({
                    scheduleNumber: schedules.length
                }).toString()
            })

        } else {

            data.schedule_id = selectedScheduleId

            let scheduleNumber = 0
            schedules.forEach((schedule, idx) => {
                if (schedule._id === selectedScheduleId) {
                    scheduleNumber = idx + 1
                    return
                }
            })

            const result = await apiHandler('POST', '/schedule/exercise/', data)
            if (result) dispatch(addExercise({ _id: selectedScheduleId, exercise: selectedExercise }))
            navigate({
                pathname: '/schedule',
                search: createSearchParams({
                    scheduleNumber: scheduleNumber
                }).toString()
            })

        }
    }

    return (
        <Modal
            isOpen={modal.showScheduleModal}
            placement="center-center"
            hideCloseButton={true}
            className="bg-gray-900"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-slate-300">
                            Add Exercise To...
                        </ModalHeader>
                        <ModalBody className='max-h-80 overflow-y-auto'>
                            <RadioGroup
                                value={selectedScheduleId}
                                onValueChange={setSelectedScheduleId}
                            >
                                {schedules.map(schedule => {
                                    return <CustomRadio value={schedule._id}>
                                        {schedule.name}
                                    </CustomRadio>
                                })}
                                <CustomRadio value='new_schedule'>
                                    <span className='text-success-800'>
                                        Schedule {schedules.length + 1} (New)
                                    </span>
                                </CustomRadio>
                            </RadioGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant='bordered' onClick={() => dispatch(showScheduleModal(false))}>
                                Cancel
                            </Button>
                            {selectedScheduleId &&
                                <Button color="primary" onClick={saveSchedule}>
                                    Save
                                </Button>
                            }
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ScheduleModal