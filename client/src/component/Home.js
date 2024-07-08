import React, { useEffect, useState } from 'react'
import ExerciseCard from '../ui/ExerciseCard'
import apiHandler from '../api/apiHandler'
import { useSelector, useDispatch } from "react-redux"
import { Spinner, Input } from "@nextui-org/react"
import { setExercises } from '../action/exercise'
import { FaSearch } from "react-icons/fa";

const Home = () => {

    const dispatch = useDispatch()

    const authState = useSelector(state => state.auth)
    const exerciseState = useSelector(state => state.exercise)
    const { exercises } = exerciseState
    const [searchInput, setSearchInput] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const myTimeout = setTimeout(async () => {
            setIsLoading(true)
            const exerciseList = await apiHandler('GET', `/exercise?search=${searchInput}`)
            setIsLoading(false)
            if (exerciseList) dispatch(setExercises(exerciseList))
        }, 1000)
        return () => {
            clearInterval(myTimeout)
        }
    }, [searchInput])

    return (
        <>
            <div>
                <Input
                    className='w-64 mx-auto my-4'
                    type="text"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    placeholder=" search"
                    labelPlacement="outside"
                    endContent={
                        <FaSearch />
                    }
                />
            </div>
            {
                isLoading
                    ? <div className='h-full w-full flex items-center justify-center'><Spinner color="primary" size='lg' /></div>
                    : exercises.length > 0
                        ? <div className='flex flex-wrap justify-evenly'>
                            {
                                exercises.map(exercise => <ExerciseCard exercise={exercise}></ExerciseCard>)
                            }
                        </div>
                        : <p className='text-center font-semibold my-5'>No exercise found</p>
            }
        </>
    )
}

export default Home