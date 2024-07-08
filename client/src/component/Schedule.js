import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Tabs, Tab } from "@nextui-org/react"
import ScheduleExerciseCard from '../ui/ScheduleExerciseCard'
import apiHandler from '../api/apiHandler'
import { setActiveSchedule, updatedSchedule } from '../action/exercise'
import { showExercisePlayerModal } from '../action/modal'
import { FaPlay } from "react-icons/fa";

const Schedule = () => {

  const [selected, setSelected] = useState('1')

  const dispatch = useDispatch()
  const Exercise = useSelector(state => state.exercise)
  const schedules = Exercise.schedules

  const handleIntervalInfo = async (exerciseId, key, value) => {
    const intervalInfo = { scheduleId: schedules[selected - 1]._id, exerciseId, key, value }
    const res = await apiHandler('POST', '/schedule/exercise/interval', intervalInfo)
    dispatch(updatedSchedule(res))
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const scheduleNumber = urlParams.get('scheduleNumber')
    setSelected(prev => scheduleNumber ? scheduleNumber : 1)
  }, [setSelected])

  return (
    <div className='pb-3 flex justify-center flex-col'>
      {schedules.length > 0 &&
        <>
          <div className='overflow-x-auto pb-2 my-0 mx-auto'>
            <Tabs
              aria-label="Options"
              selectedKey={selected}
              onSelectionChange={setSelected}
              className='mb-4 mt-6'
            >
              {schedules.map((schedule, idx) => <Tab key={idx + 1} title={schedule.name}></Tab>)}
            </Tabs>
          </div>
          {schedules[selected - 1].exercises.map(exercise => <ScheduleExerciseCard exercise={exercise} handleIntervalInfo={handleIntervalInfo} />)}
        </>
      }
      <div
        className='cursor-pointer translate-x-[-50%] rounded-t-full sm:rounded-full sticky bottom-4 left-[50%] w-14 h-14
        bg-blue-500 text-white z-40 flex items-center justify-center m-4'
        onClick={() => {
          dispatch(showExercisePlayerModal(true))
          dispatch(setActiveSchedule(schedules[selected - 1])
          )
        }}
      >
        <span className='translate-y-[-50%] sm:translate-y-0' ><FaPlay /></span>
      </div>
    </div>
  )
}

export default Schedule