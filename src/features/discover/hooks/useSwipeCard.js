import { useMemo, useRef, useState } from 'react'

const SWIPE_THRESHOLD = 120

export function useSwipeCard({ onLike, onPass }) {
  const startXRef = useRef(0)
  const isDraggingRef = useRef(false)

  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isAnimatingBack, setIsAnimatingBack] = useState(false)
  const [exitDirection, setExitDirection] = useState(null)

  const resetCard = () => {
    setIsAnimatingBack(true)
    setPosition({ x: 0, y: 0 })

    window.setTimeout(() => {
      setIsAnimatingBack(false)
    }, 250)
  }

  const triggerSwipe = (direction) => {
    setExitDirection(direction)

    const targetX = direction === 'right' ? 600 : -600

    setPosition((prev) => ({
      x: targetX,
      y: prev.y,
    }))

    window.setTimeout(() => {
      if (direction === 'right') {
        onLike?.()
      } else {
        onPass?.()
      }

      setExitDirection(null)
      setIsAnimatingBack(false)
      setPosition({ x: 0, y: 0 })
    }, 220)
  }

  const handlePointerDown = (event) => {
    isDraggingRef.current = true
    setIsAnimatingBack(false)
    startXRef.current = event.clientX
  }

  const handlePointerMove = (event) => {
    if (!isDraggingRef.current) return

    const deltaX = event.clientX - startXRef.current

    setPosition({
      x: deltaX,
      y: Math.abs(deltaX) * 0.04,
    })
  }

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return

    isDraggingRef.current = false

    if (position.x > SWIPE_THRESHOLD) {
      triggerSwipe('right')
      return
    }

    if (position.x < -SWIPE_THRESHOLD) {
      triggerSwipe('left')
      return
    }

    resetCard()
  }

  const overlay = useMemo(() => {
    if (position.x > 20) {
      return {
        label: 'LIKE',
        align: 'left',
      }
    }

    if (position.x < -20) {
      return {
        label: 'PASS',
        align: 'right',
      }
    }

    return null
  }, [position.x])

  const rotation = position.x / 18

  const cardStyle = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0) rotate(${rotation}deg)`,
    transition: isDraggingRef.current
      ? 'none'
      : 'transform 220ms ease',
    touchAction: 'none',
  }

  return {
    cardStyle,
    overlay,
    exitDirection,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    triggerSwipe,
  }
}