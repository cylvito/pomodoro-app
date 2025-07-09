'use client';
import { useActionState, useEffect, useState } from "react";
type TimerMode = "focus" | "break";
// Time to minutes
const focusTime = 25;
const breakTime = 5;

export default function useTimer() {
    const [mode, setMode] = useState<TimerMode>('focus');
    const [timeLeft, setTimeLeft] = useState(focusTime * 60);
    


    const toggleTimer = () => {

    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                return prev - 1;
            })
        }, 1000);

        return () => {
            if(interval) clearInterval(interval);
        }
    },[])
  
    return {
    mode,
    timeLeft,
  }
}
