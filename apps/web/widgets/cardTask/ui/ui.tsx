import { useEffect, useState } from "react";
import { CardTaskProps } from "@/entities";
import { icDetail, icStudents, icTime } from "@/shared/api";
import { Card } from "@workspace/ui/components/card";
import Image from "next/image";
import { Slider } from "@workspace/ui/components/slider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/features/store/store";
import { initTask, selectTask, updateProgress } from "@/features/store/tasks/taskSlice";
import { changeTab } from "@/features/router/router";
import { useTranslation } from "react-i18next";

export default function CardTask({ id, time, title, progressNum: initialProgressNum, progressName: initialProgressName }: CardTaskProps) {
    const currentIcon = icDetail ? (icDetail as Record<string, any>)[id] : null;
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const taskData = useSelector((state: RootState) => state.task.tasks[id]);

    useEffect(() => {
        dispatch(initTask({
            id,
            title,
            progressNum: initialProgressNum,
            progressName: initialProgressName || `${initialProgressNum}%`
        }));
    }, [id, title, initialProgressNum, initialProgressName, dispatch]);

    const currentProgressNum = taskData ? taskData.progressNum : initialProgressNum;
    const currentProgressName = taskData ? taskData.progressName : (initialProgressName || `${initialProgressNum}%`);

    const handleChange = (values: number[]) => {
        const newValue = values[0] ?? 0;
        dispatch(updateProgress({ id, value: newValue }));
    };

    const handleCardClick = () => {
        dispatch(selectTask(id))
        dispatch(changeTab("DetailCard"))
    }

    return (
        <Card onClick={handleCardClick} className="bg-white w-full max-w-82 h-auto min-h-78.5 rounded-[10px] p-4 sm:p-6 shadow-sm flex flex-col justify-between hover:scale-95">
            <div>
                {currentIcon && (
                    <Image src={currentIcon} alt={`Task ${id}`} loading="lazy" className="w-8 h-8 sm:w-auto sm:h-auto" />
                )}
                <p className="mt-4 mb-1 text-[#141522] text-sm sm:text-base font-semibold leading-[150%] tracking-[-2%]">
                    {title}
                </p>
                <p className="text-[#54577A] mb-4 text-[10px] sm:text-[12px] font-medium tracking-[-2%]">
                    {t("tasks.uiUxDesign")} . {t("tasks.appsDesign")}
                </p>
                <div className="flex flex-row items-center justify-between mb-2">
                    <p className="text-[#141522] text-sm sm:text-base font-medium leading-[150%] tracking-[-2%]">{t("overview.progress")}</p>
                    <p className="text-[#546FFF] text-sm sm:text-base font-medium leading-[150%] tracking-[-2%]">
                        {currentProgressName}
                    </p>
                </div>
                <Slider 
                    value={[currentProgressNum]} 
                    max={100} 
                    step={1} 
                    onValueChange={handleChange} 
                    className="mb-4 bg-[#546FFF]"  
                />
            </div>
            <div className="flex flex-row items-center justify-between mt-4">
                <div className="flex flex-row items-center gap-2">
                    <Image src={icTime} alt="Time icon" loading="lazy" className="w-4 h-4 sm:w-auto sm:h-auto" />
                    <span className="text-[#141522] text-sm sm:text-base font-medium leading-[150%] tracking-[-2%]">{time}</span>
                </div>
                <Image src={icStudents} alt="Students icon" loading="lazy" className="w-4 h-4 sm:w-auto sm:h-auto" />
            </div>
        </Card>
    );
}