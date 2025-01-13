// DeviceDetector.js
import { useState, useEffect } from 'react'

export const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent
    const mobile = Boolean(
      userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
    )
    setIsMobile(mobile)
  }, [])

  return { isMobile }
}
