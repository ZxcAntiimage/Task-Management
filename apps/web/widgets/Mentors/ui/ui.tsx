import { Button } from "@workspace/ui/components/button";
import { Pagination, PaginationContent, PaginationItem } from "@workspace/ui/components/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardAction, CardContent, CardFooter } from "@workspace/ui/components/card"
import Image from "next/image";
import { useState } from "react";
import { icAllTasks, icCategory, icSearch, icSort, icStar } from "@/shared/api";
import { MENTORS } from "@/features/store/data/databaseMentors";
import { Notifications } from "@/widgets/notifications";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import { ButtonGroup } from "@workspace/ui/components/button-group";
import { DropdownMenu, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import { Input } from "@workspace/ui/components/input";
import { useTranslation } from "react-i18next";

export default function Mentors() {
    const { t } = useTranslation();
    const [recentPage, setRecentPage] = useState(1);
    const [query, setQuery] = useState('');
    const recentPerPage = 4;
    const totalRecentPages = Math.ceil(MENTORS.length / recentPerPage);
    const recentVisible = MENTORS.slice((recentPage - 1) * recentPerPage, recentPage * recentPerPage);
    const [allPage, setAllPage] = useState(1);
    const allPerPage = 6;
    const totalAllPages = Math.ceil(MENTORS.length / allPerPage);
    const allVisible = MENTORS.slice((allPage - 1) * allPerPage, allPage * allPerPage);

    const [followedIds, setFollowedIds] = useState<string[]>(["2", "6", "8"]);

    const handleFollowToggle = (mentorId: string) => {
        setFollowedIds(prev =>
            prev.includes(mentorId) ? prev.filter(id => id !== mentorId) : [...prev, mentorId]
        );
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    return (
        <div className="w-full h-full min-h-screen m-0 bg-[#FAFAFA] flex flex-col gap-10 overflow-y-auto">
            <header className="p-8 bg-white w-full border-b flex flex-col border-[#F0F0F0]">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-2xl text-[#141522] font-semibold leading-[150%] tracking-[-3%]">{t("mentors.exploreMentors")}</h1>
                    <div className="flex flex-row items-center gap-6">
                        <Notifications />
                        <Avatar className="w-13 h-13">
                            <AvatarFallback>US</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between mt-6">
                    <ButtonGroup className="relative flex flex-col items-center w-120 h-13">
                        <div className="flex flex-row items-center">
                            <Input value={query} onChange={handleSearchChange} className="text-[#54577A] text-[12px] w-120 h-13 px-7 pr-12 py-3.5 border-[#54577A] border rounded-[10px]" id="input-button-group" placeholder={t("mentors.searchMentors")} />
                            <Image src={icSearch} alt="" loading="lazy" className="absolute right-3 w-6 h-6" />
                        </div>
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

            <div className="p-10">
                <section className="flex flex-col w-full mb-8">
                    <header className="flex flex-row items-center justify-between mb-6">
                        <span className="text-[#141522] text-2xl font-bold tracking-[-2%]">{t("mentors.recentMentors")}</span>
                        <Pagination className="w-auto m-0">
                            <PaginationContent className="flex flex-row gap-2">
                                <PaginationItem>
                                    <Button
                                        variant="ghost"
                                        onClick={() => recentPage > 1 && setRecentPage(p => p - 1)}
                                        disabled={recentPage === 1}
                                        className="w-8 h-8 p-0 flex items-center justify-center rounded-lg hover:bg-black/5 disabled:opacity-30"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-[#54577A]" />
                                    </Button>
                                </PaginationItem>
                                <PaginationItem>
                                    <Button
                                        variant="ghost"
                                        onClick={() => recentPage < totalRecentPages && setRecentPage(p => p + 1)}
                                        disabled={recentPage === totalRecentPages}
                                        className="w-8 h-8 p-0 flex items-center justify-center rounded-lg hover:bg-black/5 disabled:opacity-30"
                                    >
                                        <ChevronRight className="w-5 h-5 text-[#54577A]" />
                                    </Button>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </header>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                        {recentVisible.map((mentor) => {
                            const isFollowed = followedIds.includes(mentor.id);
                            return (
                                <Card key={`recent-${mentor.id}`} className="w-full bg-white rounded-[20px] p-6 flex flex-col gap-5 border-none shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                                    <div className="flex flex-row items-center justify-between w-full">
                                        <CardContent className="flex flex-row items-center gap-3 p-0">
                                            <Image src={mentor.avatar || ""} alt={mentor.name} loading="lazy" width={48} height={48} className="rounded-full object-cover shrink-0" />
                                            <div className="flex flex-col">
                                                <span className="text-[#141522] text-base font-bold tracking-[-2%] truncate max-w-32.5">{mentor.name}</span>
                                                <span className="text-[#8E92BC] text-[12px] font-medium tracking-[-1%] truncate max-w-32.5">{mentor.position}</span>
                                            </div>
                                        </CardContent>
                                        <CardAction onClick={() => handleFollowToggle(mentor.id)} className="cursor-pointer p-0 select-none shrink-0">
                                            <span className={`text-sm font-semibold tracking-[-2%] ${isFollowed ? "text-[#54577A]" : "text-[#546FFF]"}`}>
                                                {isFollowed ? t("common.followed") : `+ ${t("common.follow")}`}
                                            </span>
                                        </CardAction>
                                    </div>
                                    <CardFooter className="flex flex-row items-center justify-between p-0 pb-6 border-t bg-white border-[#F5F5F7] pt-4">
                                        <div className="flex flex-row items-center gap-2">
                                            <Image src={icAllTasks} alt="tasks" loading="lazy" className="w-5 h-5" />
                                            <span className="text-[#141522] text-sm font-semibold tracking-[-2%]">{mentor.totalTask} {t("mentors.taskCount")}</span>
                                        </div>
                                        <div className="flex flex-row items-center gap-1.5">
                                            <Image src={icStar} alt="rating" loading="lazy" className="w-5 h-5" />
                                            <span className="text-[#141522] text-sm font-bold tracking-[-2%]">{mentor.rating}</span>
                                            <span className="text-[#8E92BC] text-sm font-medium">({mentor.reviews} {t("common.reviews")})</span>
                                        </div>
                                    </CardFooter>
                                </Card>
                            );
                        })}
                    </div>
                </section>
                <section className="flex flex-col w-full">
                    <header className="flex flex-row items-center justify-between mb-6">
                        <span className="text-[#141522] text-2xl font-bold tracking-[-2%]">{t("mentors.mentors")}</span>
                        <Pagination className="w-auto m-0">
                            <PaginationContent className="flex flex-row gap-2">
                                <PaginationItem>
                                    <Button
                                        variant="ghost"
                                        onClick={() => allPage > 1 && setAllPage(p => p - 1)}
                                        disabled={allPage === 1}
                                        className="w-8 h-8 p-0 flex items-center justify-center rounded-lg hover:bg-black/5 disabled:opacity-30"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-[#54577A]" />
                                    </Button>
                                </PaginationItem>
                                <PaginationItem>
                                    <Button
                                        variant="ghost"
                                        onClick={() => allPage < totalAllPages && setAllPage(p => p + 1)}
                                        disabled={allPage === totalAllPages}
                                        className="w-8 h-8 p-0 flex items-center justify-center rounded-lg hover:bg-black/5 disabled:opacity-30"
                                    >
                                        <ChevronRight className="w-5 h-5 text-[#54577A]" />
                                    </Button>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                        {allVisible.map((mentor) => {
                            const isFollowed = followedIds.includes(mentor.id);
                            return (
                                <Card key={`all-${mentor.id}`} className="w-full bg-white rounded-[20px] p-6 flex flex-col gap-4 border-none shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                                    <div className="flex flex-row items-center justify-between w-full">
                                        <CardContent className="flex flex-row items-center gap-3 p-0">
                                            <Image src={mentor.avatar || ""} alt={mentor.name} loading="lazy" width={48} height={48} className="rounded-full object-cover shrink-0" />
                                            <div className="flex flex-col">
                                                <span className="text-[#141522] text-base font-bold tracking-[-2%]">{mentor.name}</span>
                                                <span className="text-[#8E92BC] text-[12px] font-medium tracking-[-1%]">{mentor.position}</span>
                                            </div>
                                        </CardContent>
                                        <CardAction onClick={() => handleFollowToggle(mentor.id)} className="cursor-pointer p-0 select-none shrink-0">
                                            <span className={`text-sm font-semibold tracking-[-2%] ${isFollowed ? "text-[#54577A]" : "text-[#546FFF]"}`}>
                                                {isFollowed ? t("common.followed") : `+ ${t("common.follow")}`}
                                            </span>
                                        </CardAction>
                                    </div>

                                    <p className="text-[#8E92BC] text-[12px] font-normal leading-[160%] tracking-[-1%] min-h-10 line-clamp-2">
                                        {mentor.desreption || t("mentors.defaultDescription", { name: mentor.name, position: mentor.position })}
                                    </p>

                                    <CardFooter className="flex flex-row items-center justify-between p-0 pb-6 border-t border-[#F5F5F7] pt-4 mt-2 bg-white">
                                        <div className="flex flex-row items-center gap-2">
                                            <Image src={icAllTasks} alt="tasks" loading="lazy" className="w-5 h-5" />
                                            <span className="text-[#141522] text-sm font-semibold tracking-[-2%]">{mentor.totalTask} {t("mentors.taskCount")}</span>
                                        </div>
                                        <div className="flex flex-row items-center gap-1.5">
                                            <Image src={icStar} alt="rating" loading="lazy" className="w-5 h-5" />
                                            <span className="text-[#141522] text-sm font-bold tracking-[-2%]">{mentor.rating}</span>
                                            <span className="text-[#8E92BC] text-sm font-medium">({mentor.reviews} {t("common.reviews")})</span>
                                        </div>
                                    </CardFooter>
                                </Card>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}