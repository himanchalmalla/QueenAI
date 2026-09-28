import { Coins, LogOut, MessageSquare, PanelLeftIcon, PanelRightIcon, PenSquare, Plus, User } from "lucide-react";
import { useEffect, useState } from "react";
import { getConversation } from "../services/chat.service.js";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { setConversation, setSelectedConversation } from "../redux/slice/conversation.slice.js";
import { logout } from "../services/auth.service.js"
import { setUserData } from "../redux/slice/user.slice.js";
const SideBar = () => {
    const [open, setOpen] = useState(true);
    const [imageError, setImageError] = useState(false);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { conversation, selectedConversation } = useSelector(state => state.conversation)
    const { userData } = useSelector(state => state.user)


    useEffect(() => {

        const getConversationData = async () => {
            await getConversation().then((res) => {
                dispatch(setConversation(res));
            }).catch((error) => {
                enqueueSnackbar(error.response.data.error, { variant: "error" });
            })
        }
        getConversationData();
    }, [userData?._id]);

    const createNewConversation = async () => {
        dispatch(setSelectedConversation(null));
    }

    const setCurrentConversation = (conversation) => {
        dispatch(setSelectedConversation(conversation));
    }

    const logoutUser = async () => {
        const userLogout = await logout();
        if (userLogout) {
            dispatch(setUserData(null))
        }
    }

    if (!open) {
        return (
            <div className="hidden lg:flex flex-col w-14 h-screen items-center bg-[#3a5862]/60 border-r border-[#3a5862]/60 py-4 gap-2 shrink-0">
                <button className="flex items-center justify-center w-7 h-7 rounded-lg text-[#d0e1e6] bg-transparent hover:text-[#d0e1e6]/20 hover:bg-[#3a5862]/20 transition-colors duration-150 border-none cursor-pointer"
                    onClick={() => setOpen(!open)}>
                    <PanelRightIcon />
                </button>

                <button className="flex items-center justify-center w-7 h-7 rounded-lg text-[#d0e1e6] bg-transparent hover:text-[#d0e1e6]/20 hover:bg-[#3a5862]/20 transition-colors duration-150 border-none cursor-pointer"
                    onClick={() => createNewConversation()}>
                    <Plus size={20} />
                </button>

                <div className="flex-1 overflow-y-auto px-2.5 pb-2
                  scrollbar-none [&::-webkit-scrollbar]:hidden">
                    {conversation.map((item, index) => {
                        const isActive = item?._id == selectedConversation?._id
                        return (
                            <div key={index} className={`flex items-center h-5 px-3 py-5 rounded-lg text-[#d0e1e6] cursor-pointer transition-all duration-200 hover:bg-white/10 ${isActive ? "bg-[#94bfcd]/20 text-white shadow-sm" : "text-[#d0e1e6]/80"} `}
                                onClick={() => setCurrentConversation(item)} >
                                <MessageSquare size={15} className={` shrink-0 transition-colors duration-200 ${isActive ? "text-[#94bfcd]" : "text-[#d0e1e6]/50 group-hover:text-[#94bfcd]"} `} />
                            </div>
                        )
                    })}
                </div>

                <div className="relative shrink-0">
                    {
                        (userData?.avatar || !imageError) ? (
                            <img className="w-8 h-8 rounded-full object-cover border-2 border-[#3a5862]/60"
                                src={userData?.avatar}
                                alt="user profile"
                                onError={() => setImageError(true)} />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-[#3a5862]/60 flex items-center justify-center">
                                <User />
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }

    return (
        <div className="fixed lg:static inset-y-0 left-0 z-50 w-62.5 bg-[#0f181a] text-[#fefefe] 
        h-screen shrink-0 border-r-2 border-[#3a5862]/60">
            <div className="flex flex-col h-full">
                <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/6">
                    <div className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-[#d0e1e6] bg-transparent 
                       hover:text-[#d0e1e6]/20 hover:bg-[#3a5862]/20 transition-colors duration-150 border-none cursor-pointer">
                        <PanelLeftIcon onClick={() => setOpen(!open)} />
                    </div>
                    <span className="text-lg font-semibold text-[#d0e1e6] tracking-tight flex-1">
                        QueenAI
                    </span>
                    <span className="text-sm text-[#d0e1e6]/60 bg-[#3a5862]/60 px-2 py-1 rounded-lg">free</span>
                    <button className="flex items-center justify-center w-7 h-7 rounded-lg text-[#d0e1e6] bg-transparent 
                       hover:text-[#d0e1e6]/20 hover:bg-[#3a5862]/20 transition-colors duration-150 border-none cursor-pointer">
                        <PenSquare size={14} onClick={() => createNewConversation()} />
                    </button>
                </div>

                <div className="px-4 py-4 pb-1">
                    <button className="flex items-center gap-2.5 w-full items-center justify-center bg-[#3a5862]/60 px-3 font-medium 
                    py-2 rounded-xl text-[#d0e1e6] hover:bg-[#3a5862]/80 bg-linear-to-br from-[#2b474d] to-[#3a5862] transition-colors duration-150
                    hover:opacity-90" onClick={() => createNewConversation()}>
                        <Plus size={14} /> <span className="text-sm">New Chat</span>
                    </button>
                </div>

                {
                    conversation.length == 0 ?
                        (
                            <div className="px-4 py-4 pb-1">
                                <p className=" text-[#d0e1e6]/60 text-[9px] font-semibold tracking-widest px-5 p-4 pb-1.5 uppercase">
                                    No Conversation yet
                                </p>
                            </div>
                        ) : (
                            <div className=" text-[#d0e1e6]/60  text-[9px] font-semibold tracking-widest px-5 p-4 pb-1.5 uppercase">
                                Your Conversation
                            </div>
                        )
                }

                <div className="flex-1 overflow-y-auto px-2.5 pb-2
                  scrollbar-none [&::-webkit-scrollbar]:hidden">
                    {conversation?.map((item, index) => {
                        const isActive = item?._id == selectedConversation?._id
                        return (
                            <div key={index} className={` group flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-[#d0e1e6] cursor-pointer transition-all duration-200 hover:bg-white/10 ${isActive ? "bg-[#94bfcd]/20 text-white shadow-sm" : "text-[#d0e1e6]/80"} `}
                                onClick={() => setCurrentConversation(item)}>
                                <MessageSquare size={15} className={` shrink-0 transition-colors duration-200 ${isActive ? "text-[#94bfcd]" : "text-[#d0e1e6]/50 group-hover:text-[#94bfcd]"} `} />
                                <span className={` min-w-0 flex-1 text-sm font-medium truncate transition-colors duration-200 ${isActive ? "text-white" : "text-[#d0e1e6]/70 group-hover:text-[#d0e1e6]"} `} > {item?.title || "New Chat"}
                                </span>
                            </div>
                        )
                    })}
                </div>

                <div className="mx-2.5 h-px bg-[#3a5862]/20" />
                <div className="px-1 py-3.5">
                    {
                        userData ? (
                            <div className="flex items-center gap-2.5 cursor-pointer rounded-2xl px-3 py-2.5 hover:bg-[#3a5862]/20 transition-colors duration-150">

                                <div className="relative shrink-0">
                                    {
                                        (userData?.avatar && !imageError) ? (
                                            <img className="w-8 h-8 rounded-full object-cover border-2 border-[#3a5862]/60"
                                                src={userData?.avatar}
                                                alt="user profile"
                                                onError={() => setImageError(true)} />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-[#3a5862]/60 flex items-center justify-center">
                                                <User />
                                            </div>
                                        )
                                    }
                                </div>


                                <div className="flex-1 min-w-0 text-sm font-semibold truncate" aria-hidden="true">
                                    <p className="text-[#d0e1e6]/80 text-[13px] truncate font-semibold">{userData?.name || "User"}</p>
                                    <p className="text-[#d0e1e6]/60 text-[11px] truncate font-semibold">{"Free Plan"}</p>
                                </div>

                                <div className="flex gap-1">
                                    <button className="flex items-center text-yellow-600 justify-center w-7 h-7 rounded-lg border-none bg-transparent hover:bg-[#3a5862]/20 transition-all duration-100">
                                        <Coins size={16} />
                                    </button>
                                    <button className="flex items-center justify-center w-7 h-7 rounded-lg border-none bg-transparent hover:bg-[#3a5862]/20 transition-all duration-100"
                                        onClick={logoutUser}>
                                        <LogOut size={16} />
                                    </button>
                                </div>


                            </div>
                        ) : (
                            <button className="flex gap-2.5 w-full items-center justify-center bg-[#3a5862]/60 px-3 font-medium 
                            py-2 rounded-xl text-[#d0e1e6] hover:bg-[#3a5862]/80 bg-linear-to-br from-[#2b474d] to-[#3a5862] transition-colors duration-150
                            hover:opacity-90" >
                                Login
                            </button>
                        )
                    }
                </div>


            </div>
        </div>
    )
}

export default SideBar
