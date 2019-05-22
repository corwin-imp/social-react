import * as React from 'react'
import styled from 'styled-components'
import ChatsNavbar from './ChatsNavbar'
import ChatsList from './ChatsList'

const Container = styled.div `
  height: 100vh;
`

const ChatsListScreen = () => {

    return (
        <Container>
            33333
            <ChatsNavbar />
            <ChatsList />
        </Container>
    )
}

export default ChatsListScreen
