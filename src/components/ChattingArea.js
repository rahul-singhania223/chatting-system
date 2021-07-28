import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PhoneIcon from '@material-ui/icons/Phone';
import VideocamIcon from '@material-ui/icons/Videocam';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MenuIcon from '@material-ui/icons/Menu';
import CreateArea from './CreateArea';
import { db } from '../firebase';



function ChattingArea(props) {

    const connectionId = props.connectionId;       //-----------SAVING CONNECTION ID FOR GETTING DATA-------------//
    const loginId = props.loginId;                 //----------SAVING LOGIN ID TO BUILD A CONNECTION--------------//
    const [user, setUser] = useState();
    const [logger, setLogger] = useState();
    const [messeges, setMesseges] = useState([]);

    const getUser = (id) => {
        if(connectionId) {        
            db.collection('user').doc(id).get().then((doc) => {
                if(doc.exists) {
                    setUser(doc.data())
                }
            })            
        }
    }

    const getMes = () => {
        db.collection(loginId).orderBy('timeStamp', 'asc').onSnapshot((snapshot) => {
            let tempItems = '';
            tempItems = snapshot.docs.map((doc) => (
                doc.data()
            ))

            setMesseges(tempItems)
        })

        db.collection('user').doc(loginId).get().then((doc) => {
            if(doc.exists) {
                setLogger(doc.data())
            }
        })
    }        

   if(connectionId) {
       getUser(connectionId);
   }
   
   useEffect(() => {
        getMes();
   }, [])   
  

   const showContacts = () => {
       let elm = document.getElementById('contact-area');
       elm.style.left = 0;
   }
   

    return (
        <Container>
            <HeaderContainer >                
                <UserContainer>
                    <MenuIcon onClick={showContacts} />
                    <Avatar style={user ? {backgroundImage: `url(${user.image})`} : null} />
                    <Name>{user ? user.name : null}</Name>
                </UserContainer>

                <OptionContainer>
                    <Option><PhoneIcon /></Option>
                    <Option><VideocamIcon /></Option>
                    <Option><MoreHorizIcon /></Option>
                </OptionContainer>
            </HeaderContainer>

            <MessegeArea id='ms-area' style={{maxHeight: (window.innerHeight - 100)}}>

                {
                    messeges.map((data) => {
                        if(data.target === connectionId || data.sender === connectionId) {

                            //---------CALCULATING TIME OF THE MESSEGE CREATED-----------------//

                            const months = ['jan', 'fab', 'march', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                            let today = new Date((data.timeStamp)*1000);
                            let date = '';
                            if(today.getDate() < 10) {
                                date = '0' + today.getDate();
                            } else {date = today.getDate()}
                            let month = months[today.getMonth()];
                            let hours = today.getHours();
                            let minutes = today.getMinutes();
                            
                            let time = date + ' ' + month + ', ' + hours + ':' + minutes;
                            
                            // ----------------------------------------------------------------------
                            
                            
                            if(data.sender===loginId) {
                                return (
                                    <Messege>
                                         <div className='my-ms-container'>
                                            <MessegeAvatar style={logger ? {backgroundImage: `url(${logger.image})`} : null} />
                                            <div className='my-messege'>{data.messege}</div>
                                            <Time>{time}</Time>                    
                                        </div>
                                    </Messege>
                                )
                            } else {
                                return (                              
                                    <Messege>
                                        <MessegeAvatar style={user ? {backgroundImage: `url(${user.image})`} : null} />
                                        <div className='others-messege'>{data.messege}</div>
                                        <Time>{time}</Time>
                                    </Messege>
                                )
                            }
                           
                        }
                    })
                }
                
            </MessegeArea>

            <CreateArea connectionId={connectionId} loginId={loginId} />
            
        </Container>
    );
}

export default ChattingArea;

const Container = styled.div`
    flex: 1;
    
`;

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #F7DAD9;
    padding: 20px 11px;
    transition: all linear 0.4s;

    @media(max-width: 768px) {
        padding: 11px;
    }
`;

const UserContainer = styled.div`
    display: flex;
    align-items: center;

    svg {
        margin-right: 11px;
        font-size: 30px;
        cursor: pointer;
        display: none;        
    }

    @media(max-width: 768px) {
        svg {
            display: block;
        }
    }
`;

const Avatar = styled.div`
    width: 50px;
    height: 50px;
    background-color: #e7e7e7;
    border-radius: 50%;

    background-size: cover;
    background-position: center;
`;

const Name = styled.div`
    padding-left: 16px;
    font-size: 20px;
    font-weight: 700;
    
`;

const OptionContainer = styled.div`
    display: flex;
    align-items: center;
    padding-right: 20px;    
`;

const Option = styled.div`
    padding-left: 29px;
    cursor: pointer;
`;

const AudioCall = styled.div``;

const VideoCall = styled.div``;

const More = styled.div``;

const MessegeArea = styled.div`
    padding-top: 100px;
    padding: 100px 20px 100px 20px;

    overflow-y : auto;
`;

const Messege = styled.div`  
       
    margin-bottom: 20px;
    display: flex;

    div {
        padding: 11px 16px;
        border-radius: 30px;       
    }
`;


const MessegeAvatar = styled.div`
    width: 30px;
    height: 30px;
    background-color: #e7e7e7;
    border-radius: 50%;
    margin-right: 9px;
    margin-top: 11px;

    background-size: cover;
    background-position: center;
    
`;

const Time = styled.div`
    font-size: 0.7rem;
    color: #5b5b5b;
    
`;