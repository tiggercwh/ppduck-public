/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      type
      email
      name
      gender
      image
      interest
      expoPushToken
      joinedGeens {
        items {
          id
          geenID
          geen{
              id
              hostID
              geenDescription
              geenLocation
              geenName
              geenPhoto
              geenTime
            }
          userID
          attendance
          createdAt
          updatedAt
        }
        nextToken
      }
      likedGeens {
        items {
          id
          geenID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      joinedChats {
        items {
          id
          chatRoomID
          userID
          lastEnterTime
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $id: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        type
        email
        name
        gender
        image
        interest
        expoPushToken
        joinedGeens {
          nextToken
        }
        likedGeens {
          nextToken
        }
        joinedChats {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChatRoomParticipant = /* GraphQL */ `
  query GetChatRoomParticipant($id: ID!) {
    getChatRoomParticipant(id: $id) {
      id
      chatRoomID
      userID
      lastEnterTime
      chatRoom {
        id
        name
        image
        sharedImage
        chat {
          nextToken
          scannedCount
          count
        }
        user {
          nextToken
        }
        type
        createdAt
        updatedAt
      }
      user {
        id
        type
        email
        name
        gender
        image
        interest
        expoPushToken
        joinedGeens {
          nextToken
        }
        likedGeens {
          nextToken
        }
        joinedChats {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listChatRoomParticipants = /* GraphQL */ `
  query ListChatRoomParticipants(
    $id: ID
    $filter: ModelChatRoomParticipantFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listChatRoomParticipants(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        chatRoomID
        userID
        lastEnterTime
        chatRoom {
          id
          name
          image
          sharedImage
          type
          createdAt
          updatedAt
        }
        user {
          id
          type
          email
          name
          gender
          image
          interest
          expoPushToken
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      id
      name
      image
      sharedImage
      chat {
        items {
          id
          chatRoomID
          image
          text
          sender
          senderID
          reply
          createdAt
          replyID
          replyText
          replyName
          updatedAt
        }
        nextToken
        scannedCount
        count
      }
      user {
        items {
          id
          chatRoomID
          userID
          lastEnterTime
          createdAt
          updatedAt
        }
        nextToken
      }
      type
      createdAt
      updatedAt
    }
  }
`;
export const listChatRooms = /* GraphQL */ `
  query ListChatRooms(
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image
        sharedImage
        chat {
          scannedCount
          count
        }
        user {
          nextToken
        }
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChat = /* GraphQL */ `
  query GetChat($id: ID!) {
    getChat(id: $id) {
      id
      chatRoomID
      ChatRoom {
        id
        name
        image
        sharedImage
        chat {
          nextToken
          scannedCount
          count
        }
        user {
          nextToken
        }
        type
        createdAt
        updatedAt
      }
      
      image
      text
      sender
      senderID
      reply
      createdAt
      replyID
      replyText
      replyName
      updatedAt
    }
  }
`;
export const listChats = /* GraphQL */ `
  query ListChats(
    $filter: ModelChatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        chatRoomID
        ChatRoom {
          id
          name
          image
          sharedImage
          type
          createdAt
          updatedAt
        }
        
        image
        text
        sender
        senderID
        reply
        createdAt
        replyID
        replyText
        replyName
        updatedAt
      }
      nextToken
      scannedCount
      count
    }
  }
`;
export const getGeenParticipant = /* GraphQL */ `
  query GetGeenParticipant($id: ID!) {
    getGeenParticipant(id: $id) {
      id
      geenID
      userID
      attendance
      geen {
        id
        hostID
        chatRoomID
        chatroom {
          id
          name
          image
          sharedImage
          type
          createdAt
          updatedAt
        }
        geenType
        geenName
        geenTime
        geenLocation
        geenDescription
        geenPhoto
        geenHoster {
          id
          type
          email
          name
          gender
          image
          interest
          expoPushToken
          createdAt
          updatedAt
        }
        geenTag
        participants {
          nextToken
        }
        likedUsers {
          nextToken
        }
        maximumParti
        longitude
        latitude
        isFeatured
        createdAt
        updatedAt
      }
      user {
        id
        type
        email
        name
        gender
        image
        interest
        expoPushToken
        joinedGeens {
          nextToken
        }
        joinedChats {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listGeenParticipants = /* GraphQL */ `
  query ListGeenParticipants(
    $filter: ModelGeenParticipantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGeenParticipants(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        geenID
        userID
        attendance
        geen {
          id
          hostID
          chatRoomID
          geenType
          geenName
          geenTime
          geenLocation
          geenDescription
          geenPhoto
          geenTag
          maximumParti
          longitude
          latitude
          isFeatured
          createdAt
          updatedAt
        }
        user {
          id
          type
          email
          name
          gender
          image
          interest
          expoPushToken
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLikedGeen = /* GraphQL */ `
  query GetLikedGeen($id: ID!) {
    getLikedGeen(id: $id) {
      id
      geenID
      userID
      geen {
        id
        hostID
        chatRoomID
        chatroom {
          id
          name
          image
          sharedImage
          type
          createdAt
          updatedAt
        }
        geenType
        geenName
        geenTime
        geenLocation
        geenDescription
        geenPhoto
        geenHoster {
          id
          type
          email
          name
          gender
          image
          interest
          expoPushToken
          createdAt
          updatedAt
        }
        geenTag
        participants {
          nextToken
        }
        likedUsers {
          nextToken
        }
        maximumParti
        longitude
        latitude
        isFeatured
        createdAt
        updatedAt
      }
      user {
        id
        type
        email
        name
        gender
        image
        interest
        expoPushToken
        joinedGeens {
          nextToken
        }
        likedGeens {
          nextToken
        }
        joinedChats {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listLikedGeens = /* GraphQL */ `
  query ListLikedGeens(
    $filter: ModelLikedGeenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLikedGeens(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        geenID
        userID
        geen {
          id
          hostID
          chatRoomID
          geenType
          geenName
          geenTime
          geenLocation
          geenDescription
          geenPhoto
          geenTag
          maximumParti
          longitude
          latitude
          isFeatured
          createdAt
          updatedAt
        }
        user {
          id
          type
          email
          name
          gender
          image
          interest
          expoPushToken
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGeen = /* GraphQL */ `
  query GetGeen($id: ID!) {
    getGeen(id: $id) {
      id
      hostID
      chatRoomID
      chatroom {
        id
        name
        image
        sharedImage
        chat {
          nextToken
          scannedCount
          count
        }
        user {
          nextToken
        }
        type
        createdAt
        updatedAt
      }
      geenType
      geenName
      geenTime
      geenLocation
      geenDescription
      geenPhoto
      geenHoster {
        id
        type
        email
        name
        gender
        image
        interest
        expoPushToken
        joinedGeens {
          nextToken
        }
        likedGeens {
          nextToken
        }
        joinedChats {
          nextToken
        }
        createdAt
        updatedAt
      }
      geenTag
      participants {
        items {
          id
          geenID
          userID
          user{
            id
            name
            image
          }
          attendance
          createdAt
          updatedAt
        }
        nextToken
      }
      likedUsers {
        items {
          id
          geenID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      maximumParti
      longitude
      latitude
      isFeatured
      createdAt
      updatedAt
    }
  }
`;
export const listGeens = /* GraphQL */ `
  query ListGeens(
    $filter: ModelGeenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGeens(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        hostID
        chatRoomID
        chatroom {
          id
          name
          image
        }
        geenType
        geenName
        geenTime
        geenLocation
        geenDescription
        geenPhoto
        geenHoster {
          id
          type
          email
          name
          image
        }
        geenTag
        participants {
          nextToken
        }
        likedUsers {
          items {
            id
          }
          nextToken
        }
        maximumParti
        longitude
        latitude
        isFeatured
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFriends = /* GraphQL */ `
  query GetFriends($id: ID!) {
    getFriends(id: $id) {
      id
      userID
      friendID
      friends {
        id
        type
        email
        name
        gender
        image
        interest
        expoPushToken
        joinedGeens {
          nextToken
        }
        likedGeens {
          nextToken
        }
        joinedChats {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listFriends = /* GraphQL */ `
  query ListFriends(
    $filter: ModelFriendsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFriends(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        friendID
        friends {
          id
          type
          email
          name
          gender
          image
          interest
          expoPushToken
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReport = /* GraphQL */ `
  query GetReport($id: ID!) {
    getReport(id: $id) {
      id
      reportUser
      reportGeen
      reportCategory
      reportDetails
      createdAt
      updatedAt
    }
  }
`;
export const listReports = /* GraphQL */ `
  query ListReports(
    $filter: ModelReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        reportUser
        reportGeen
        reportCategory
        reportDetails
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userByEmail = /* GraphQL */ `
  query UserByEmail(
    $email: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        email
        name
        gender
        image
        interest
        expoPushToken
        joinedGeens {
          items {
            id
            geenID
            geen{
              id
              hostID
              geenDescription
              geenLocation
              geenName
              geenPhoto
              geenTime
            }
          }
          nextToken
        }
        likedGeens {
          items {
            id
            geenID
          }
          nextToken
        }
        joinedChats {
          items {
            id
            chatRoomID
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const getUnreadChat = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      joinedChats {
        items {
          id
          chatRoomID
          userID
          lastEnterTime
          chatRoom {
          chat (sortDirection: DESC){
            items {
              createdAt
              }
            }
          }
        }
        nextToken
      }
    }
  }`;

export const getUserChat = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      joinedChats {
        items {
          id
          chatRoomID
          userID
          createdAt
          updatedAt
          lastEnterTime
          chatRoom {
          name
          type
          image
          chat (sortDirection: DESC, limit: 1){
            items {
              
              image
              text
              sender
              senderID
              reply
              replyID
              chatRoomID
              createdAt
              }
              scannedCount
              count
            }
          user (limit: 2){
            items
              {
                user{
                  id
                  image
                  name
                }
              }
            }
          }
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;