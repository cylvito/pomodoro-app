"use client";
import useTimer from "@/app/hooks/use-timer";

export default function Timer() {
  const {
    mode,
    timeLeft,
    toggleTimer,
    isActive,
    resetTimer,
    switchMode,
    sessions,
  } = useTimer();
  console.log(mode);
  // Time format MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="max-w-sm bg-white shadow-xl w-full p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium capitalize">
          {mode === "focus" ? "Focus Time" : "Breakie Time"}
        </h2>
        <div className="text-sm text-gray-500"> Sessions: {sessions} </div>
      </div>
      <div
        className={`text-center text-6xl font-bold mb-6 ${
          mode === "focus" ? "text-red-500" : "text-green-500"
        }`}
      >
        {formattedTime}
      </div>
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={toggleTimer}
          className={`${ isActive ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"} px-5 py-2 rounded-lg text-white`}
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="bg-grey-200 hover:bg-grey-300 px-5 py-2 rounded-lg text-grey"
        >
          Reset
        </button>
      </div>
      <button
        onClick={switchMode}
        className="w-full bg-gray-100 hover:bg-gray-200 rounded-lg text-grey py-2"
      >
        {mode === "focus" ? "Switch to Break" : "Switch to Focus"}{" "}
      </button>
    </div>
  );
}
