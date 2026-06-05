import { USERS } from "@/features/store/data/databasePeoples";
import { icSearch } from "@/shared/api";
import { Notifications } from "@/widgets/notifications";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import { ButtonGroup } from "@workspace/ui/components/button-group";
import { Input } from "@workspace/ui/components/input";
import Image from "next/image";
import { useState } from "react";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@workspace/ui/components/item"
import { useDispatch } from "react-redux";
import { setActiveChat } from "@/features/store/messages/messagesSlince";
import { MessageContent } from "../content";
import { useTranslation } from "react-i18next";

export default function Message() {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const users = USERS
    const dispatch = useDispatch();

    function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        setQuery(event.target.value)
    }

    return (
        <div className="w-full min-h-screen bg-[#F0F0F0] flex flex-col overflow-x-hidden p-0 m-0">
            <header className="p-4 sm:p-8 bg-white w-full flex flex-row justify-between items-center border-b border-[#F0F0F0] flex-wrap gap-4">
                <h1 className="text-xl sm:text-2xl text-[#141522] font-semibold leading-[150%] tracking-[-3%]">{t("messages.message")}</h1>
                <div className="flex flex-row items-center gap-4 sm:gap-6">
                    <Notifications />
                    <Avatar className="w-10 h-10 sm:w-13 sm:h-13">
                        <AvatarFallback>US</AvatarFallback>
                    </Avatar>
                </div>
            </header>
            <main className="flex flex-col lg:flex-row items-stretch w-full flex-1">
                <aside className="p-4 sm:p-6 w-full h-full flex flex-col overflow-y-auto max-w-full lg:max-w-100 bg-white">
                    <ButtonGroup className="relative flex flex-col items-center w-full lg:w-88 h-13 mb-8 ">
                        <div className="flex flex-row items-center w-full">
                            <Input value={query} onChange={handleSearchChange} className="text-[#54577A] bg-white text-[12px] w-full h-13 px-7 pr-12 py-3.5 border-[#54577A] border rounded-[10px]" id="input-button-group" placeholder={t("messages.searchName")} />
                            <Image src={icSearch} alt="" loading="lazy" className="absolute right-3 w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                    </ButtonGroup>
                    <ul className="w-full flex-1 overflow-y-auto bg-white">
                        {users.map((item) => (
                            <li onClick={() => dispatch(setActiveChat(item.id))} key={item.id}>
                                <Item className="hover:bg-gray-50" variant={"outline"}>
                                    <ItemMedia>
                                        <Image src={item.avatar} alt="" loading="lazy" className="w-8 h-8 sm:w-auto sm:h-auto" />
                                    </ItemMedia>
                                    <ItemContent>
                                        <ItemTitle className="text-[#141522] text-xs sm:text-sm font-semibold leading-[150%] tracking-[-2%]">{item.name}</ItemTitle>
                                    </ItemContent>
                                    <ItemActions>
                                        <ItemDescription className="text-[10px] sm:text-sm">{item.id}{t("messages.minutesAgo")}</ItemDescription>
                                    </ItemActions>
                                </Item>
                            </li>
                        ))}
                    </ul>
                </aside>
                <MessageContent />
            </main>
        </div>
    );
}