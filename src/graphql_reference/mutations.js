/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createChatRoomParticipant = /* GraphQL */ `
  mutation CreateChatRoomParticipant(
    $input: CreateChatRoomParticipantInput!
    $condition: ModelChatRoomParticipantConditionInput
  ) {
    createChatRoomParticipant(input: $input, condition: $condition) {
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
export const updateChatRoomParticipant = /* GraphQL */ `
  mutation UpdateChatRoomParticipant(
    $input: UpdateChatRoomParticipantInput!
    $condition: ModelChatRoomParticipantConditionInput
  ) {
    updateChatRoomParticipant(input: $input, condition: $condition) {
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
export const deleteChatRoomParticipant = /* GraphQL */ `
  mutation DeleteChatRoomParticipant(
    $input: DeleteChatRoomParticipantInput!
    $condition: ModelChatRoomParticipantConditionInput
  ) {
    deleteChatRoomParticipant(input: $input, condition: $condition) {
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
export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
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
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
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
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
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
export const createChat = /* GraphQL */ `
  mutation CreateChat(
    $input: CreateChatInput!
    $condition: ModelChatConditionInput
  ) {
    createChat(input: $input, condition: $condition) {
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
export const updateChat = /* GraphQL */ `
  mutation UpdateChat(
    $input: UpdateChatInput!
    $condition: ModelChatConditionInput
  ) {
    updateChat(input: $input, condition: $condition) {
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
export const deleteChat = /* GraphQL */ `
  mutation DeleteChat(
    $input: DeleteChatInput!
    $condition: ModelChatConditionInput
  ) {
    deleteChat(input: $input, condition: $condition) {
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
export const createGeenParticipant = /* GraphQL */ `
  mutation CreateGeenParticipant(
    $input: CreateGeenParticipantInput!
    $condition: ModelGeenParticipantConditionInput
  ) {
    createGeenParticipant(input: $input, condition: $condition) {
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
export const updateGeenParticipant = /* GraphQL */ `
  mutation UpdateGeenParticipant(
    $input: UpdateGeenParticipantInput!
    $condition: ModelGeenParticipantConditionInput
  ) {
    updateGeenParticipant(input: $input, condition: $condition) {
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
export const deleteGeenParticipant = /* GraphQL */ `
  mutation DeleteGeenParticipant(
    $input: DeleteGeenParticipantInput!
    $condition: ModelGeenParticipantConditionInput
  ) {
    deleteGeenParticipant(input: $input, condition: $condition) {
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
export const createLikedGeen = /* GraphQL */ `
  mutation CreateLikedGeen(
    $input: CreateLikedGeenInput!
    $condition: ModelLikedGeenConditionInput
  ) {
    createLikedGeen(input: $input, condition: $condition) {
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
export const updateLikedGeen = /* GraphQL */ `
  mutation UpdateLikedGeen(
    $input: UpdateLikedGeenInput!
    $condition: ModelLikedGeenConditionInput
  ) {
    updateLikedGeen(input: $input, condition: $condition) {
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
export const deleteLikedGeen = /* GraphQL */ `
  mutation DeleteLikedGeen(
    $input: DeleteLikedGeenInput!
    $condition: ModelLikedGeenConditionInput
  ) {
    deleteLikedGeen(input: $input, condition: $condition) {
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
export const createGeen = /* GraphQL */ `
  mutation CreateGeen(
    $input: CreateGeenInput!
    $condition: ModelGeenConditionInput
  ) {
    createGeen(input: $input, condition: $condition) {
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
export const updateGeen = /* GraphQL */ `
  mutation UpdateGeen(
    $input: UpdateGeenInput!
    $condition: ModelGeenConditionInput
  ) {
    updateGeen(input: $input, condition: $condition) {
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
export const deleteGeen = /* GraphQL */ `
  mutation DeleteGeen(
    $input: DeleteGeenInput!
    $condition: ModelGeenConditionInput
  ) {
    deleteGeen(input: $input, condition: $condition) {
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
export const createFriends = /* GraphQL */ `
  mutation CreateFriends(
    $input: CreateFriendsInput!
    $condition: ModelFriendsConditionInput
  ) {
    createFriends(input: $input, condition: $condition) {
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
export const updateFriends = /* GraphQL */ `
  mutation UpdateFriends(
    $input: UpdateFriendsInput!
    $condition: ModelFriendsConditionInput
  ) {
    updateFriends(input: $input, condition: $condition) {
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
export const deleteFriends = /* GraphQL */ `
  mutation DeleteFriends(
    $input: DeleteFriendsInput!
    $condition: ModelFriendsConditionInput
  ) {
    deleteFriends(input: $input, condition: $condition) {
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
export const createReport = /* GraphQL */ `
  mutation CreateReport(
    $input: CreateReportInput!
    $condition: ModelReportConditionInput
  ) {
    createReport(input: $input, condition: $condition) {
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
export const updateReport = /* GraphQL */ `
  mutation UpdateReport(
    $input: UpdateReportInput!
    $condition: ModelReportConditionInput
  ) {
    updateReport(input: $input, condition: $condition) {
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
export const deleteReport = /* GraphQL */ `
  mutation DeleteReport(
    $input: DeleteReportInput!
    $condition: ModelReportConditionInput
  ) {
    deleteReport(input: $input, condition: $condition) {
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