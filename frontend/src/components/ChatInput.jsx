import { Code2, FileText, Globe, ImageIcon, MessageSquare, Mic, Paperclip, Presentation, Send, Zap } from "lucide-react"
import { useState } from "react";
import { useSnackbar } from "notistack";
import { createMessage } from "../services/message.service.js";
import { useDispatch, useSelector } from "react-redux";
import { setRecentMessage } from "../redux/slice/message.slice.js";
import { createConversation, updateConversation } from "../services/chat.service.js";
import { setConversationTitle, setNewConversation, setSelectedConversation } from "../redux/slice/conversation.slice.js";
const ChatInput = () => {
    const [value, setValue] = useState('');
    const agents = [
        {
            id: "auto",
            icon: Zap,
            label: "Auto"
        },
        {
            id: "chat",
            icon: MessageSquare,
            label: "Chat"
        },
        {
            id: "coding",
            icon: Code2,
            label: "Coding"
        },
        {
            id: "pdf",
            icon: FileText,
            label: "PDF"
        },
        {
            id: "ppt",
            icon: Presentation,
            label: "PPT"
        },
        {
            id: "image",
            icon: ImageIcon,
            label: "Image"
        },
        {
            id: "search",
            icon: Globe,
            label: "Search"
        },
    ]
    const [selectedAgent, setSelectedAgent] = useState("auto");
    const { enqueueSnackbar } = useSnackbar();
    const { selectedConversation } = useSelector(state => state.conversation)
    const dispatch = useDispatch();

    const sendMessage = async () => {
        try {
            let conversation = selectedConversation
            if (!selectedConversation) {
                const recentConversation = await createConversation();
                dispatch(setSelectedConversation(recentConversation));
                dispatch(setNewConversation(recentConversation));
                conversation = recentConversation
            }

            if (conversation.title === "New Chat") {
                await updateConversation({ conversationId: conversation._id, title: value.trim().slice(0, 40) });
                dispatch(setConversationTitle({ title: value.trim(), _id: conversation._id }));
            }


            const payload = {
                prompt: value.trim(),
                conversationId: conversation?._id,
                agent: selectedAgent.toLowerCase()
            }
            setValue('');
            dispatch(setRecentMessage({ role: 'user', content: value.trim() }));
            const data = await createMessage(payload);
            dispatch(setRecentMessage({ role: 'assistant', content: data.answer, images: data.images }));
            console.log(data);
        } catch (error) {
            enqueueSnackbar(error.response.data.error, { variant: "error" });
        }

    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }



    return (
        <div className="w-full overflow-hidden py-3 md:px-5 px-3 border-t border-[#3a5862]/30 bg-[#273438]">
            <div className="flex flex-col gap-2 bg-[#9bb5be] border-[#3a5862]/30 rounded-lg px-3 py-3 pb-3">
                <div className="flex flex-wrap w-[80%] pr-2 items-center gap-2 py-1 ">
                    {
                        agents.map((agent) => {
                            const isActive = agent.id === selectedAgent;

                            return (
                                <div key={agent.id} onClick={() => setSelectedAgent(agent.id)} className={` group flex items-center justify-center shrink-0 gap-1.5 rounded-full px-3 py-2 text-xs font-medium border transition-all duration-200 ease-out cursor-pointer select-none ${isActive ? ` bg-linear-to-br from-[#7899a3] via-[#6f8f99] to-[#587984] border-[#a9cbd4]/30 text-[#eaf9fc] shadow-[0_2px_8px_rgba(0,0,0,0.18)] ` : ` bg-[#354348]/80 border-[#6d858d]/20 text-[#9fb1b6] hover:bg-[#405157] hover:border-[#8caab2]/30 hover:text-[#d7e8ec] `} hover:-translate-y-px active:translate-y-0 active:scale-95 `} >
                                    <agent.icon size={12} className={` transition-all duration-200 ${isActive ? "text-[#e8f9fc]" : "text-[#9aadb2] group-hover:text-[#d7e8ec]"} `} />
                                    <span>{agent.label}</span>
                                    {isActive && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#d9ffdf] shadow-[0_0_6px_rgba(217,247,255,0.7)]" />
                                    )}
                                </div>
                            )

                        })
                    }
                </div>
                <textarea className="rows-3 w-full h-10 font-medium resize-none  outline-none bg-transparent placeholder:text-[#718f98]
                scrollbar-none [&::-webkit-scrollbar]:hidden disabled:opacity-50 text-lg rounded-lg text-[#142024] focus:outline-none" placeholder="What's on your mind..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button className="flex items-center justify-center w-8 h-8 rounded-lg text-[#2d4147] 
                        hover:bg-[#3a5862]/30 hover:text-[#142024]/60 transition-all duration-150 bg-transparent cursor-pointer">
                            <Paperclip size={20} />
                        </button>
                        <button className="flex items-center justify-center w-8 h-8 rounded-lg text-[#2d4147] 
                        hover:bg-[#3a5862]/30 hover:text-[#142024]/60 transition-all duration-150 bg-transparent cursor-pointer">
                            <Mic size={20} />
                        </button>
                    </div>
                    <button
                        className="flex items-center justify-center w-8 h-8 rounded-lg border-none bg-linear-to-br from-[#8aa3ab] 
                        to-[#6d909a] hover:bg-none hover:bg-[#161f22] hover:text-white transition-all duration-150 cursor-pointer disabled:bg-none disabled:bg-[#6b6b6b] text[#2d4147]"
                        disabled={!value}
                        onClick={sendMessage}
                    >
                        <Send size={20} />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ChatInput
