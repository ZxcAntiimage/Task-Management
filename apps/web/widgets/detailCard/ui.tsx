"use client"
import { ALL_TASKS } from "@/features/store/data/databaseTasks";
import { RootState } from "@/features/store/store";
import { ic2People, icCategory, icDetail, icSearch, icSort, icTick, icTime } from "@/shared/api";
import { Notifications } from "@/widgets/notifications";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { ButtonGroup } from "@workspace/ui/components/button-group";
import { DropdownMenu, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import { Input } from "@workspace/ui/components/input";
import { Separator } from "@workspace/ui/components/separator";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Table, TableBody, TableHead, TableRow } from "@workspace/ui/components/table";
import { FileUploader } from "@/widgets/FileUploader";
import { useTranslation } from "react-i18next";

export default function DetailCard() {
    const { t } = useTranslation();
    const selectedId = useSelector((state: RootState) => state.task.selectedTaskId);
    const ReduxTaskData = useSelector((state: RootState) => selectedId ? state.task.tasks[selectedId] : null);
    const StaticTaskData = ALL_TASKS.find(i => i.id === selectedId);

    if (!selectedId) {
        return <div className="p-4 sm:p-8 text-center">{t("detailCard.taskNotSelected")}</div>;
    }

    const title = ReduxTaskData?.title || StaticTaskData?.title;
    const time = StaticTaskData?.time;
    const currentIcon = icDetail && selectedId
        ? (icDetail as Record<string, any>)[selectedId]
        : null;

    const listItems = [
        t("detailCard.understandingFigma"),
        t("detailCard.basicsOfDesign"),
        t("detailCard.designingApp"),
        t("detailCard.presentingDesign")
    ];

    return (
        <div className="w-full min-h-screen bg-[#F0F0F0] flex flex-col overflow-x-hidden p-0 m-0">
            <header className="p-2 sm:p-4 md:p-6 lg:p-8 bg-white w-full border-b flex flex-col border-[#F0F0F0]">
                <div className="flex flex-row justify-between items-center flex-wrap gap-4">
                    <h1 className="text-xl sm:text-2xl text-[#141522] font-semibold leading-[150%] tracking-[-3%]">
                        {t("overview.title")}
                    </h1>
                    <div className="flex flex-row items-center gap-4 sm:gap-6">
                        <Notifications />
                        <Avatar className="w-10 h-10 sm:w-13 sm:h-13">
                            <AvatarFallback>US</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-6">
                    <ButtonGroup className="relative flex flex-col items-center w-full sm:w-120 h-13">
                        <Input className="text-[#54577A] text-[12px] w-full h-13 px-7 pr-12 py-3.5 border-[#54577A] border rounded-[10px]" id="input-button-group" placeholder={t("common.search")} />
                        <Image src={icSearch} alt="" loading="lazy" className="absolute right-3 top-3 w-5 h-5 sm:w-6 sm:h-6" />
                    </ButtonGroup>
                    <div className="flex flex-row items-center justify-end gap-4 sm:gap-6">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="flex flex-row items-center gap-3 px-4 sm:px-7 py-3.5 bg-white border border-[#8E92BC] w-auto h-13">
                                    <Image src={icCategory} alt="" loading="lazy" className="w-4 h-4 sm:w-auto sm:h-auto" />
                                    <p className="text-[10px] sm:text-[12px] text-[#141522] font-semibold leading-normal tracking-[-2%]">{t("common.category")}</p>
                                </Button>
                            </DropdownMenuTrigger>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="flex flex-row items-center gap-3 px-4 sm:px-7 py-3.5 bg-white border border-[#8E92BC] h-13 min-w-37 w-auto">
                                    <Image src={icSort} alt="" loading="lazy" className="w-4 h-4 sm:w-auto sm:h-auto" />
                                    <p className="text-[10px] sm:text-[12px] text-[#141522] font-semibold leading-normal tracking-[-2%]">{t("common.sortBy")}: <span>{t("common.deadline")}</span></p>
                                </Button>
                            </DropdownMenuTrigger>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            <main className="flex flex-col p-4 sm:p-8 w-full gap-8">
                {currentIcon && (
                    <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                        <div className="flex flex-col bg-white w-full lg:w-auto">
                            <Image className="w-full h-auto max-w-180 mb-6" src={currentIcon} alt="" loading="lazy" />
                            <div className="px-4 sm:px-6">
                                <h1 className="text-2xl sm:text-[32px] text-[#141522] font-semibold tracking-[-3%] leading-[150%] mb-4">{title}</h1>
                                <div className="flex flex-row flex-wrap items-center gap-3 sm:gap-5 mb-4 ">
                                    <span className="text-[#54577A] text-xs sm:text-sm font-medium tracking-[-2%] leading-[150%]">{t("tasks.uiUxDesign")} . {t("tasks.appsDesign")}</span>
                                    <Separator className="bg-[#DFDFDF]" orientation="vertical" />
                                    <span className="text-xs sm:text-sm text-[#04A4F4] font-medium tracking-[-2%] leading-[150%]">+ {t("detailCard.getMentors")}</span>
                                </div>
                                <div className="flex flex-row flex-wrap items-center gap-3 sm:gap-5 mb-8">
                                    <div className="flex flex-row items-center gap-[2.5px]">
                                        <Image width={16} height={16} src={ic2People} alt="" loading="lazy" />
                                        <span className="text-[#141522] text-xs sm:text-sm font-medium tracking-[-2%] leading-[150%]">200 {t("detailCard.studentsInvolved")}</span>
                                    </div>
                                    <div className="flex flex-row items-center gap-[2.5px]">
                                        <Image width={16} height={16} src={icTime} alt="" loading="lazy" />
                                        <span className="text-[#141522] text-xs sm:text-sm font-medium tracking-[-2%] leading-[150%]">{time}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full max-w-171 flex-wrap mb-6">
                                    <p className="text-2xl sm:text-[32px] text-[#141522] font-semibold tracking-[-3%] leading-[150%] mb-4">{t("overview.description")}</p>
                                    <span className="text-[#141522] text-xs sm:text-sm font-medium tracking-[-2%] leading-[150%]">
                                        {t("detailCard.descriptionText")}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-2xl sm:text-[32px] text-[#141522] font-semibold tracking-[-3%] leading-[150%] mb-4">{t("overview.essenceOfAssessment")}</p>
                                    {listItems.map((item, index) => (
                                        <ul key={index}>
                                            <li className="flex flex-row items-center gap-2.5 my-5">
                                                <Image src={icTick} alt="" loading="lazy" className="w-4 h-4 sm:w-auto sm:h-auto" />
                                                <p className="text-[#141522] text-xs sm:text-sm font-medium tracking-[-2%] leading-[150%]">{item}</p>
                                            </li>
                                        </ul>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <aside className="flex flex-col bg-white p-4 sm:p-6 w-full lg:max-w-93 lg:w-full h-auto">
                            <p className="text-[#141522] text-sm font-medium tracking-[-2%] leading-[150%] mb-6">{t("detailCard.assignedAssignments")}</p>
                            <h2 className="text-[#141522] text-xl sm:text-2xl font-semibold tracking-[-2%] leading-[150%] mb-3">{title}</h2>
                            <h3 className="text-[#54577A] text-xs sm:text-sm font-medium tracking-[-2%] leading-[150%] mb-6">{t("tasks.uiUxDesign")} . {t("tasks.appsDesign")}</h3>
                            <Table className="mb-6">
                                <TableBody>
                                    <TableRow>
                                        <TableHead className="text-[#54577A] text-xs sm:text-sm font-medium tracking-[-2%] leading-[150%]">{t("detailCard.studentsName")}</TableHead>
                                        <TableHead className="text-[#141522] text-xs sm:text-sm font-semibold tracking-[-2%] leading-[150%]">Skylar Dias</TableHead>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead className="text-[#54577A] text-xs sm:text-sm font-medium tracking-[-2%] leading-[150%]">{t("detailCard.studentClass")}</TableHead>
                                        <TableHead className="text-[#141522] text-xs sm:text-sm font-semibold tracking-[-2%] leading-[150%]">MIPA 2</TableHead>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead className="text-[#54577A] text-xs sm:text-sm font-medium tracking-[-2%] leading-[150%]">{t("detailCard.studentNumber")}</TableHead>
                                        <TableHead className="text-[#141522] text-xs sm:text-sm font-semibold tracking-[-2%] leading-[150%]">10</TableHead>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <div className="flex flex-col">
                                <p className="text-[#141522] text-lg sm:text-[20px] font-semibold tracking-[-2%] leading-[150%] mb-5">{t("detailCard.fileTask")}</p>
                                <div className="flex flex-row items-center justify-between mb-5 flex-wrap gap-2">
                                    <span className="text-[#54577A] text-xs sm:text-sm font-medium tracking-[-2%] leading-[150%]">{t("detailCard.lastModified")}</span>
                                    <span className="text-[#141522] text-xs sm:text-sm font-semibold tracking-[-2%] leading-[150%]">1 July 2022</span>
                                </div>
                                <div>
                                    <span className="text-[#54577A] text-xs sm:text-sm font-medium tracking-[-2%] leading-[150%] mb-4 block">{t("detailCard.fileSubmissions")}</span>
                                    <FileUploader />
                                    <span className="text-[#54577A] text-[10px] sm:text-[12px] font-medium tracking-[-2%] leading-[150%]">*{t("detailCard.dragOrBrowser")}</span>
                                </div>
                                <Button className="text-white bg-[#546FFF] w-full h-full max-w-81 max-h-11 mt-8 sm:mt-15">{t("common.submit")}</Button>
                            </div>
                        </aside>
                    </div>
                )}
            </main>
        </div>
    );
}