import createDataContext from './createDataContext';
import { API, graphqlOperation } from 'aws-amplify'
import { listGroups, listEvents, getEvent, getGroup, groupByCustomFilter, eventByAccess, groupByAccess } from '../../graphql/queries'

const recordReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_groups': case 'fetch_events': case 'fetch_filtered_events': case 'fetch_filtered_groups':
        case 'filter_group_by_get': case 'filter_event_by_get': case 'event_suggestion': case 'group_suggestion':
        case 'get_event':
            return action.payload;
        case 'reset_state':
            return action.payload;
        default:
            return state;
    }
}

const resetState = dispatch => (resettingstate = []) => {
    
    
    dispatch({ type: 'reset_state', payload: resettingstate })
}

const fetchGroups = dispatch => {
    return async () => {
        try {
            const groupData = await API.graphql(graphqlOperation(listGroups));
            
            
            dispatch({ type: 'fetch_groups', payload: groupData.data.listGroups.items })
        } catch (error) {
            
        }
    }
}

const fetchFilteredGroups = dispatch => async (time, type = null, filter) => {
    try {
        if (filter != "" && filter !== undefined && filter !== null) {
            
            const filterCapitalized = filter.charAt(0).toUpperCase() + filter.slice(1);
            const filterLowered = filter.charAt(0).toLowerCase() + filter.slice(1);
            
            const groupData = await API.graphql(graphqlOperation(listGroups, {
                filter: {
                    createdAt: { ge: time ? time : "1995-02-26T06:06:45.958Z" },
                    or: [(type.length === 0 || type === null) ? { groupType: { attributeExists: true } } : type],
                    or: [
                        { groupName: { contains: filterCapitalized } },
                        { groupName: { contains: filterLowered } }
                    ]
                }
            }));
            
            
            dispatch({ type: 'fetch_filtered_groups', payload: groupData.data.listGroups.items })
        } else {
            const groupData = await API.graphql(graphqlOperation(listGroups, {
                filter: {
                    createdAt: { ge: time ? time : "1995-02-26T06:06:45.958Z" },
                    or: [(type.length === 0 || type === null) ? { groupType: { attributeExists: true } } : type]
                }
            }));
            
            
            dispatch({ type: 'fetch_filtered_groups', payload: groupData.data.listGroups.items })
        }
    } catch (error) {
        
    }
}

const fetchEvents = dispatch => {
    return async () => {
        try {
            const eventData = await API.graphql(graphqlOperation(listEvents));
            
            
            dispatch({ type: 'fetch_events', payload: eventData.data.listEvents.items })
        } catch (error) {
            
            
        }
    }
}

const fetchFilteredEvents = dispatch => async (date = null, area, category, userInput) => {
    try {
        let eventData;
        var today = new Date();
        

        if (userInput !== "") {
            
            const filterCapitalized = userInput.charAt(0).toUpperCase() + userInput.slice(1);
            const filterLowered = userInput.charAt(0).toLowerCase() + userInput.slice(1);
            

            if (area.length === 0 && category.length !== 0) {
                eventData = await API.graphql(graphqlOperation(listEvents, {
                    filter: {
                        or: [
                            { eventName: { contains: filterCapitalized } },
                            { eventName: { contains: filterLowered } },

                        ],
                        and: {
                            or: category
                        },
                        eventLocation: { attributeExists: true },
                        eventTime: date ? {
                            between:
                                [today
                                    , date]
                        } : {
                            ge: today
                        }
                    }
                }));
            } else if (area.length !== 0 && category.length === 0) {
                eventData = await API.graphql(graphqlOperation(listEvents, {
                    filter: {
                        or: [
                            { eventName: { contains: filterCapitalized } },
                            { eventName: { contains: filterLowered } },

                        ],
                        and: {
                            or: area
                        },
                        eventType: { attributeExists: true },
                        eventTime: date ? {
                            between:
                                [today
                                    , date]
                        } : {
                            ge: today
                        }
                    }
                }));
            } else {
                eventData = await API.graphql(graphqlOperation(listEvents, {
                    filter: {
                        or: [
                            { eventName: { contains: filterCapitalized } },
                            { eventName: { contains: filterLowered } },

                        ],
                        eventType: { attributeExists: true },
                        eventLocation: { attributeExists: true },
                        eventTime: date ? {
                            between:
                                [today
                                    , date]
                        } : {
                            ge: today
                        }
                    }
                }));
            }


            
            
            dispatch({ type: 'fetch_filtered_events', payload: eventData.data.listEvents.items })
        } else {
            
            if (area.length === 0 && category.length !== 0) {
                eventData = await API.graphql(graphqlOperation(listEvents, {
                    filter: {
                        and: {
                            or: category
                        },
                        eventLocation: { attributeExists: true },
                        eventTime: date ? {
                            between:
                                [today
                                    , date]
                        } : {
                            ge: today
                        }
                    }
                }));
            } else if (area.length !== 0 && category.length === 0) {
                eventData = await API.graphql(graphqlOperation(listEvents, {
                    filter: {
                        and: {
                            or: area
                        },
                        eventType: { attributeExists: true },
                        eventTime: date ? {
                            between:
                                [today
                                    , date]
                        } : {
                            ge: today
                        }
                    }
                }));
            } else {
                eventData = await API.graphql(graphqlOperation(listEvents, {
                    filter: {
                        eventType: { attributeExists: true },
                        eventLocation: { attributeExists: true },
                        eventTime: date ? {
                            between:
                                [today
                                    , date]
                        } : {
                            ge: today
                        }
                    }
                }));
            }
            
            dispatch({ type: 'fetch_filtered_events', payload: eventData.data.listEvents.items })
        }

    } catch (error) {
        
        
    }
}

const getOneEvent = dispatch => async (eventid) => {
    //
    //return (async () => {
    try {
        
        const eventData = await API.graphql(graphqlOperation(getEvent, { id: eventid }));
        
        return eventData.data.getEvent;
        //dispatch({ type: 'get_event', payload: groupData.data.getEvent })
    } catch (error) {
        
        
    }

    //)
}

const eventSuggestion = dispatch => async (userInput) => {
    try {
        if (userInput !== "") {

            const filterCapitalized = userInput.charAt(0).toUpperCase() + userInput.slice(1);
            const filterLowered = userInput.charAt(0).toLowerCase() + userInput.slice(1);
            const eventData = await API.graphql(graphqlOperation(eventByAccess, {
                privateAccess: "false",
                filter: {
                    or: [
                        { eventName: { contains: filterCapitalized } },
                        { eventName: { contains: filterLowered } }
                    ]
                },
                limit: 5
            }));
            
            
            dispatch({ type: 'event_suggestion', payload: eventData.data.eventByAccess.items })
        }
    } catch (error) {
        
        
    }

    //)
}


const groupSuggestion = dispatch => async (userInput) => {
    try {
        if (userInput !== "") {

            const filterCapitalized = userInput.charAt(0).toUpperCase() + userInput.slice(1);
            const filterLowered = userInput.charAt(0).toLowerCase() + userInput.slice(1);
            const groupData = await API.graphql(graphqlOperation(groupByAccess, {
                privateAccess: "false",
                filter: {
                    or: [
                        { groupName: { contains: filterCapitalized } },
                        { groupName: { contains: filterLowered } }
                    ]
                },
                limit: 5
            }));
            
            
            dispatch({ type: 'group_suggestion', payload: groupData.data.groupByAccess.items })
        }
    } catch (error) {
        
        
    }

    //)
}


const getOneGroup = dispatch => async (groupid) => {
    //
    //return (async () => {
    try {
        
        const groupData = await API.graphql(graphqlOperation(getGroup, { id: groupid }));
        
        
        return groupData.data.getGroup;
        // dispatch({ type: 'filter_group_by_get', payload: groupData.data.getGroup })
    } catch (error) {
        
        
    }

    //)
}

const defaultGroupFilter = dispatch => async (time, type, userInput) => {
    try {

        var today = new Date();


        if (userInput !== "") {

            const filterCapitalized = userInput.charAt(0).toUpperCase() + userInput.slice(1);
            const filterLowered = userInput.charAt(0).toLowerCase() + userInput.slice(1);
            // 
            const groupData = await API.graphql(graphqlOperation(groupByCustomFilter, {
                createdAt: { ge: time ? time : today }, groupType: type,
                filter: {
                    or: [
                        { groupName: { contains: filterCapitalized } },
                        { groupName: { contains: filterLowered } }
                    ]
                }
            }));
            // 
            // 
            dispatch({ type: 'filter_group_by_get', payload: groupData.data.groupByCustomFilter.items })
        } else {
            // 
            const groupData = await API.graphql(graphqlOperation(groupByCustomFilter, {
                createdAt: { ge: time ? time : today }, groupType: type
            }));
            // 
            // 
            dispatch({ type: 'filter_group_by_get', payload: groupData.data.groupByCustomFilter.items })
        }
    } catch (error) {
        
        
    }
}


const filterEventsByTag = dispatch => async (tag) => {
    try {
        const filterCapitalized = tag.charAt(0).toUpperCase() + tag.slice(1);
        const filterLowered = tag.charAt(0).toLowerCase() + tag.slice(1);
        
        const eventData = await API.graphql(graphqlOperation(listEvents, {
            filter: {
                eventTime: { ge: "1995-02-26T06:06:45.958Z" },
                or: [
                    { eventName: { contains: filterCapitalized } },
                    { eventName: { contains: filterLowered } },
                    { eventTag: { contains: filterCapitalized } },
                    { eventTag: { contains: filterLowered } }
                ],

            }
        }));
        
        
        dispatch({ type: 'fetch_filtered_events', payload: eventData.data.listEvents.items })
    } catch (error) {
        
        
    }
}
// const defaultEventFilter = dispatch => async (time, type, userInput) => {
//     try {
//         if (userInput !== "") {

//             const filterCapitalized = userInput.charAt(0).toUpperCase() + userInput.slice(1);
//             const filterLowered = userInput.charAt(0).toLowerCase() + userInput.slice(1);
//             // 
//             const groupData = await API.graphql(graphqlOperation(groupByCustomFilter, {
//                 createdAt: { ge: time }, groupType: type,
//                 filter: {
//                     or: [
//                         { groupName: { contains: filterCapitalized } },
//                         { groupName: { contains: filterLowered } }
//                     ]
//                 }
//             }));
//             // 
//             // 
//             dispatch({ type: 'filter_event_by_get', payload: groupData.data.groupByCustomFilter.items })
//         } else {
//             // 
//             const groupData = await API.graphql(graphqlOperation(groupByCustomFilter, {
//                 createdAt: { ge: time }, groupType: type
//             }));
//             // 
//             // 
//             dispatch({ type: 'filter_event_by_get', payload: groupData.data.groupByCustomFilter.items })
//         }
//     } catch (error) {
//         
//         
//     }
// }


export const { Provider, Context } = createDataContext(recordReducer, {
    fetchGroups, fetchFilteredGroups, fetchEvents, fetchFilteredEvents, getOneGroup,
    defaultGroupFilter, eventSuggestion, groupSuggestion, getOneEvent, filterEventsByTag,
    resetState
}, []);
