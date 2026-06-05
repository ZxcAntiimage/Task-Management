"use client"
import { MainPage } from "@/pages/Main"
import { MainContent } from "@/widgets/main-content"

export default function Page() {
  return (
    <div className="flex flex-row h-screen w-screen">
      <MainPage/>
      <MainContent/>
    </div>
  )
}
