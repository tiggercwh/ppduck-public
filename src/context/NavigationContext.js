import createDataContext from './createDataContext';
import { getUserChat } from '../graphql/queries'
import { API, graphqlOperation } from 'aws-amplify'


const navigationReducer = (state, action) => {
    switch (action.type) {
        case 'get_user_events':
            return action.payload;
        case 'get_user_groups':
            return action.payload;
        case 'fetch_chats':
            return action.payload;
        default:
            return state;
    }
}

const fetchChatsWithFilter = dispatch => async (userID) => {
    try {
        const chatData = await API.graphql(graphqlOperation(getUserChat, {
            id: userID
        }));

        let chats = chatData.data.getUser.joinedChats.items

        chats.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            const olddateA = new Date(Math.max.apply(null, a.chatRoom.chat.items.map(function (chatItem) {
                return new Date(chatItem.createdAt);
            })))
            const newdateA = isNaN(olddateA) ? new Date(a.createdAt) : olddateA

            const olddateB = new Date(Math.max.apply(null, b.chatRoom.chat.items.map(function (chatItem) {
                return new Date(chatItem.createdAt);
            })))
            const newdateB = isNaN(olddateB) ? new Date(b.createdAt) : olddateB
            return newdateB - newdateA;
        });
        dispatch({ type: 'fetch_chats', payload: chats })
        return chats;
    } catch (error) {
        console.log(error)
    }
}



export const { Provider, Context } = createDataContext(navigationReducer, {
    fetchChatsWithFilter
}, []);