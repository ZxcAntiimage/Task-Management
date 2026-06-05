import { icNotif } from "@/shared/api"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog"
import Image from "next/image"
import { useTranslation } from "react-i18next";

export default function Notifications() {
    const { t } = useTranslation();
    
    return (
        <div className="max-w-13 max-h-13 hover:scale-105">
            <Dialog>
                <DialogTrigger>
                    <Image src={icNotif} alt="" loading="lazy" />
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>{t("notifications.title")}</DialogTitle>
                </DialogContent>
            </Dialog>
        </div>
    )
}