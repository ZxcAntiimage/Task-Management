"use client"
import { Notifications } from "@/widgets/notifications";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/features/store/store";
import { setLanguage, setTimezone, setTimeFormat } from "@/features/store/settings/settingsSlice";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@workspace/ui/components/select";
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group";
import { Label } from "@workspace/ui/components/label";
import { useTranslation } from "react-i18next";

export default function Settings() {
    const { t } = useTranslation();
    const [id, setId] = useState<string>("general")
    const dispatch = useDispatch()

    const language = useSelector((state: RootState) => state.settings.language)
    const timezone = useSelector((state: RootState) => state.settings.timezone)
    const timeFormat = useSelector((state: RootState) => state.settings.timeFormat)

    function isOpen(id: string) {
        if (id === "general") {
            return (
                <div className="mt-8 flex flex-col gap-6 w-full">
                    <div className="flex flex-col gap-2 w-full">
                        <Label className="text-[#141522] text-xs sm:text-sm font-semibold leading-[150%] tracking-[-2%]">
                            {t("settings.language")}
                        </Label>
                        <Select value={language} onValueChange={(value) => dispatch(setLanguage(value))}>
                            <SelectTrigger className="w-full sm:w-100 h-12.5 border border-[#F0F0F0] bg-white rounded-[10px] px-5 py-2.5 text-sm font-medium text-[#141522] focus:ring-0 focus:ring-offset-0">
                                <SelectValue placeholder={t("settings.language")} />
                            </SelectTrigger>
                            <SelectContent className="bg-black text-white border-none rounded-[10px]">
                                <SelectItem value="english" className="focus:bg-zinc-800 focus:text-white cursor-pointer py-2.5">
                                    {t("settings.english")}
                                </SelectItem>
                                <SelectItem value="russian" className="focus:bg-zinc-800 focus:text-white cursor-pointer py-2.5">
                                    {t("settings.russian")}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <Label className="text-[#141522] text-xs sm:text-sm font-semibold leading-[150%] tracking-[-2%]">
                            {t("settings.timezone")}
                        </Label>
                        <Select value={timezone} onValueChange={(value) => dispatch(setTimezone(value))}>
                            <SelectTrigger className="w-full sm:w-100 h-12.5 border border-[#F0F0F0] bg-white rounded-[10px] px-5 py-2.5 text-sm font-medium text-[#141522] focus:ring-0 focus:ring-offset-0">
                                <SelectValue placeholder={t("settings.timezone")} />
                            </SelectTrigger>
                            <SelectContent className="bg-black text-white border-none rounded-[10px]">
                                <SelectItem value="english" className="focus:bg-zinc-800 focus:text-white cursor-pointer py-2.5">
                                    {t("settings.english")}
                                </SelectItem>
                                <SelectItem value="russian" className="focus:bg-zinc-800 focus:text-white cursor-pointer py-2.5">
                                    {t("settings.russian")}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <Label className="text-[#141522] text-xs sm:text-sm font-semibold leading-[150%] tracking-[-2%]">
                            {t("settings.timeFormat")}
                        </Label>
                        <RadioGroup value={timeFormat} onValueChange={(value) => dispatch(setTimeFormat(value))} className="flex flex-col sm:flex-row gap-4 w-full">
                            <div className="flex flex-row items-center w-full sm:w-46.25 h-12.5 relative">
                                <RadioGroupItem value="24hours" id="24hours" className="peer sr-only active:border-4" />
                                <Label
                                    htmlFor="24hours"
                                    className="flex h-12.5 w-full items-center justify-between rounded-[10px] border border-[#F0F0F0] bg-white px-5 py-2.5 text-[10px] sm:text-[12px] font-medium tracking-[-2%] text-[#141522] cursor-pointer transition-all peer-data-[state=checked]:border-[#546FFF] peer-data-[state=checked]:text-[#546FFF]"
                                >
                                    <span>{t("settings.hours24")}</span>
                                    <div className="h-5 w-5 rounded-full border-2 border-zinc-300 flex items-center justify-center transition-all peer-data-[state=checked]:border-[#546FFF]">
                                        <div className="h-2.5 w-2.5 rounded-full bg-transparent transition-all peer-data-[state=checked]:bg-[#546FFF]" />
                                    </div>
                                </Label>
                            </div>
                            <div className="flex flex-row items-center w-full sm:w-46.25 h-12.5 relative">
                                <RadioGroupItem value="12hours" id="12hours" className="peer sr-only active:border-4" />
                                <Label
                                    htmlFor="12hours"
                                    className="flex h-12.5 w-full items-center justify-between rounded-[10px] border border-[#F0F0F0] bg-white px-5 py-2.5 text-[10px] sm:text-[12px] font-medium tracking-[-2%] text-[#141522] cursor-pointer transition-all peer-data-[state=checked]:border-[#546FFF] peer-data-[state=checked]:text-[#546FFF]"
                                >
                                    <span>{t("settings.hours12")}</span>
                                    <div className="h-5 w-5 rounded-full border-2 border-zinc-300 flex items-center justify-center transition-all peer-data-[state=checked]:border-[#546FFF]">
                                        <div className="h-2.5 w-2.5 rounded-full bg-transparent transition-all peer-data-[state=checked]:bg-[#546FFF]" />
                                    </div>
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="mt-8 w-full">
                    <p className="text-[#141522] text-xs sm:text-sm font-semibold">{t("notifications.title")}</p>
                </div>
            )
        }
    }

    return (
        <div className="w-full min-h-screen bg-[#F0F0F0] flex flex-col m-0 p-0 overflow-x-hidden">
            <header className="p-2 sm:p-4 md:p-6 lg:p-8 bg-white w-full flex flex-row justify-between items-center border-b border-[#F0F0F0] flex-wrap gap-4">
                <h1 className="text-xl sm:text-2xl text-[#141522] font-semibold leading-[150%] tracking-[-3%]">{t("settings.settings")}</h1>
                <div className="flex flex-row items-center gap-4 sm:gap-6">
                    <Notifications />
                    <Avatar className="w-10 h-10 sm:w-13 sm:h-13">
                        <AvatarFallback>US</AvatarFallback>
                    </Avatar>
                </div>
            </header>
            <main className="w-full flex-1 bg-white m-0 sm:m-8 overflow-x-auto">
                <div className='px-4 sm:px-8 py-4 sm:py-8 flex flex-col w-full'>
                    <div className="flex flex-row items-center gap-6 w-full border-b border-[#F0F0F0] pb-4 overflow-x-auto">
                        <Button onClick={() => setId('general')} className={`text-xs sm:text-sm font-medium leading-[150%] bg-white tracking-[-2%] hover:text-[#141522] whitespace-nowrap ${id === 'general' ? 'text-[#141522] border-b-2 border-b-[#546FFF]' : 'text-[#8E92BC]'}`}>{t("settings.general")}</Button>
                        <Button onClick={() => setId('notification')} className={`text-xs sm:text-sm font-medium leading-[150%] bg-white tracking-[-2%] hover:text-[#141522] whitespace-nowrap ${id === 'notification' ? 'text-[#141522] border-b-2 border-b-[#546FFF]' : 'text-[#8E92BC]'}`}>{t("settings.notification")}</Button>
                    </div>
                    <div className="w-full">
                        {isOpen(id)}
                    </div>
                </div>
            </main>
        </div>
    )
}