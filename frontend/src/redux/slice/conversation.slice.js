import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
    name: 'conversation',
    initialState: {
        conversation: [],
        selectedConversation: null
    },
    reducers: {
        setConversation: (state, action) => {
            state.conversation = action.payload
        },

        setNewConversation: (state, action) => {
            state.conversation.unshift(action.payload)
        },
        setSelectedConversation: (state, action) => {
            state.selectedConversation = action.payload
        },
        setConversationTitle: (state, action) => {
            const { title, _id } = action.payload
            state.conversation = state.conversation.map((conversation) => {
                if (conversation._id === _id) {
                    return { ...conversation, title: title }
                }
                return conversation
            })

            if (state.selectedConversation._id === _id) {
                state.selectedConversation = { ...state.selectedConversation, title: title }
            }
        }
    }
})

export const { setConversation, setNewConversation, setSelectedConversation, setConversationTitle } = conversationSlice.actions
export default conversationSlice.reducer
