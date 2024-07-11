import React from 'react'
import { Card, CardHeader, CardBody, Divider, Image, Chip } from "@nextui-org/react";
import { FaBolt, FaPlus } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux'
import { showScheduleModal } from '../action/modal'
import { setSelectedExercise } from '../action/exercise';

const ExerciseCard = (props) => {

    const { exercise } = props

    const authState = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleClick = () => {
        if (authState.isAuthenticated) {
            dispatch(setSelectedExercise(exercise))
            dispatch(showScheduleModal(true))
        }
    }

    const formatInstructions = () => {
        return <>
            {exercise.instructions[0].slice(0, 24)} ...&nbsp;&nbsp;
        </>
    }

    return (
        <Card className="max-w-[230px] md:max-w-[400px] w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 m-3">
            <CardHeader className="flex gap-3">
                <div className="flex flex-col w-full">
                    <div className="text-md mb-1 flex items-baseline justify-between">
                        <p className='pr-2'>{exercise.name}</p>
                        <FaPlus onClick={handleClick} className='text-default-500 cursor-pointer hover:bg-slate-300' />
                    </div>
                    <div className="flex w-full overflow-x-auto pb-1">
                        <Chip color="success" size='sm' className='mr-1'><p className="text-xs flex items-center justify-center font-mono">{exercise.target}</p></Chip>
                        {exercise.secondaryMuscles.map(muscle => <Chip color="secondary" size='sm' className='mr-1'><p className="text-xs flex items-center justify-center font-mono">{muscle}</p></Chip>)}
                    </div>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <Image
                    alt="nextui logo"
                    height={100}
                    radius="sm"
                    src={exercise.gifUrl}
                />
                <div className="flex items-center">
                    <FaBolt className='mr-1 text-slate-100 text-xs' />
                    <Chip color="secondary" size='sm' className='mr-1'><p className="text-xs flex items-center justify-center font-mono">{exercise.equipment}</p></Chip>
                </div>
                <p className='cursor-pointer text-small text-default-700 text-right mt-1'>{formatInstructions()}</p>
            </CardBody>
        </Card>
    )
}

export default ExerciseCard

// props
// {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://v2.exercisedb.io/image/UcvY9fRgNeiV4m",
//     "id": "0001",
//     "name": "3/4 sit-up",
//     "target": "abs",
//     "secondaryMuscles": [
//         "hip flexors",
//         "lower back"
//     ],
//     "instructions": [
//         "Lie flat on your back with your knees bent and feet flat on the ground.",
//         "Place your hands behind your head with your elbows pointing outwards.",
//         "Engaging your abs, slowly lift your upper body off the ground, curling forward until your torso is at a 45-degree angle.",
//         "Pause for a moment at the top, then slowly lower your upper body back down to the starting position.",
//         "Repeat for the desired number of repetitions."
//     ]
// }