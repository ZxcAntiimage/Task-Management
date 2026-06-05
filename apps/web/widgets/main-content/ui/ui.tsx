"use client"

import { RootState } from "@/features/store/store";
import { DetailCard } from "@/widgets/detailCard";
import { Mentors } from "@/widgets/Mentors";
import { Message } from "@/widgets/Message";
import { Overview } from "@/widgets/Overview";
import { Settings } from "@/widgets/Settings";
import { Tasks } from "@/widgets/Tasks";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function MainContent() {

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const routerActiveTab = useSelector((state: RootState) => state.router.activeTab) || "overview";

    if (!isClient) {
        return <Overview />;
    }
    const currentActiveTab = routerActiveTab.toLowerCase();

    switch (currentActiveTab) {
        case "overview":
            return <Overview />;
        case "tasks":
            return <Tasks />;
        case "mentors":
            return <Mentors />;
        case "message":
            return <Message />;
        case "settings":
            return <Settings />;
        case "detailcard":
            return <DetailCard />;
        default:
            return <Overview />;
    }
}
