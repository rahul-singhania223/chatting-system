import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ImageIcon from '@material-ui/icons/Image';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import SendIcon from '@material-ui/icons/Send';
import { db } from '../firebase';
import firebase from 'firebase';


function CreateArea(props) {

    const loginId = props.loginId;
    const connectionId = props.connectionId;

    const [input, setInput] = useState('');

    //-------DIFINING THE WIDTH OF CREATE CONTAINER----------//

    const [width, setWidth] = useState(window.innerWidth - 370);
    
    window.addEventListener('resize', () => {
        setWidth(window.innerWidth - 370);
    })

    

    const sendMessege = (e) => {        
        const ms = {
            messege: input,
            target: connectionId,
            sender: loginId,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp()
            
        }
        
        setInput('');
        e.preventDefault();
        db.collection(loginId).add(ms);
        db.collection(connectionId).add(ms);
    }


  


    return (
        <Container style={window.innerWidth>768 ? {width: width}: {width: '100%'}}>
            <CreateContainer>
                <OptionsContainer style={input ? {display: 'none'} : null}>
                    <Option><ImageIcon /></Option>
                    <Option><InsertDriveFileIcon /></Option>
                    <Option><GifIcon /></Option>
                </OptionsContainer>
                
                <form >
                    <InputContainer>                    
                            <input value={input} onChange={e => setInput(e.target.value)} type='text' placeholder='Aa' />
                            <Option><EmojiEmotionsIcon /></Option>                    
                    </InputContainer>

                    <AdditionalContainer>
                        <SubmitBtn  onClick={input ? (e) => sendMessege(e) : null}>{input ? <SendIcon /> : <ThumbUpAltIcon />}</SubmitBtn>
                    </AdditionalContainer>                
                </form>
            </CreateContainer>            
        </Container>
    );
}

export default CreateArea;


const Container = styled.div`
    display: flex;        
    position: fixed;
    bottom: 0;
    padding: 11px 20px;
    background-color: #fff;
`;

const CreateContainer = styled.div`
    display: flex;
    align-items: center;
    flex: 1;

    form {
        display: flex;
        align-items: center;
        flex: 1;
    }
`;

const OptionsContainer = styled.div`
    display: flex;
    align-items: center;
`;

const Option = styled.div`
    margin: 0 6px;
    cursor: pointer;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    background-color: #dddd;
    margin: 0 11px;
    border-radius: 20px;
    height: 40px;
    padding: 0 11px;

    form {
        flex: 1;
        display: flex;
    }

    input {
        height: 100%;
        background: none;
        border: none;
        flex: 1;
        font-size: 1.1rem;

        :focus {
            outline: none;
        }
    }
`;

const AdditionalContainer = styled.div``;

const SubmitBtn = styled.button`
    background: none;
    border: none;
    cursor: pointer;
`;