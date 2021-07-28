import React, { useState } from 'react';
import styled from 'styled-components';
import ChattingArea from './ChattingArea';
import ContactArea from './ContactArea';


function ChatSystem(props) {

    const loginId = props.loginId;
    const [connectionId, setConnection] = useState('');

    const changeConnection = (id) => {
        setConnection(id);
        
    }
   
    return (
        <Container>
            <ContactArea changeConnection={changeConnection} loginId={loginId ? loginId : null} />       
            <ChattingArea loginId={loginId} connectionId={connectionId} />
        </Container>
    );
}

export default ChatSystem;

const Container =  styled.div`
    display: flex;
`;
