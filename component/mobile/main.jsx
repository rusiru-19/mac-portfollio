import React from 'react'
import Image from 'next/image'
function Mobile() {
  return (
    <div>
            <Image
              src="/images/bg.svg"
              alt="Wallpaper"
              fill
              priority
              className="object-cover"
            />
    </div>
  )
}

export default Mobile