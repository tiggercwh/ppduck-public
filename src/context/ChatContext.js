import createDataContext from './createDataContext';
import { API, graphqlOperation } from 'aws-amplify'
import { createChat, createChatRoom, createChatRoomParticipant,updateChatRoomParticipant } from '../graphql/mutations'
import { listChats, getUserChat, getChatRoom, getUnreadChat } from '../graphql/queries'
import { onCreateChatByChatRoom } from '../graphql/subscriptions'
import { v4 as uuidv4 } from 'uuid'

const recordReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_chats':
            
            return action.payload;
        case 'update_chat':
            return action.payload;
        case 'get_chats':
            return action.payload;
        case 'add_tempChats':
            
            return [...state, action.payload];
        case 'add_realChats':
            
            const tempState = state;
            tempState.pop();
            return [...tempState, action.payload];
        case 'update_chats':
            return [...state, action.payload];
        default:
            return state;
    }
}

const fetchChatsWithFilter = dispatch => async (userID) => {
    try {
        
        const chatData = await API.graphql(graphqlOperation(getUserChat, {
            id: userID
        }));
        
        dispatch({ type: 'fetch_chats', payload: chatData.data.getUser.joinedChats.items })
    } catch (error) {
        
    }

}

const getUnreadChats = dispatch => async (userID) => {
    try {
        
        const chatData = await API.graphql(graphqlOperation(getUnreadChat, {
            id: userID
        }));
        
        return chatData.data.getUser.joinedChats.items
    } catch (error) {
        
    }

}

const fetchChats = dispatch => {
    return async () => {
        try {
            const chatData = await API.graphql(graphqlOperation(listChats));
            
            dispatch({ type: 'fetch_chats', payload: chatData.data.listChats.items })
        } catch (error) {
            
        }
    }
}

const addImageInChat = dispatch => async (chat) => {
    try {
        const time = new Date().toISOString();
        const tempImage =
                {
                    image:chat.image,
                    chatRoomID: chat.chatRoomID,
                    createdAt: time,
                    reply: "false",
                    replyID: null,
                    replyName: "",
                    replyText: "",
                    sender: chat.sender,
                    senderID: chat.senderID,
                    text: chat.text,
                }
        dispatch({ type: 'add_tempChats', payload: tempImage })
        const newImage = await API.graphql(graphqlOperation(createChat, { input: tempImage }))
        dispatch({ type: 'add_realChats', payload: newImage.data.createChat })
        return newImage.data.createChat;
    } catch (err) {
        
    }
};

const addChat = dispatch => async (chat, avatar) => {
    try {
        const time = new Date().toISOString();
        // const tempChat =
        //     isReply ?
        //         {
        //             isImage:"false",
        //             chatRoomID: chat.chatRoomID,
        //             createdAt: time,
        //             reply: "true",
        //             replyID: chat.replyID,
        //             replyName: chat.replyName,
        //             replyText: chat.replyText,
        //             sender: chat.sender,
        //             senderID: chat.senderID,
        //             text: chat.text,
        //         }
        //         :
        //         {
        //             isImage:"false",
        //             chatRoomID: chat.chatRoomID,
        //             createdAt: time,
        //             reply: "false",
        //             replyID: null,
        //             replyName: "",
        //             replyText: "",
        //             sender: chat.sender,
        //             senderID: chat.senderID,
        //             text: chat.text,
        //         }
        
        const tempChat =
                {
                    _id: uuidv4(),
                    text: chat.text,
                    createdAt: time,
                    user: {
                        _id: chat.senderID,
                        name: chat.sender,
                        avatar: avatar,
                    }
                }
        
        dispatch({ type: 'add_tempChats', payload: tempChat })
        const newChat = await API.graphql(graphqlOperation(createChat, { input: chat }))
        // .then(
        //     () => {
        //         dispatch({ type: 'add_realChats', payload: newChat.data.createChat });
        //     }
        // )
        return newChat.data.createChat;
    } catch (err) {
        
    }
};

const getChatUpdate = dispatch => (chatRoomID, userID, partiID) => {
    try {
       // console.log("get update init")
        const subscription = API.graphql(
            graphqlOperation(onCreateChatByChatRoom, { chatRoomID: chatRoomID })
        ).subscribe({
            error: (error) => console.log("constant update err 1",error),
            next: (data) => {
                const newChat = data.value.data.onCreateChatByChatRoom;
                if (newChat.senderID !== userID) {
                    const tempChat =
                        {
                            _id: newChat.id,
                            text: newChat.text,
                            createdAt: new Date().toISOString(),
                            user: {
                                _id: newChat.senderID,
                                name: newChat.sender,
                                avatar: newChat.image,
                            }
                        }
                    dispatch({ type: 'update_chats', payload: tempChat })
                }
                updatePartiTime(partiID)
            }
        });
      //  console.log("all chat updaterun", subscription)
        return subscription;
    } catch (err) {
       //console.log("constant update err 2")
    }

};


const getChat = dispatch => async (chatRoomID) => {
    try {
        const chatData = await API.graphql(graphqlOperation(getChatRoom, { id: chatRoomID }))
        const chatlist = chatData.data.getChatRoom.chat.items.map((chat) => {
            return(
                {
                        _id: chat.id,
                        text: chat.text,
                        createdAt: chat.createdAt,
                        user: {
                            _id: chat.senderID,
                            name: chat.sender,
                            avatar: chat.image,
                        }
                }
            )
        })

        dispatch({ type: 'get_chats', payload: chatlist.reverse() })
        return chatData.data.getChatRoom;
    } catch (err) {
        
    }
};

const addChatRoom = dispatch => async (chatroom, hostID, friendID) => {
    try {
        const directChatRoom = await API.graphql(graphqlOperation(createChatRoom, { input: chatroom }))
        const hostPartiItem = await API.graphql(graphqlOperation(createChatRoomParticipant, {
            input: {
                chatRoomID: directChatRoom.data.createChatRoom.id,
                userID: hostID
            }
        }))
        await API.graphql(graphqlOperation(createChatRoomParticipant, {
            input: {
                chatRoomID: directChatRoom.data.createChatRoom.id,
                userID: friendID
            }
        }))
        return ({
            chatRoom:directChatRoom.data.createChatRoom,
            partiID: hostPartiItem.data.createChatRoomParticipant.id
    });
    } catch (err) {
        
    }
}

const updatePartiTime = dispatch => async (partiID) => {
    try {
        const timeNow = new Date();
        const newPartiData = await API.graphql(graphqlOperation(updateChatRoomParticipant, {
            input: {
                id: partiID,
                lastEnterTime:timeNow
            }
        }))
      // console.log ('partiTime Update Done')

        return (newPartiData.data.updateChatRoomParticipant.lastEnterTime);
    } catch (err) {
      //  console.log('partiTime Update Error')
    }
}

export const { Provider, Context } = createDataContext(recordReducer, {
    getChat, fetchChats, addChat, addChatRoom, getChatUpdate, fetchChatsWithFilter, addImageInChat, getUnreadChats, updatePartiTime
}, []);




