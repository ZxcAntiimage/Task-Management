"use client"
import { MENTORS } from "@/features/store/data/databaseMentors";
import { ic2People, icAllTasks, icDetail1, icStar, icTick, icTime } from "@/shared/api";
import { ActivityChart } from "@/widgets/ActivityChart";
import { Notifications } from "@/widgets/notifications";
import { PieChart } from "@/widgets/PieCart";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardAction, CardFooter } from "@workspace/ui/components/card";
import { NativeSelect, NativeSelectOption } from "@workspace/ui/components/native-select";
import { Pagination, PaginationContent, PaginationItem } from "@workspace/ui/components/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { CardTask } from "@/widgets/cardTask";
import { ALL_TASKS } from "@/features/store/data/databaseTasks";
import { DataPicker } from "@/widgets/dataPicker";
import { Slider } from "@workspace/ui/components/slider";
import { updateProgress, selectTask, initTask } from "@/features/store/tasks/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/features/store/store";
import { useTranslation } from "react-i18next";

export default function Overview() {
    const { t } = useTranslation();
    const [recentPage, setRecentPage] = useState(1);
    const recentPerPage = 2;
    const totalRecentPages = Math.ceil(MENTORS.length / recentPerPage);
    const recentVisible = MENTORS.slice((recentPage - 1) * recentPerPage, recentPage * recentPerPage);
    const [pageFirstBlock, setPageFirstBlock] = useState(1);
    const [followedIds, setFollowedIds] = useState<string[]>(["2", "6", "8"]);
    const startIndexFirst = (pageFirstBlock - 1) * 2;
    const visibleTasksFirst = ALL_TASKS.slice(startIndexFirst, startIndexFirst + 2);
    const dispatch = useDispatch();

    const totalTaskPages = Math.ceil(ALL_TASKS.length / 2);

    const selectedTask = ALL_TASKS.find(task => task.id === "1");

    const taskState = useSelector((state: RootState) => state.task);
    const selectedTaskId = taskState.selectedTaskId;
    const currentTaskData = selectedTaskId ? taskState.tasks[selectedTaskId] : null;

    useEffect(() => {
        if (selectedTask) {
            dispatch(initTask({
                id: selectedTask.id,
                title: selectedTask.title,
                progressNum: selectedTask.progressNum,
                progressName: selectedTask.progressName
            }));
            dispatch(selectTask(selectedTask.id));
        }
    }, [dispatch, selectedTask]); 

    const currentProgressNum = currentTaskData?.progressNum ?? selectedTask?.progressNum ?? 0;
    const currentProgressName = currentTaskData?.progressName ?? selectedTask?.progressName ?? "";
    const currentTitle = currentTaskData?.title ?? selectedTask?.title ?? "";

    const handleChange = (values: number[]) => {
        const newValue = values[0] ?? 0;
        if (selectedTask) {
            dispatch(updateProgress({
                id: selectedTask.id,
                value: newValue
            }));
        }
    };

    const handleFollowToggle = (mentorId: string) => {
        setFollowedIds(prev =>
            prev.includes(mentorId) ? prev.filter(id => id !== mentorId) : [...prev, mentorId]
        );
    };

    const listItems = [
        "Understanding the tools in Figma",
        "Understand the basics of making designs",
        "Designing a mobile application using figma",
        "Presenting the design flow"
    ];

    return (
        <>
            <div className="bg-[#F0F0F0] w-full min-h-screen overflow-x-hidden p-0 m-0">
                <header className="p-4 sm:p-8 bg-white w-full flex flex-row justify-between items-center border-b border-[#F0F0F0] flex-wrap gap-4">
                    <h1 className="text-xl sm:text-2xl text-[#141522] flex flex-col font-semibold leading-[150%] tracking-[-3%]">
                        <span>{t("overview.hiUser")}</span>
                        <span className="text-[#54577A] text-sm sm:text-[16px] mt-2">{t("overview.letsFinish")}</span>
                    </h1>
                    <div className="flex flex-row items-center gap-4 sm:gap-6">
                        <Notifications />
                        <Avatar className="w-10 h-10 sm:w-13 sm:h-13">
                            <AvatarFallback>US</AvatarFallback>
                        </Avatar>
                    </div>
                </header>
                <div className="flex flex-col xl:flex-row justify-between">
                    <main className="w-full xl:max-w-172 h-full bg-[#F0F0F0] p-4 sm:p-8">
                        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-8">
                            <div className="flex flex-col bg-[#141522] max-w-full lg:max-w-48.5 w-full h-auto p-5 rounded-[10px]">
                                <span className="text-white text-sm sm:text-[16px] font-semibold leading-[150%] tracking-[-2%] mb-4">{t("overview.runningTask")}</span>
                                <span className="text-white text-2xl sm:text-[32px] font-semibold leading-[150%] tracking-[-2%] mb-4">65</span>
                                <div className="flex flex-row items-center gap-4.5">
                                    <PieChart value={45} size={68} showText={true} />
                                    <div className="flex flex-col">
                                        <span className="text-white text-lg sm:text-[20px] font-semibold leading-[150%] tracking-[-2%]">100</span>
                                        <span className="text-[#8E92BC] text-xs sm:text-sm font-semibold leading-[150%] tracking-[-2%]">{t("overview.task")}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full max-w-full lg:max-w-115.5 bg-[#F5F5F7] rounded-[14px] p-5 flex-1 flex flex-col items-center justify-center">
                                <div className="flex flex-row items-center justify-between w-full">
                                    <span className="text-[#141522] text-sm sm:text-[16px] font-semibold leading-[150%] tracking-[-2%]">{t("overview.activity")}</span>
                                    <NativeSelect className="text-[#141522]">
                                        <NativeSelectOption value={""} className="text-[#141522] text-[10px] sm:text-[12px] font-medium tracking-[-2%]">{t("overview.thisWeek")}</NativeSelectOption>
                                    </NativeSelect>
                                </div>
                                <div className="bg-white rounded-[10px] mt-5 w-full overflow-x-auto">
                                    <ActivityChart />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="flex flex-row items-center justify-between mb-6 flex-wrap gap-4">
                                <span className="text-[#141522] text-xl sm:text-2xl font-bold tracking-[-2%]">{t("overview.monthlyMentors")}</span>
                                <Pagination className="w-auto m-0">
                                    <PaginationContent className="flex flex-row gap-2">
                                        <PaginationItem>
                                            <Button
                                                variant="ghost"
                                                onClick={() => recentPage > 1 && setRecentPage(p => p - 1)}
                                                disabled={recentPage === 1}
                                                className="w-6 h-6 sm:w-8 sm:h-8 p-0 flex items-center justify-center rounded-lg hover:bg-black/5 disabled:opacity-30"
                                            >
                                                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#54577A]" />
                                            </Button>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <Button
                                                variant="ghost"
                                                onClick={() => recentPage < totalRecentPages && setRecentPage(p => p + 1)}
                                                disabled={recentPage === totalRecentPages}
                                                className="w-6 h-6 sm:w-8 sm:h-8 p-0 flex items-center justify-center rounded-lg hover:bg-black/5 disabled:opacity-30"
                                            >
                                                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#54577A]" />
                                            </Button>
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                            <div className="flex flex-col lg:flex-row gap-8 w-full">
                                {recentVisible.map((mentor) => {
                                    const isFollowed = followedIds.includes(mentor.id);
                                    return (
                                        <Card key={`recent-${mentor.id}`} className="w-full lg:w-82 lg:min-w-82 max-w-82 bg-white rounded-[20px] p-4 sm:p-6 flex flex-col gap-5 border-none shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                                            <div className="flex flex-row items-center justify-between w-full">
                                                <CardContent className="flex flex-row items-center gap-3 p-0">
                                                    <Image src={mentor.avatar || ""} alt={mentor.name} loading="lazy" width={48} height={48} className="rounded-full object-cover shrink-0 w-10 h-10 sm:w-12 sm:h-12" />
                                                    <div className="flex flex-col">
                                                        <span className="text-[#141522] text-sm sm:text-base font-bold tracking-[-2%] truncate max-w-24 sm:max-w-32.5">{mentor.name}</span>
                                                        <span className="text-[#8E92BC] text-[10px] sm:text-[12px] font-medium tracking-[-1%] truncate max-w-24 sm:max-w-32.5">{mentor.position}</span>
                                                    </div>
                                                </CardContent>
                                                <CardAction onClick={() => handleFollowToggle(mentor.id)} className="cursor-pointer p-0 select-none shrink-0">
                                                    <span className={`text-xs sm:text-sm font-semibold tracking-[-2%] ${isFollowed ? "text-[#54577A]" : "text-[#546FFF]"}`}>
                                                        {isFollowed ? t("common.followed") : `+ ${t("common.follow")}`}
                                                    </span>
                                                </CardAction>
                                            </div>
                                            <CardFooter className="flex flex-row items-center justify-between p-0 pb-6 border-t bg-white border-[#F5F5F7] pt-4">
                                                <div className="flex flex-row items-center gap-2">
                                                    <Image src={icAllTasks} alt="tasks" loading="lazy" className="w-4 h-4 sm:w-5 sm:h-5" />
                                                    <span className="text-[#141522] text-xs sm:text-sm font-semibold tracking-[-2%]">{mentor.totalTask} {t("common.tasks")}</span>
                                                </div>
                                                <div className="flex flex-row items-center gap-1.5">
                                                    <Image src={icStar} alt="rating" loading="lazy" className="w-4 h-4 sm:w-5 sm:h-5" />
                                                    <span className="text-[#141522] text-xs sm:text-sm font-bold tracking-[-2%]">{mentor.rating}</span>
                                                    <span className="text-[#8E92BC] text-xs sm:text-sm font-medium">({mentor.reviews} {t("common.reviews")})</span>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="flex flex-row items-center justify-between mb-6 flex-wrap gap-4">
                                <span className="text-[#141522] text-xl sm:text-2xl font-bold tracking-[-2%]">{t("overview.upcomingTask")}</span>
                                <Pagination className="w-auto m-0">
                                    <PaginationContent className="flex flex-row gap-2">
                                        <PaginationItem>
                                            <Button
                                                variant="ghost"
                                                onClick={() => pageFirstBlock > 1 && setPageFirstBlock(p => p - 1)}
                                                disabled={pageFirstBlock === 1}
                                                className="w-6 h-6 sm:w-8 sm:h-8 p-0 flex items-center justify-center rounded-lg hover:bg-black/5 disabled:opacity-30"
                                            >
                                                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#54577A]" />
                                            </Button>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <Button
                                                variant="ghost"
                                                onClick={() => pageFirstBlock < totalTaskPages && setPageFirstBlock(p => p + 1)}
                                                disabled={pageFirstBlock === totalTaskPages}
                                                className="w-6 h-6 sm:w-8 sm:h-8 p-0 flex items-center justify-center rounded-lg hover:bg-black/5 disabled:opacity-30"
                                            >
                                                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#54577A]" />
                                            </Button>
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                            <div className="flex flex-col lg:flex-row gap-8 w-full mb-8">
                                {visibleTasksFirst.map((task) => (
                                    <CardTask
                                        key={`first-${task.id}`}
                                        id={task.id}
                                        progressName={task.progressName}
                                        progressNum={task.progressNum}
                                        time={task.time}
                                        title={task.title}
                                    />
                                ))}
                            </div>
                        </div>
                    </main>
                    <aside className="p-4 sm:p-8 flex flex-col">
                        <DataPicker />
                        {selectedTask && (
                            <div className="mt-8 w-full max-w-full lg:max-w-93">
                                <div className="flex flex-row items-center justify-between">
                                    <div className="flex flex-col bg-white rounded-[10px] p-4 sm:p-6 w-full">
                                        <Image className="w-full h-auto max-w-81 mb-6" src={icDetail1} alt="" loading="lazy" />
                                        <div className="px-0 sm:px-6">
                                            <h1 className="text-sm sm:text-[16px] text-[#141522] font-semibold tracking-[-3%] leading-[150%] mb-4">
                                                {currentTitle}
                                            </h1>
                                            <div className="flex flex-row items-center gap-5 mb-4">
                                                <span className="text-[#54577A] text-[10px] sm:text-[12px] font-medium tracking-[-2%] leading-[150%]">
                                                    UI UX Design . Apps Design
                                                </span>
                                            </div>
                                            <div className="flex flex-col w-full mb-8">
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
                                                    className="mb-4"
                                                />
                                                <div className="flex flex-row items-center gap-[2.5px]">
                                                    <Image width={16} height={16} src={icTime} alt="" loading="lazy" className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    <span className="text-[#141522] text-xs sm:text-sm font-medium tracking-[-2%] leading-[150%]">
                                                        {selectedTask.time}
                                                    </span>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-sm sm:text-[16px] text-[#141522] font-semibold tracking-[-3%] leading-[150%] mb-4">{t("overview.detailTask")}</p>
                                                {listItems.map((item, index) => (
                                                    <div key={index} className="flex flex-row items-center gap-2.5 my-5">
                                                        <Image src={icTick} alt="" loading="lazy" className="w-4 h-4 sm:w-auto sm:h-auto" />
                                                        <p className="text-[#141522] text-xs sm:text-sm font-medium tracking-[-2%] leading-[150%]">{item}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </>
    );
}