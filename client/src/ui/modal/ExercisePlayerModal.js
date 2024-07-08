import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, } from 'react-redux'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Image,
    Accordion,
    AccordionItem,
    Button
} from "@nextui-org/react"
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { showExercisePlayerModal } from '../../action/modal'

const ExercisePlayerModal = () => {

    // Redux state
    const ModalState = useSelector(state => state.modal)
    const Exercise = useSelector(state => state.exercise)

    // Action handler
    const dispatch = useDispatch()

    // State variables
    const [index, setIndex] = useState(0)
    const [isWorkoutStarted, setIsWorkoutStarted] = useState(false)
    const [isWorkoutEnded, setIsWorkoutEnded] = useState(false)
    const [hold, setHold] = useState(10)
    const [set, setSet] = useState(20)
    const [rep, setRep] = useState(20)
    const [preference, setPreference] = useState('hold')
    const [isTimerActive, setIsTimerActive] = useState(false)

    const exercises = Exercise.activeSchedule.exercises

    // Methods
    const onExerciseComplete = () => {
        if (index + 1 < exercises.length) {
            setIndex(index => index + 1)
        } else {
            setIsWorkoutEnded(true)
            setIsTimerActive(false)
            setTimeout(() => {
                dispatch(showExercisePlayerModal(false))
            }, 2000);
        }
        return { shouldRepeat: true, delay: 0 }
    }

    // Hooks
    useEffect(() => {
        setIsTimerActive(isWorkoutStarted)
    }, [isWorkoutStarted])

    useEffect(() => {
        // Update interval (hold, set, rep) info on each exercise completion
        if (exercises && exercises.length > 0) {
            console.log('Next exercise')
            const interval = exercises[index].interval
            if (interval) {
                setPreference(interval.preference)
                setHold(hold => interval.hold ? interval.hold : 20)
                setSet(set => interval.set ? interval.set : 20)
                setRep(rep => interval.rep ? interval.rep : 4)
            } else {
                setPreference('set')
                setSet(20)
                setRep(4)
            }
        }
    }, [exercises, index])

    return (
        <Modal
            isOpen={ModalState.showExercisePlayerModal}
            placement="center-center"
            className="bg-slate-100 mt-10"
            hideCloseButton={true}
            size="lg"
        >
            <ModalContent className='relative'>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <p className='text-center'>{exercises[index].name}</p>
                        </ModalHeader>
                        <ModalBody>

                            <div className="flex justify-center items-center flex-col">
                                <Image
                                    className='mb-4'
                                    width={200}
                                    alt="NextUI hero Image"
                                    src={exercises[index].gifUrl}
                                />
                                <div className='flex items-center gap-6'>
                                    <CountdownCircleTimer
                                        size={100}
                                        isPlaying={(preference === 'hold' ? true : false) && isTimerActive}
                                        duration={(preference === 'hold') ? hold : set}
                                        colors={['#0594f5', '#A30000', '#A30000']}
                                        strokeWidth={5}
                                        colorsTime={[1, 0]}
                                        onComplete={onExerciseComplete}
                                    >
                                        {({ remainingTime }) => (preference === 'hold') ? remainingTime : `${set} X ${rep}`}
                                    </CountdownCircleTimer>
                                    {preference !== 'hold' &&
                                        <Button
                                            color="primary"
                                            className='rounded-sm'
                                            onClick={onExerciseComplete}>
                                            Next
                                        </Button>
                                    }
                                </div>
                            </div>
                            <Accordion
                                isCompact
                            >
                                <AccordionItem key="1" aria-label="Instructions" title="Instructions">
                                    {exercises[index].instructions.map(instruction => (
                                        <p>{instruction}</p>
                                    ))}
                                </AccordionItem>
                            </Accordion>

                            {/* {JSON.stringify(exercises[index])} */}
                            {isWorkoutEnded}
                        </ModalBody>
                        {
                            (!isWorkoutStarted || isWorkoutEnded) &&
                            <div className="absolute left-0 right-0 top-0 bottom-0 z-50 flex justify-center items-center">
                                <div className="absolute left-0 right-0 top-0 bottom-0 bg-gray-100 opacity-90"></div>
                                {
                                    isWorkoutEnded
                                        ? <div className='text-black opacity-100 z-10'>
                                            <h3>Congrations!!!</h3>
                                            <p>You have completed workout successfully</p>
                                        </div>
                                        : <>
                                            <Button
                                                size="lg"
                                                color="primary"
                                                className='h-28 w-28 rounded-full z-10'
                                                onClick={() => { setIsWorkoutStarted(true) }}>
                                                S T A R T
                                            </Button>
                                            <Button
                                                size="lg"
                                                color="danger"
                                                className='ml-5 h-16 w-16 rounded-full z-10'
                                                onClick={() => { dispatch(showExercisePlayerModal(false)) }}>
                                                C A N C E L
                                            </Button></>
                                }
                            </div>
                        }
                    </>
                )}
            </ModalContent>
        </Modal >
    )
}

export default ExercisePlayerModal