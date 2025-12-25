"use client"
import  { useState , useEffect } from 'react'
import Desktop from '../component/desktop/main'
import Mobile from '../component/mobile/main'
export default function page() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    checkScreen(); 
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  return (
    <div >
      {isMobile ? <Mobile /> : <Desktop />}
    </div>
  )
}
