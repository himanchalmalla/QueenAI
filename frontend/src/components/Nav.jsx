import { useSelector } from "react-redux";
import { MessageSquare } from "lucide-react"

const Nav = () => {
    const { selectedConversation } = useSelector(state => state.conversation)
    const { messages } = useSelector(state => state.message)

    console.log(selectedConversation)

    return (
        <>
            {selectedConversation && (
                <div className="relative flex justify-between gap-2 h-12 items-center bg-[#273438] px-4
                    shadow-[0_4px_12px_rgba(0,0,0,0.18)]
                    rounded-b-2xl
                    border-b border-[#3a5862]/20">

                    <div className="flex items-center justify-center w-7 h-7 rounded-lg 
                        bg-[#3a5862]/30 border border-[#3a5862]/30">
                        <MessageSquare size={13} />
                    </div>

                    <div className="text-[13px] font-semibold text-[#fefefe] 
                        truncate tracking-tight">
                        {selectedConversation?.title || "New Chat"}
                    </div>

                    <div className="text-[10px] text-[#fefefe] truncate tracking-tight 
                        bg-[#3a5862]/30 px-2 border border-[#3a5862]/30 
                        rounded-full py-0.5">
                        {messages?.length} Messages
                    </div>
                </div>
            )}
        </>
    )
}

export default Nav
