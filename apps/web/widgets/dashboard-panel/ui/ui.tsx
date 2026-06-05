"use client"
import { changeTab } from "@/features/router/router";
import { icMentors, icMessage, icOverview, icSettings, icTasks, Logo } from "@/shared/api";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

export default function DashboardPanel(){
    const dispatch = useDispatch()
    const { t } = useTranslation();

    const menuItems = [
        { key: "Overview", icon: icOverview, label: t("navigation.overview") },
        { key: "Tasks", icon: icTasks, label: t("navigation.tasks") },
        { key: "Mentors", icon: icMentors, label: t("navigation.mentors") },
        { key: "Message", icon: icMessage, label: t("navigation.message") },
        { key: "Settings", icon: icSettings, label: t("navigation.settings") }
    ];

    return(
        <div className="p-8 bg-white w-63 h-full flex flex-col">
            <div className="flex flex-row gap-3">
                <Image loading="lazy" src={Logo} alt="logo" />
                <h1 className="text-[#141522] font-semibold text-[32px] leading-[150%] tracking-[-3%]">Nuegas</h1>
            </div>
            <ul className="flex flex-col items-center gap-6 mt-15">
                {menuItems.map((item) => (
                    <li key={item.key}>
                        <Button 
                            onClick={() => dispatch(changeTab(item.key))} 
                            className="w-47 h-11 px-5 py-2.5 flex flex-row justify-start gap-3 bg-white active:bg-[#F5F5F7] active:text-[#141522]"
                        >
                            <Image src={item.icon} alt="" loading="lazy" />
                            <p className="text-[14px] text-[#8E92BC] font-semibold leading-[150%] tracking-[-2%]">
                                {item.label}
                            </p>
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    )
}