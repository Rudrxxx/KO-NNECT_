"use client"

import { useThree } from "@react-three/fiber"
import { useEffect } from "react"

function CameraRig() {
  const { camera } = useThree()

  useEffect(() => {
    // Position the camera at a good viewing angle for the train
    camera.position.set(0, 2, 8)
    camera.lookAt(0, 0, 0)
  }, [camera])

  return null
}

export default CameraRig
