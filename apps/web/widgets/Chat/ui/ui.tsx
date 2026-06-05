import { ChatWindowProps } from "@/entities";
import { USERS } from "@/features/store/data/databasePeoples"
import { Badge } from "@workspace/ui/components/badge"
import Image from "next/image";
import { icAttach, icDetail5, icSend } from "@/shared/api/index"
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { useTranslation } from "react-i18next";

export default function Chat({ userId }: ChatWindowProps) {
    const { t } = useTranslation();
    
    if (String(userId) !== "1") {
        return null;
    }

    const user = USERS.find((u) => String(u.id) === "1");

    return (
        <>
            <div className="flex flex-col items-start px-4 sm:px-8 w-full">
                <Badge className="bg-black text-white w-17 h-9.25 flex justify-center items-center mx-auto my-6">
                    {t("common.today")}
                </Badge>

                <div className="ml-auto w-fit max-w-[85%] sm:max-w-70 px-2 py-3 bg-[#546FFF] rounded-[8px] ">
                    <span className="text-white text-xs sm:text-sm font-medium leading-[150%] tracking-[-2%]">
                        {t("messages.morningMessage", { name: user?.name || "Angelie" })}
                    </span>
                </div>
                <span className="ml-auto mt-2.5 mb-5 text-[#8E92BC] text-[10px] sm:text-[12px] font-normal tracking-[-1%] ">
                    {t("messages.todayTime", { time: "11:52" })}
                </span>
                <div className="mr-auto bg-white w-fit max-w-[85%] sm:max-w-75 px-2 py-3 rounded-[8px] ">
                    <span className="text-[#141522] text-xs sm:text-sm font-medium leading-[150%] tracking-[-2%] block">{t("messages.yesSure")}</span>
                </div>
                <span className="mr-auto mt-2.5 mb-5 text-[#8E92BC] text-[10px] sm:text-[12px] font-normal tracking-[-1%] ">
                    {t("messages.todayTime", { time: "11:53" })}
                </span>
                <div className="ml-auto w-fit max-w-[85%] sm:max-w-70 px-2 py-3 bg-[#546FFF] rounded-[8px]">
                    <Image className="max-h-35.25 mb-3 w-full h-auto" src={icDetail5} alt="" loading="lazy" />
                    <span className="text-white text-xs sm:text-sm font-medium leading-[150%] tracking-[-2%]">{t("messages.howToMake")}</span>
                </div>
                <div className="ml-auto w-fit max-w-[85%] sm:max-w-70 px-2 mt-2 py-3 bg-[#546FFF] rounded-[8px]">
                    <span className="text-white text-xs sm:text-sm font-medium leading-[150%] tracking-[-2%]">{t("messages.isTherePlugin")}</span>
                </div>
                <span className="ml-auto mt-2.5 mb-5 text-[#8E92BC] text-[10px] sm:text-[12px] font-normal tracking-[-1%] ">
                    {t("messages.todayTime", { time: "11:53" })}
                </span>
                <div className="mr-auto bg-white w-fit max-w-[85%] sm:max-w-75 px-2 py-3 rounded-[8px] ">
                    <span className="text-[#141522] text-xs sm:text-sm font-medium leading-[150%] tracking-[-2%] block">{t("messages.noPlugins")}</span>
                </div>
                <div className="mr-auto bg-white w-fit max-w-[85%] sm:max-w-75 px-2 py-3 rounded-[8px] mt-2 ">
                    <span className="text-[#141522] text-xs sm:text-sm font-medium leading-[150%] tracking-[-2%] block">{t("messages.thankYou")}</span>
                </div>
                <span className="mr-auto mt-2.5 mb-5 sm:mb-8 text-[#8E92BC] text-[10px] sm:text-[12px] font-normal tracking-[-1%] ">
                    {t("messages.todayTime", { time: "11:53" })}
                </span>
            </div>
            <div className="w-full h-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white px-4 sm:px-7.5 pt-4 sm:pt-6.5 pb-4 sm:pb-8">
                <Input className="text-[#8E92BC] text-sm font-medium w-full max-w-full sm:max-w-[70%] leading-[150%] tracking-[-2%]" placeholder={t("messages.sendYourMessage")} />
                <div className="flex flex-row items-center justify-end gap-2.5">
                    <Button variant={"outline"} className="p-2 sm:p-auto">
                        <Image src={icAttach} alt="" loading="lazy" className="w-4 h-4 sm:w-auto sm:h-auto" />
                    </Button>
                    <Button variant={"outline"} className="p-2 sm:p-auto">
                        <Image src={icSend} alt="" loading="lazy" className="w-4 h-4 sm:w-auto sm:h-auto" />
                    </Button>
                </div>
            </div>
        </>
    );
}