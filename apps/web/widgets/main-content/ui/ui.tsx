"use client"
import { RootState } from "@/features/store/store";
import { DetailCard } from "@/widgets/detailCard";
import { Mentors } from "@/widgets/Mentors";
import { Message } from "@/widgets/Message";
import { Overview } from "@/widgets/Overview";
import { Settings } from "@/widgets/Settings";
import { Tasks } from "@/widgets/Tasks";

import { useSelector } from "react-redux";

export default function MainContent(){
    const activeTab = useSelector((state: RootState) => state.router.activeTab)

    switch(activeTab){
        case "Overview":
            return <Overview/>
        case "Tasks":
            return <Tasks/>
        case "Mentors":
            return <Mentors/>
        case "Message":
            return <Message/>
        case "Settings":
            return <Settings/>
        case "DetailCard":
            return <DetailCard/>
        default:
            return <Overview/>
            
    }

}