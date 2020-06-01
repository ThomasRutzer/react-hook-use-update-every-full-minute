import { useState, useEffect } from 'react'

const useUpdateEveryFullMinute = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [updateInterval, setUpdateInterval] = useState((60 - currentTime.getSeconds()) * 1000)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())

      if (updateInterval < 60000) {
        setUpdateInterval(60000)
      }
    }, updateInterval)

    return () => clearInterval(interval)
  }, [updateInterval])

  return currentTime
}

export default useUpdateEveryFullMinute
