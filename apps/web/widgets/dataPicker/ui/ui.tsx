"use client"

import React, { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

const DAYS_OF_WEEK = ["S", "M", "T", "W", "T", "F", "S"]

const MOCK_DAYS = [
  { id: 1, dayName: "S", dayNum: 10 },
  { id: 2, dayName: "M", dayNum: 11 },
  { id: 3, dayName: "T", dayNum: 12 },
  { id: 4, dayName: "W", dayNum: 13 },
  { id: 5, dayName: "T", dayNum: 14 }, 
  { id: 6, dayName: "F", dayNum: 15 },
  { id: 7, dayName: "S", dayNum: 16 },
]

export function DataPicker() {
  const [selectedDay, setSelectedDay] = useState<number>(14)

  return (
    <div className="w-full max-w-105 bg-white rounded-[20px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-none">
      

      <header className="flex flex-row items-center justify-between mb-6 px-2">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 rounded-lg hover:bg-black/5 text-[#54577A]"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <span className="text-[#141522] text-base font-semibold tracking-[-2%]">
          July 2022
        </span>
        
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 rounded-lg hover:bg-black/5 text-[#54577A]"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </header>

      <div className="grid grid-cols-7 gap-1 justify-items-center items-center">
        {MOCK_DAYS.map((day) => {
          const isSelected = day.dayNum === selectedDay

          return (
            <div
              key={day.id}
              onClick={() => setSelectedDay(day.dayNum)}
              className={`flex flex-col items-center justify-between cursor-pointer select-none transition-all duration-200
                ${isSelected 
                  ? "bg-[#141522] w-11 h-19 rounded-full py-2.5 text-white" 
                  : "w-11 h-19 py-2.5 text-[#141522]"
                }`}
            >
              {/* Буква дня недели (S, M, T...) */}
              <span 
                className={`text-xs font-medium tracking-wide
                  ${isSelected ? "text-white/90" : "text-[#141522]"}`}
              >
                {day.dayName}
              </span>

              {/* Число месяца */}
              {isSelected ? (
                // Синий закруглённый кружок для выбранного числа
                <div className="w-8 h-8 rounded-full bg-[#546FFF] flex items-center justify-center text-sm font-semibold text-white shadow-[0_4px_12px_rgba(84,111,255,0.24)]">
                  {day.dayNum}
                </div>
              ) : (
                // Обычная круглая подложка для остальных дней
                <div className="w-8 h-8 rounded-full bg-[#F5F5F7]/60 flex items-center justify-center text-sm font-medium hover:bg-[#F5F5F7]">
                  {day.dayNum}
                </div>
              )}
            </div>
          )
        })}
      </div>
      
    </div>
  )
}
