"use client"
import React, { useState } from "react";
import { icCategory, icSearch, icSort } from "@/shared/api";
import { Notifications } from "@/widgets/notifications";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import { ButtonGroup } from "@workspace/ui/components/button-group";
import { Input } from "@workspace/ui/components/input";
import Image from "next/image";
import { DropdownMenu, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import { Button } from "@workspace/ui/components/button";
import { Pagination, PaginationContent, PaginationItem } from "@workspace/ui/components/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ALL_TASKS, ITEMS_PER_PAGE } from "@/features/store/data/databaseTasks";
import { CardTask } from "@/widgets/cardTask";
import { useTranslation } from "react-i18next";

export default function Tasks() {
    const { t } = useTranslation();
    const [pageFirstBlock, setPageFirstBlock] = useState(1);
    const [query, setQuery] = useState('');
    const totalPagesFirst = Math.ceil(ALL_TASKS.length / ITEMS_PER_PAGE);
    const startIndexFirst = (pageFirstBlock - 1) * ITEMS_PER_PAGE;
    const visibleTasksFirst = ALL_TASKS.slice(startIndexFirst, startIndexFirst + ITEMS_PER_PAGE);

    const [pageSecondBlock, setPageSecondBlock] = useState(1);
    const secondBlockData = ALL_TASKS.slice(4);
    const totalPagesSecond = Math.ceil(secondBlockData.length / ITEMS_PER_PAGE);
    const startIndexSecond = (pageSecondBlock - 1) * ITEMS_PER_PAGE;
    const visibleTasksSecond = secondBlockData.slice(startIndexSecond, startIndexSecond + ITEMS_PER_PAGE);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        setPageFirstBlock(1)
        setPageSecondBlock(1)
    }
    const filter = ALL_TASKS.filter((item) => {
        const searchString = query.toLowerCase();
        return item.title.toLowerCase().includes(searchString);
    });

    return (
        <div className="w-full min-h-screen bg-[#F0F0F0] flex flex-col overflow-x-hidden p-0 m-0">
            <header className="p-2 sm:p-4 md:p-6 lg:p-8 bg-white w-full border-b flex flex-col border-[#F0F0F0]">
                <div className="flex flex-row justify-between items-center flex-wrap gap-4">
                    <h1 className="text-xl sm:text-2xl text-[#141522] font-semibold leading-[150%] tracking-[-3%]">{t("tasks.exploreTask")}</h1>
                    <div className="flex flex-row items-center gap-4 sm:gap-6">
                        <Notifications />
                        <Avatar className="w-10 h-10 sm:w-13 sm:h-13">
                            <AvatarFallback>US</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-6">
                    <ButtonGroup className="relative flex flex-col items-center w-full sm:w-120 h-13">
                        <div className="flex flex-row items-center w-full">
                            <Input value={query} onChange={handleSearchChange} className="text-[#54577A] text-[12px] w-full h-13 px-7 pr-12 py-3.5 border-[#54577A] border rounded-[10px]" id="input-button-group" placeholder={t("common.search")} />
                            <Image src={icSearch} alt="" loading="lazy" className="absolute right-3 w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
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
                {query.trim() !== "" ? (
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row items-center justify-between w-full mb-6 flex-wrap gap-4">
                            <p className="text-[#141522] text-xl sm:text-2xl font-semibold leading-[150%] tracking-[-2%]">
                                {t("tasks.searchResults")} ({filter.length})
                            </p>
                        </div>

                        {filter.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 w-full">
                                {filter.map((task) => (
                                    <CardTask
                                        key={`search-${task.id}`}
                                        id={task.id}
                                        progressName={task.progressName}
                                        progressNum={task.progressNum}
                                        time={task.time}
                                        title={task.title}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-[#54577A] text-sm">{t("tasks.noTasksFound")} "{query}"</p>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col w-full">
                            <div className="flex flex-row items-center justify-between w-full mb-6 flex-wrap gap-4">
                                <p className="text-[#141522] text-xl sm:text-2xl font-semibold leading-[150%] tracking-[-2%]">{t("tasks.timeLimit")}</p>
                                <Pagination className="w-auto m-0">
                                    <PaginationContent className="flex flex-row gap-1">
                                        <PaginationItem>
                                            <Button
                                                variant="ghost"
                                                onClick={() => pageFirstBlock > 1 && setPageFirstBlock(p => p - 1)}
                                                disabled={pageFirstBlock === 1}
                                                className="w-5 h-5 sm:w-6 sm:h-6 p-0 flex items-center justify-center rounded-[6px] hover:bg-black/5 disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#54577A]" />
                                            </Button>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <Button
                                                variant="ghost"
                                                onClick={() => pageFirstBlock < totalPagesFirst && setPageFirstBlock(p => p + 1)}
                                                disabled={pageFirstBlock === totalPagesFirst}
                                                className="w-5 h-5 sm:w-6 sm:h-6 p-0 flex items-center justify-center rounded-[6px] hover:bg-black/5 disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#54577A]" />
                                            </Button>
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 w-full">
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
                        <div className="flex flex-col w-full">
                            <div className="flex flex-row items-center justify-between w-full mb-6 flex-wrap gap-4">
                                <p className="text-[#141522] text-xl sm:text-2xl font-semibold leading-[150%] tracking-[-2%]">{t("tasks.newTask")}</p>
                                <Pagination className="w-auto m-0">
                                    <PaginationContent className="flex flex-row gap-1">
                                        <PaginationItem>
                                            <Button
                                                variant="ghost"
                                                onClick={() => pageSecondBlock > 1 && setPageSecondBlock(p => p - 1)}
                                                disabled={pageSecondBlock === 1}
                                                className="w-5 h-5 sm:w-6 sm:h-6 p-0 flex items-center justify-center rounded-[6px] hover:bg-black/5 disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#54577A]" />
                                            </Button>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <Button
                                                variant="ghost"
                                                onClick={() => pageSecondBlock < totalPagesSecond && setPageSecondBlock(p => p + 1)}
                                                disabled={pageSecondBlock === totalPagesSecond}
                                                className="w-5 h-5 sm:w-6 sm:h-6 p-0 flex items-center justify-center rounded-[6px] hover:bg-black/5 disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#54577A]" />
                                            </Button>
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 w-full">
                                {visibleTasksSecond.map((task) => (
                                    <CardTask
                                        key={`second-${task.id}`}
                                        id={task.id}
                                        progressName={task.progressName}
                                        progressNum={task.progressNum}
                                        time={task.time}
                                        title={task.title}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}