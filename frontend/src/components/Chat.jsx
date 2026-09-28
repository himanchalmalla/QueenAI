import { useEffect } from "react"
import ChatInput from "./ChatInput"
import MessageList from "./MessageList"
import Nav from "./Nav"
import { getMessages } from "../services/chat.service.js"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../redux/slice/message.slice.js"
import { useSnackbar } from "notistack"

const Chat = () => {
    const { selectedConversation } = useSelector(state => state.conversation)
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchMessages = async () => {
            if (selectedConversation.title === "New Chat") return;
            if (selectedConversation) {
                await getMessages(selectedConversation?._id).then((res) => {
                    dispatch(setMessages(res));
                }).catch((error) => {
                    enqueueSnackbar(error.response.data.error, { variant: "error" });
                })
            }
        }
        fetchMessages();
    }, [selectedConversation?._id]);

    return (
        <div className='flex-1 flex flex-col text-[#fefefe]'>
            <Nav />
            <MessageList />
            <ChatInput />
        </div>
    )
}

export default Chat
