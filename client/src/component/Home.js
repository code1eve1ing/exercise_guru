import React, { useEffect } from 'react'
import ExerciseCard from '../ui/ExerciseCard'
import apiHandler from '../api/apiHandler'
import { useSelector, useDispatch } from "react-redux"
import { Spinner } from "@nextui-org/react"
import { setExercises } from '../action/exercise'

const Home = () => {

    const dispatch = useDispatch()

    const authState = useSelector(state => state.auth)
    const exerciseState = useSelector(state => state.exercise)
    const { exercises } = exerciseState
    console.log(authState)

    useEffect(() => {
        async function getExercise() {
            const exerciseList = await apiHandler('GET', '/exercise')
            if (exerciseList) dispatch(setExercises(exerciseList))
        }
        if (exercises.length === 0) getExercise()
    }, [exercises, dispatch])

    return (
        <>
            {
                exercises.length > 0
                    ? <div className='flex flex-wrap justify-evenly'>
                        {
                            exercises.map(exercise => <ExerciseCard exercise={exercise}></ExerciseCard>)
                        }
                    </div>
                    : <div className='h-full w-full flex items-center justify-center'><Spinner color="secondary" size='lg' /></div>
            }
        </>
    )
}

export default Home