import { ChatWindowProps, MessagesState } from "@/entities";
import { USERS } from "@/features/store/data/databasePeoples";
import { icOnline, icVideoCall, icVoiceCall } from "@/shared/api";
import Chat from "@/widgets/Chat/ui/ui";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function ChatWindow({ userId }: ChatWindowProps) {
    const { t } = useTranslation();
    const user = USERS.find((u) => String(u.id) === String(userId));
    
    if (!user) {
        return <div></div>;
    }

    return (
        <div className="flex-1 w-full h-full overflow-hidden bg-[#F0F0F0] p-0 m-0 flex flex-col">
            <header className="flex flex-row bg-white justify-between items-center px-12 py-6 border-b border-[#F0F0F0] shrink-0">
                <div className="flex flex-row items-center gap-3">
                    <Image src={user.avatar} alt="" loading="lazy" />
                    <div className="flex flex-col">
                        <p className="text-[#141522] text-sm font-semibold leading-[150%] tracking-[-2%]">{user.name}</p>
                        <div className="flex flex-row items-center">
                            <Image src={icOnline} alt="" loading="lazy" />
                            <p className="text-[#141522] text-[12px] font-medium tracking-[-2%]">{t("common.online")}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-6">
                    <Button variant={"outline"}>
                        <Image src={icVideoCall} alt="" loading="lazy" />
                    </Button>
                    <Button variant={"outline"}>
                        <Image src={icVoiceCall} alt="" loading="lazy" />
                    </Button>
                </div>
            </header>

            <main className="flex-1 w-full flex flex-col items-start overflow-y-auto">
                <Chat userId={userId} />
            </main>
        </div>
    );
}