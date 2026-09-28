import { useSelector } from "react-redux"
import MessageBubble from "./MessageBubble"
import { useRef } from "react"
import { useEffect } from "react"

const MessageList = () => {
    const { selectedConversation } = useSelector(state => state.conversation)
    const { messages } = useSelector(state => state.message)
    const messageEndRef = useRef(null);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex-1 flex flex-col text-[#fefefe] overflow-y-auto space-y-5 scrollbar-none [&::-webkit-scrollbar]:hidden bg-[#1b2427]">
            {messages.length == 0 || !selectedConversation ? (
                <div className="h-full flex flex-col items-center justify-center gap-6 text-center">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold text-[#fefefe] tracking-tight ">QueenAI</h1>
                        <p className="text-sm font-semibold text-[#a1c7da] tracking-tight">How can I help you today?</p>
                        <p className="text-sm font-normal text-[#7dc1d9] tracking-tight leading-relaxed">Ask me anything -- Let's build together <br /> Coding, Ideas, Questions  and more</p>
                    </div>

                    <div className="flex gap-2">
                        {["Explain AI", "Write a Netflix clone", "Explain Human Evolution"].map((item, index) => (
                            <button key={index} className="bg-[#273438] border border-[#3a5862]/30 rounded-full w-50 px-3 py-1 text-[#bde6ef] text-sm font-semibold hover:bg-[#3a5862]/60 cursor-pointer">
                                {item}
                            </button>

                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col flex-wrapgap-2 ">
                    {messages.map((message, index) => (
                        <dev key={index}>
                            <MessageBubble role={message?.role} content={message?.content} images={message?.images || []} />
                        </dev>

                    ))}
                    <div ref={messageEndRef} />
                </div>
            )}
        </div>
    )
}

export default MessageList
