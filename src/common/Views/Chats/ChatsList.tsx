import { List, ListItem } from '@material-ui/core'
import moment from 'moment'
import * as React from 'react'
import { useState, useMemo } from 'react'
import styled from 'styled-components'


declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN?: string;
      NODE_ENV?: 'development' | 'production';
      REACT_APP_SERVER_URL?: string;
      PWD?: string;
    }
  }
}

const Container : any  = styled.div `
  height: calc(100% - 56px);
  overflow-y: overlay;
`

const StyledList : any = styled(List) `
  padding: 0 !important;
`

const StyledListItem : any  = styled(ListItem) `
  height: 76px;
  padding: 0 15px;
  display: flex;
`

const ChatPicture : any  = styled.img `
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
`

const ChatInfo : any  = styled.div `
  width: calc(100% - 60px);
  height: 46px;
  padding: 15px 0;
  margin-left: 10px;
  border-bottom: 0.5px solid silver;
  position: relative;
`

const ChatName : any  = styled.div `
  margin-top: 5px;
`

const MessageContent : any  = styled.div `
  color: gray;
  font-size: 15px;
  margin-top: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const MessageDate : any  = styled.div `
  position: absolute;
  color: gray;
  top: 20px;
  right: 0;
  font-size: 13px;
`

const getChatsQuery : any  = `
  query GetChats {
    chats {
      id
      name
      picture
      lastMessage {
        id
        content
        createdAt
        isMine
      }
    }
  }
`

const ChatsList = () => {
  const [chats, setChats] = useState([])

  useMemo(async () => {
    const body = await fetch(`${process.env.REACT_APP_SERVER_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: getChatsQuery }),
    })
    const { data: { chats } } = await body.json()
    setChats(chats)
  }, [true])
  console.log('renderC');
  return (
    <Container>
      <StyledList>
        {chats.map((chat) => (
          <StyledListItem key={chat.id} button>
            <ChatPicture src={chat.picture} />
            <ChatInfo>
              <ChatName>{chat.name}</ChatName>
              {chat.lastMessage && (
                <React.Fragment>
                  <MessageContent>{chat.lastMessage.content}</MessageContent>
                  <MessageDate>{moment(chat.lastMessage.createdAt).format('HH:mm')}</MessageDate>
                </React.Fragment>
              )}
            </ChatInfo>
          </StyledListItem>
        ))}
      </StyledList>
    </Container>
  )
}

export default ChatsList