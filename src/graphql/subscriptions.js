/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateChatByChatRoom = /* GraphQL */ `
  subscription OnCreateChatByChatRoom($chatRoomID: ID!) {
    onCreateChatByChatRoom(chatRoomID: $chatRoomID) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateChatRoomParticipant = /* GraphQL */ `
  subscription OnCreateChatRoomParticipant {
    onCreateChatRoomParticipant {
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
export const onUpdateChatRoomParticipant = /* GraphQL */ `
  subscription OnUpdateChatRoomParticipant {
    onUpdateChatRoomParticipant {
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
export const onDeleteChatRoomParticipant = /* GraphQL */ `
  subscription OnDeleteChatRoomParticipant {
    onDeleteChatRoomParticipant {
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
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom {
    onCreateChatRoom {
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
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom {
    onUpdateChatRoom {
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
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom {
    onDeleteChatRoom {
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
export const onCreateChat = /* GraphQL */ `
  subscription OnCreateChat {
    onCreateChat {
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
export const onUpdateChat = /* GraphQL */ `
  subscription OnUpdateChat {
    onUpdateChat {
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
export const onDeleteChat = /* GraphQL */ `
  subscription OnDeleteChat {
    onDeleteChat {
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
export const onCreateGeenParticipant = /* GraphQL */ `
  subscription OnCreateGeenParticipant {
    onCreateGeenParticipant {
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
export const onUpdateGeenParticipant = /* GraphQL */ `
  subscription OnUpdateGeenParticipant {
    onUpdateGeenParticipant {
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
export const onDeleteGeenParticipant = /* GraphQL */ `
  subscription OnDeleteGeenParticipant {
    onDeleteGeenParticipant {
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
export const onCreateLikedGeen = /* GraphQL */ `
  subscription OnCreateLikedGeen {
    onCreateLikedGeen {
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
export const onUpdateLikedGeen = /* GraphQL */ `
  subscription OnUpdateLikedGeen {
    onUpdateLikedGeen {
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
export const onDeleteLikedGeen = /* GraphQL */ `
  subscription OnDeleteLikedGeen {
    onDeleteLikedGeen {
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
export const onCreateGeen = /* GraphQL */ `
  subscription OnCreateGeen {
    onCreateGeen {
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
export const onUpdateGeen = /* GraphQL */ `
  subscription OnUpdateGeen {
    onUpdateGeen {
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
export const onDeleteGeen = /* GraphQL */ `
  subscription OnDeleteGeen {
    onDeleteGeen {
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
export const onCreateFriends = /* GraphQL */ `
  subscription OnCreateFriends {
    onCreateFriends {
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
export const onUpdateFriends = /* GraphQL */ `
  subscription OnUpdateFriends {
    onUpdateFriends {
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
export const onDeleteFriends = /* GraphQL */ `
  subscription OnDeleteFriends {
    onDeleteFriends {
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
