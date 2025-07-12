'use client';
import { useActionState, useCallback, useEffect, useState } from "react";
type TimerMode = "focus" | "break";
// Time to minutes
const focusTime = 1;
const breakTime = 5;

export default function useTimer() {
    const [mode, setMode] = useState<TimerMode>('focus');
    const [timeLeft, setTimeLeft] = useState(focusTime * 60);
    const [isActive, setIsActive] =useState<boolean>(false);
    const [sessions, setSessions] =useState(0);

    const getDuration= useCallback((timerMode: TimerMode) => {
        return timerMode === "focus" ? focusTime * 60 : breakTime * 60;
    },[])

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(getDuration(mode))
        }

    const toggleTimer = () => {
        setIsActive(prev => !prev)

    }

    const switchMode = useCallback(() => {
        const newMode = mode === "focus" ? "break" : "focus";
        setMode(newMode);
        setTimeLeft(getDuration(newMode));
        setIsActive(false);

        // increment sesh
        if(mode === "focus") {
            setSessions((prev) => prev + 1)
        }
    }, [mode, getDuration])

    useEffect(() => {

        let interval: NodeJS.Timeout | null = null;

        if(isActive) {
            interval = setInterval(() => {
            setTimeLeft((prev) => {
                return prev - 1;
            })
        }, 1000);
        } else if(interval) {
            clearInterval(interval);
        }

        return () => {
            if(interval) clearInterval(interval);
        }
    },[isActive])

    useEffect(() => {
        if (timeLeft === 0) {
            switchMode();
        }
    }, [timeLeft, switchMode])
  
    return {
    mode,
    timeLeft,
    toggleTimer,
    isActive,
    resetTimer,
    switchMode,
    sessions
  }
}
