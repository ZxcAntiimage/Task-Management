"use client"

import { DashboardPanel } from "@/widgets/dashboard-panel";
import { MainContent } from "@/widgets/main-content";

export default function MainPage(){
    return(
        <div className="flex flex-row h-screen w-screen">
            <div>
                <DashboardPanel/>
            </div>
              <MainContent/>
        </div>
    )
}
