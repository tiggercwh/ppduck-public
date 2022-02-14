import createDataContext from './createDataContext';
import { API, graphqlOperation } from 'aws-amplify'
import {
    createGeen, createGeenParticipant, deleteGeenParticipant,updateGeenParticipant, 
    updateGeen, createChatRoom, createChatRoomParticipant, deleteGeen, createLikedGeen, deleteLikedGeen
} from '../graphql/mutations'
import { listGeens, getGeen} from '../graphql/queries'

const geenReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_geens':
            return action.payload;
        case 'get_geen':
            return action.payload;
        default:
            return state;
    }
}

const addGeen = dispatch => async (geen) => {
    try {
        const geendata = await API.graphql(graphqlOperation(createGeen, { input: geen }))
        return geendata.data.createGeen.id;
    } catch (err) {
        console.log(err)
    }
};

const deleteGeenItem = dispatch => async (geen, participant) => {
    try {
       // console.log("DELETE CONTEXT RAN")
        await API.graphql(graphqlOperation(deleteGeen, { input: geen }))
        participant.map(async (user) => {
            //console.log(user)
            await API.graphql(graphqlOperation(deleteGeenParticipant, { input: {id:user} }))
        })
    } catch (err) {

    }
}

const addGeenChat = dispatch => {
    return async (chatroom, hostID, geenID) => {
        try {
            const geenChatRoom = await API.graphql(graphqlOperation(createChatRoom, { input: chatroom }))
            const chatRoomID = geenChatRoom.data.createChatRoom.id
            await API.graphql(graphqlOperation(createChatRoomParticipant, {
                input: {
                    chatRoomID: chatRoomID,
                    userID: hostID
                }
            }))
            if (geenID) {
                const updateData = await API.graphql(graphqlOperation(updateGeen, {
                    input: {
                        id: geenID,
                        chatRoomID: chatRoomID,
                    }
                }))

            }
            return chatRoomID;
        } catch (err) {
            console.log(err)
        }
    }
}

const fetchGeens = dispatch => async (nextToken = null, userLatitude = 22.302711, userLongitude = 114.177216) => {
        try {
            const geenData = 
            (nextToken && nextToken != "") ?
                await API.graphql(graphqlOperation(listGeens,
                    {
                        // filter: {
                        //     or: [
                        //         { eventName: { contains: filterCapitalized } },
                        //         { eventName: { contains: filterLowered } },
        
                        //     ],
                        //     and: {
                        //         or: category
                        //     },
                        //     eventLocation: { attributeExists: true },
                        //     eventTime: date ? {
                        //         between:
                        //             [today
                        //                 , date]
                        //     } : {
                        //         ge: today
                        //     }
                        // }
                        limit:50,
                        nextToken:nextToken
                    }))
                :
                await API.graphql(graphqlOperation(listGeens,
                    {
                        // filter: {
                        //     or: [
                        //         { eventName: { contains: filterCapitalized } },
                        //         { eventName: { contains: filterLowered } },
        
                        //     ],
                        //     and: {
                        //         or: category
                        //     },
                        //     eventLocation: { attributeExists: true },
                        //     eventTime: date ? {
                        //         between:
                        //             [today
                        //                 , date]
                        //     } : {
                        //         ge: today
                        //     }
                        // }
                        limit:50
                    }
                    ));
            let geenList = geenData.data.listGeens.items.filter((geen) => Math.abs(geen.latitude - userLatitude) <= 0.4 && Math.abs(geen.longitude - userLongitude) <= 0.4)
            // geenList.sort(function (a, b) {
            //             return new Date(b.geenTime) - new Date(a.geenTime);
            //         });
            dispatch({ type: 'fetch_geens', payload: geenList })
            return geenData.data.listGeens.nextToken;
        } catch (error) {
            console.log(error)
        }
}

const userLikeGeen = dispatch => {

    return async (linkageID) => {
        try {
            await API.graphql(graphqlOperation(createLikedGeen, { input: linkageID }))
        } catch (err) {

        }
    }
};

const userUnlikeGeen = dispatch => {

    return async (linkageID) => {
        try {
            await API.graphql(graphqlOperation(deleteLikedGeen, { input: linkageID }))
        } catch (err) {
            console.log(err)
        }
    }
};


const userJoinGeen = dispatch => {

    return async (linkage) => {
        try {
            await API.graphql(graphqlOperation(createGeenParticipant, { input: {
                    id: linkage.id,
                    geenID: linkage.geenID,
                    userID: linkage.userID
                    }
              }))
              await API.graphql(graphqlOperation(createChatRoomParticipant, {
                input: {
                    id: linkage.id,
                    chatRoomID: linkage.chatRoomID,
                    userID: linkage.userID
                }
            }))
        } catch (err) {
            console.log(err)
        }
    }
};


const userQuitGeen = dispatch => {

    return async (linkageID) => {
        try {
            await API.graphql(graphqlOperation(deleteGeenParticipant, { input: linkageID }))
        } catch (err) {
            console.log(err)
        }
    }
};

const getOneGeen = dispatch => async (geenid) => {
    //
    //return (async () => {
    try {
        const geenData = await API.graphql(graphqlOperation(getGeen, { id: geenid }));
        return geenData.data.getGeen;
    } catch (error) {
        console.log(error)
    }

    //)
}

const amendGeen = dispatch => {
    return async (newGeen) => {
        try {
            const geenData = await API.graphql(graphqlOperation(updateGeen, { input: newGeen }))
            return geenData.data.updateGeen;
        } catch (err) {
            console.log(err)
        }
    }
}

const takeAttendance = dispatch => {
    return async (attendanceUpdate) => {
        try {
            const individualData = await API.graphql(graphqlOperation(updateGeenParticipant,
                { input: attendanceUpdate }
            ));

        } catch (err) {

        }
    }
}

export const { Provider, Context } = createDataContext(geenReducer, {
    fetchGeens, addGeen, userJoinGeen, userQuitGeen, getOneGeen, amendGeen,
    addGeenChat, takeAttendance, deleteGeenItem,userLikeGeen,userUnlikeGeen
}, []);
