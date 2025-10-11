'use client'

import React from 'react'

interface TimelineIconProps {
  size?: number
  className?: string
}

export function TimelineIcon({ size = 48, className = "" }: TimelineIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top left circle */}
      <circle 
        cx="12" 
        cy="12" 
        r="4" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        fill="none"
      />
      
      {/* Top right circle */}
      <circle 
        cx="36" 
        cy="12" 
        r="4" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        fill="none"
      />
      
      {/* Bottom center circle */}
      <circle 
        cx="24" 
        cy="36" 
        r="4" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        fill="none"
      />
      
      {/* Horizontal line connecting top circles */}
      <line 
        x1="16" 
        y1="12" 
        x2="32" 
        y2="12" 
        stroke="currentColor" 
        strokeWidth="2.5"
      />
      
      {/* Vertical line from center of horizontal line to bottom circle */}
      <line 
        x1="24" 
        y1="12" 
        x2="24" 
        y2="32" 
        stroke="currentColor" 
        strokeWidth="2.5"
      />
      
      {/* Vertical lines from top circles down to horizontal line */}
      <line 
        x1="12" 
        y1="16" 
        x2="12" 
        y2="20" 
        stroke="currentColor" 
        strokeWidth="2.5"
      />
      
      <line 
        x1="36" 
        y1="16" 
        x2="36" 
        y2="20" 
        stroke="currentColor" 
        strokeWidth="2.5"
      />
      
      {/* Extended horizontal line to connect with vertical lines */}
      <line 
        x1="12" 
        y1="20" 
        x2="36" 
        y2="20" 
        stroke="currentColor" 
        strokeWidth="2.5"
      />
    </svg>
  )
}