import createDataContext from './createDataContext';
import { API, graphqlOperation } from 'aws-amplify'
import { createUser, updateUser, createFriends, deleteFriends } from '../graphql/mutations'
import { listUsers, getUser, userByEmail, getUserVote, friendByUserId } from '../graphql/queries'
import { onCreateUser } from '../graphql/subscriptions'
import AsyncStorage from '@react-native-async-storage/async-storage';


const userReducer = (state, action) => {
    switch (action.type) {
        case 'get_userdata':
            return action.payload;
        case 'fetch_users':
            return action.payload;
        case 'update_user':
            return action.payload;
        case 'get_user':
            return action.payload;
        case 'refresh_user':
            return action.payload;
        case 'add_friend':
            return action.payload;
        default:
            return state;
    }
}

// const socialLogin = dispatch => async () => {
//     dispatch({ type: 'refresh_user', payload: "socialLogin" })
// }

// const socialSelectInterest = dispatch => async () => {
//     dispatch({ type: 'refresh_user', payload: "socialSelectInterest" })
// }

const guestLogin = dispatch => async () => {
    dispatch({ type: 'refresh_user', payload: "Guest" })
}

const logoutRefresh = dispatch => async () => {
    dispatch({ type: 'refresh_user', payload: "Default" })
}

const guestSignUp = dispatch => async () => {
    dispatch({ type: 'refresh_user', payload: "SignUp" })
}

const createFriendReq = dispatch => async (friendReq) => {
    try {
        await API.graphql(graphqlOperation(createFriendRequest, {
            input:
                friendReq
        }))
    } catch (err) {
        
    }
}

const replyFriendReq = dispatch => async (id, reply, userID = null, friendID = null) => {
    try {
        await API.graphql(graphqlOperation(updateFriendRequest, {
            input:
                { id: id, accepted: reply }
        }))
        
        if (reply === "accepted") {
            const friendData = await API.graphql(graphqlOperation(createFriends, {
                input:
                {
                    userID: userID,
                    friendID: friendID
                }
            }))
            await API.graphql(graphqlOperation(createFriends, {
                input:
                {
                    userID: friendID,
                    friendID: userID
                }
            }))
            return friendData.data.createFriends
        }
    } catch (err) {
        
    }
}


const deleteFriend = dispatch => async (fdItemIDOne, fdItemIDTwo) => {
    try {
        const firstDelete = await API.graphql(graphqlOperation(deleteFriends, {
            input:
            {
                id: fdItemIDOne
            }
        }))
        const secondDelete = await API.graphql(graphqlOperation(deleteFriends, {
            input:
            {
                id: fdItemIDTwo
            }
        }))
    } catch (err) {
        
    }
}



const getUserData = dispatch => async () => {
    // const testuser = JSON.stringify({
    //     id: "751fb698-b70a-48d9-9b05-69d137c58357",
    //     email: "abc@d.com",
    //     name: "displayname",
    //     image: "image.uri",
    //     interest: ["Language & Culture", "Music", "Film", "Pets"]
    // })
    try {
        const email = await AsyncStorage.getItem('@MyApp_USER')
        if (email == null || email == undefined) {
            
            // await AsyncStorage.setItem('@MyApp_USER', testuser);
            // const jsonValue = await AsyncStorage.getItem('@MyApp_USER');
            dispatch({ type: 'get_userdata', payload: null })
            return null;
        } else {
            
            
            let userData = await API.graphql(graphqlOperation(userByEmail, {
                email: email
            }))
            userData = userData.data.userByEmail.items[0]
            dispatch({ type: 'get_userdata', payload: userData })
            return userData;
        }
        // return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        
    }

}

const getUserData_Login = dispatch => async (user) => {
    
    
    const getData = async (user) => {
        try {
            let userData = await API.graphql(graphqlOperation(userByEmail, {
                email: user
            }))
            if (userData.data.userByEmail.items.length === 0) {
                return null
            } else {
                userData = userData.data.userByEmail.items[0]
                await AsyncStorage.setItem('@MyApp_USER', user);
                return userData;
            }
        } catch (e) {
            console.log(e)
        }
    }


    const userData = await getData(user);
    
    
    dispatch({ type: 'get_userdata', payload: userData })
    return userData;
}

const confirmSocialLoginUser = dispatch => async (user) => {
    const getData = async (user) => {
        try {
            let userData = await API.graphql(graphqlOperation(userByEmail, {
                email: user
            }))
            if (userData.data.userByEmail.items.length === 0) {
                return null
            } else {
                userData = userData.data.userByEmail.items[0]
                await AsyncStorage.setItem('@MyApp_USER', user);
                return userData;
            }
        } catch (e) {
            
        }
    }
    const userData = await getData(user);
    
    return userData
}

const addFriend = dispatch => async (userID, friendID) => {
    const friendData = await API.graphql(graphqlOperation(createFriends, {
        input:
        {
            userID: userID,
            friendID: friendID
        }
    }))
    return friendData.data.createFriends
}

const addSocialLoginUser = dispatch => async (user) => {
    try {
        const userData = await API.graphql(graphqlOperation(createUser, { input: user }))
        dispatch({ type: 'fetch_users', payload: userData.data.createUser })
        return userData.data.createUser;
    } catch (err) {
        
    }
};


const addUser = dispatch => async (user) => {
    try {
        const userData = await API.graphql(graphqlOperation(createUser, { input: user }))
        return userData.data.createUser;
    } catch (err) {
        console.log(err)
    }
};

const updateUserinfo = dispatch => async (user) => {
    try {
        const userData = await API.graphql(graphqlOperation(updateUser, { input: user }))
        
        
        dispatch({ type: 'update_user', payload: userData.data.updateUser })
    } catch (err) {
        console.log(err)
    }
};

const fetchUsers = dispatch => {
    return async () => {
        try {
            const userData = await API.graphql(graphqlOperation(listUsers));
            
            
            dispatch({ type: 'fetch_users', payload: userData.data.listUsers.items })
        } catch (error) {
            
            
        }
    }
}


const getOneUser = dispatch => async (userid) => {
    //
    //return (async () => {
    try {
       // console.log("called")
        const userData = await API.graphql(graphqlOperation(getUser, { id: userid }));
        
        
        dispatch({ type: 'get_user', payload: userData.data.getUser })
        return userData.data.getUser;
    } catch (error) {
        console.log(error)  
    }

    //)
}

const getOtherUser = dispatch => async (userid) => {
    //
    //return (async () => {
    try {
        
        const userData = await API.graphql(graphqlOperation(getUser, { id: userid }));
        
        
        return userData.data.getUser;
    } catch (error) {
        
        
    }

    //)
}

const getUserVotes = dispatch => async (userID) => {
    try {
        const votes = await API.graphql(graphqlOperation(getUserVote, { id: userID }));
        
        return votes.data.getUser.joinedVote.items;
    } catch (error) {
        
    }
}

const tinyChangeUser = dispatch => async (user) => {
    dispatch({ type: 'get_user', payload: user })
}

const testNull = dispatch => async () => {
    dispatch({ type: 'get_userdata', payload: null });
}



export const { Provider, Context } = createDataContext(userReducer, {
    fetchUsers, addUser, updateUserinfo, getOneUser, getUserData, getUserData_Login,
    logoutRefresh, testNull, confirmSocialLoginUser, addFriend, replyFriendReq,
    tinyChangeUser, createFriendReq, addSocialLoginUser, getOtherUser,
    getUserVotes, deleteFriend, guestLogin, guestSignUp
}, "Default");
