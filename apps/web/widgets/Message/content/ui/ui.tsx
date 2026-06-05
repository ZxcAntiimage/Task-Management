import { RootState } from "@/features/store/store";
import { ChatWindow } from "@/widgets/ChatWindow";
import { useSelector } from "react-redux";

export default function MessageContent(){
   const activeTab = useSelector((state: RootState) => state.message.activeTab);
   const activeChatId = useSelector((state: RootState) => state.message.activeChatId);

    if (activeTab !== "message") {
        return null; 
    };

     return activeChatId ? (
        <div className="flex-1 h-full flex flex-col">
            <ChatWindow userId={activeChatId} />
        </div>
    ) : (
        <div></div>
    );
}