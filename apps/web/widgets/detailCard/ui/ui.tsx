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
        return <div className="p-8 text-center">{t("detailCard.taskNotSelected")}</div>;
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
        <div className="w-screen h-screen bg-[#F0F0F0] flex flex-col overflow-x-hidden p-0 m-0">
            <header className="p-8 bg-white w-full border-b flex flex-col border-[#F0F0F0]">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-2xl text-[#141522] font-semibold leading-[150%] tracking-[-3%]">
                        {t("overview.title")}
                    </h1>
                    <div className="flex flex-row items-center gap-6">
                        <Notifications />
                        <Avatar className="w-13 h-13">
                            <AvatarFallback>US</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between mt-6">
                    <ButtonGroup className="relative flex items-center w-120 h-13">
                        <Input className="text-[#54577A] text-[12px] w-120 h-13 px-7 pr-12 py-3.5 border-[#54577A] border rounded-[10px]" id="input-button-group" placeholder={t("common.search")} />
                        <Image src={icSearch} alt="" loading="lazy" className="absolute right-3 w-6 h-6" />
                    </ButtonGroup>
                    <div className="flex flex-row items-center gap-6">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="flex flex-row items-center gap-3 px-7 py-3.5 bg-white border border-[#8E92BC] w-37 h-13">
                                    <Image src={icCategory} alt="" loading="lazy" />
                                    <p className="text-[12px] text-[#141522] font-semibold leading-normal tracking-[-2%]">{t("common.category")}</p>
                                </Button>
                            </DropdownMenuTrigger>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="flex flex-row items-center gap-3 px-7 py-3.5 bg-white border border-[#8E92BC] h-13 min-w-37 w-49">
                                    <Image src={icSort} alt="" loading="lazy" />
                                    <p className="text-[12px] text-[#141522] font-semibold leading-normal tracking-[-2%]">{t("common.sortBy")}: <span>{t("common.deadline")}</span></p>
                                </Button>
                            </DropdownMenuTrigger>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            <main className="flex flex-col p-8 w-full gap-8">
                {currentIcon && (
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-col bg-white">
                            <Image className="w-180 h-90 mb-6" src={currentIcon} alt="" loading="lazy" />
                            <div className="px-6">
                                <h1 className="text-[32px] text-[#141522] font-semibold tracking-[-3%] leading-[150%] mb-4">{title}</h1>
                                <div className="flex flex-row items-center gap-5 mb-4 ">
                                    <span className="text-[#54577A] text-sm font-medium tracking-[-2%] leading-[150%]">{t("tasks.uiUxDesign")} . {t("tasks.appsDesign")}</span>
                                    <Separator className="bg-[#DFDFDF]" orientation="vertical" />
                                    <span className="text-sm text-[#04A4F4] font-medium tracking-[-2%] leading-[150%]">+ {t("detailCard.getMentors")}</span>
                                </div>
                                <div className="flex flex-row items-center gap-5 mb-8">
                                    <div className="flex flex-row items-center gap-[2.5px]">
                                        <Image width={16} height={16} src={ic2People} alt="" loading="lazy" />
                                        <span className="text-[#141522] text-sm font-medium tracking-[-2%] leading-[150%]">200 {t("detailCard.studentsInvolved")}</span>
                                    </div>
                                    <div className="flex flex-row items-center gap-[2.5px]">
                                        <Image width={16} height={16} src={icTime} alt="" loading="lazy" />
                                        <span className="text-[#141522] text-sm font-medium tracking-[-2%] leading-[150%]">{time}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full max-w-171 flex-wrap mb-6">
                                    <p className="text-[32px] text-[#141522] font-semibold tracking-[-3%] leading-[150%] mb-4">{t("overview.description")}</p>
                                    <span className="text-[#141522] text-sm font-medium tracking-[-2%] leading-[150%]">
                                        {t("detailCard.descriptionText")}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[32px] text-[#141522] font-semibold tracking-[-3%] leading-[150%] mb-4">{t("overview.essenceOfAssessment")}</p>
                                    {listItems.map((item, index) => (
                                        <ul key={index}>
                                            <li className="flex flex-row items-center gap-2.5 my-5">
                                                <Image src={icTick} alt="" loading="lazy" />
                                                <p className="text-[#141522] text-sm font-medium tracking-[-2%] leading-[150%]">{item}</p>
                                            </li>
                                        </ul>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <aside className="flex flex-col bg-white p-6 max-w-93 max-h-203 w-full h-full">
                            <p className="text-[#141522] text-sm font-medium tracking-[-2%] leading-[150%] mb-6">{t("detailCard.assignedAssignments")}</p>
                            <h2 className="text-[#141522] text-2xl font-semibold tracking-[-2%] leading-[150%] mb-3">{title}</h2>
                            <h3 className="text-[#54577A] text-sm font-medium tracking-[-2%] leading-[150%] mb-6">{t("tasks.uiUxDesign")} . {t("tasks.appsDesign")}</h3>
                            <Table className="mb-6">
                                <TableBody>
                                    <TableRow>
                                        <TableHead className="text-[#54577A] text-sm font-medium tracking-[-2%] leading-[150%]">{t("detailCard.studentsName")}</TableHead>
                                        <TableHead className="text-[#141522] text-sm font-semibold tracking-[-2%] leading-[150%]">Skylar Dias</TableHead>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead className="text-[#54577A] text-sm font-medium tracking-[-2%] leading-[150%]">{t("detailCard.studentClass")}</TableHead>
                                        <TableHead className="text-[#141522] text-sm font-semibold tracking-[-2%] leading-[150%]">MIPA 2</TableHead>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead className="text-[#54577A] text-sm font-medium tracking-[-2%] leading-[150%]">{t("detailCard.studentNumber")}</TableHead>
                                        <TableHead className="text-[#141522] text-sm font-semibold tracking-[-2%] leading-[150%]">10</TableHead>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <div className="flex flex-col">
                                <p className="text-[#141522] text-[20px] font-semibold tracking-[-2%] leading-[150%] mb-5">{t("detailCard.fileTask")}</p>
                                <div className="flex flex-row items-center justify-between mb-5">
                                    <span className="text-[#54577A] text-sm font-medium tracking-[-2%] leading-[150%]">{t("detailCard.lastModified")}</span>
                                    <span className="text-[#141522] text-sm font-semibold tracking-[-2%] leading-[150%]">1 July 2022</span>
                                </div>
                                <div>
                                    <span className="text-[#54577A] text-sm font-medium tracking-[-2%] leading-[150%] mb-4">{t("detailCard.fileSubmissions")}</span>
                                    <FileUploader />
                                    <span className="text-[#54577A] text-[12px] font-medium tracking-[-2%] leading-[150%]">*{t("detailCard.dragOrBrowser")}</span>
                                </div>
                                <Button className="text-white bg-[#546FFF] w-full h-full max-w-81 max-h-11 mt-15">{t("common.submit")}</Button>
                            </div>
                        </aside>
                    </div>
                )}
            </main>
        </div>
    );
}