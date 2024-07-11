import React, { useState, useEffect } from 'react'
import { Card, Chip, CardHeader, Input } from "@nextui-org/react"
import { FaSyncAlt } from 'react-icons/fa';
import { updatedSchedule } from '../action/exercise';
import { useDispatch } from 'react-redux'

const ScheduleExerciseCard = (props) => {

    const { exercise, handleIntervalInfo } = props

    const dispatch = useDispatch()
    const [preference, setPreference] = useState(exercise.interval ? exercise.interval.preference : 'hold')
    const [hold, setHold] = useState(exercise.interval && exercise.interval.hold ? exercise.interval.hold : 20)
    const [set, setSet] = useState(exercise.interval && exercise.interval.set ? exercise.interval.set : 3)
    const [rep, setRep] = useState(exercise.interval && exercise.interval.rep ? exercise.interval.rep : 10)

    const handleChange = async (e) => {
        const { name, value } = e.target
        if (name === 'hold') {
            setHold(value)
        } else if (name === 'set') {
            setSet(value)
        } else if (name === 'rep') {
            setRep(value)
        }
    }

    const updateInterval = async (e)=>{
        const { name, value } = e.target
        const res = await handleIntervalInfo(exercise.id, name, value)
        dispatch(updatedSchedule(res))
    }

    useEffect(() => {
        setPreference(exercise.interval ? exercise.interval.preference : 'hold')
        setHold(exercise.interval && exercise.interval.hold ? exercise.interval.hold : 20)
        setSet(exercise.interval && exercise.interval.set ? exercise.interval.set : 3)
        setRep(exercise.interval && exercise.interval.rep ? exercise.interval.rep : 10)
    }, [exercise])

    return (
        <Card className="w-fit my-0 mx-auto mb-2 md:mb-3">
            <CardHeader className="flex flex-row">
                <div className="flex flex-col w-full mb-2 max-w-[500px]">
                    <div className="text-md mb-1 flex items-baseline justify-between">
                        <p className='pr-2'>{exercise.name}</p>
                    </div>
                    <div className="flex w-[60vw] overflow-x-auto pb-1">
                        <Chip color="success" size='sm' className='mr-1'><p className="text-xs flex items-center justify-center font-mono">{exercise.target}</p></Chip>
                        {exercise.secondaryMuscles.map(muscle => <Chip color="secondary" size='sm' className='mr-1'><p className="text-xs flex items-center justify-center font-mono">{muscle}</p></Chip>)}
                    </div>
                    <div className="flex mt-3 items-center">
                        <FaSyncAlt onClick={() => setPreference(prev => {
                            if (prev === 'hold') {
                                handleIntervalInfo(exercise.id, 'set', null)
                                return 'set'
                            } else {
                                handleIntervalInfo(exercise.id, 'hold', null)
                                return 'hold'
                            }
                        })} className='text-slate-400 cursor-pointer mr-2' />
                        {
                            preference === 'hold'
                                ? <Input value={hold} name='hold' onChange={handleChange} onBlur={updateInterval} endContent={<span className='text-slate-400 text-small'>sec</span>} className='w-28' color='primary' size='small' variant='bordered' type="number" label="Hold" labelPlacement='outside-left' />
                                :
                                <>
                                    <Input value={set} name='set' onChange={handleChange} onBlur={updateInterval} className='w-20' color='primary' size='small' type="number" variant='bordered' label="Set" labelPlacement='outside-left' />
                                    <Input value={rep} name='rep' onChange={handleChange} onBlur={updateInterval} className='w-20 ml-2' color='primary' size='small' variant='bordered' type="number" label="Rep" labelPlacement='outside-left' />
                                </>
                        }
                    </div>
                </div>

                <div className="flex-none pl-3 border-l-gray-300 border-l-2">
                    <img
                        alt="nextui logo"
                        width={100}
                        src={exercise.gifUrl}
                    />
                </div>
            </CardHeader>
        </Card>
    )
}

export default ScheduleExerciseCard