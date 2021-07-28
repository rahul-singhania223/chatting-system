import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Contact from './Contact';
import { db } from '../firebase';

function ContactArea(props) {

    const loginId = props.loginId;         // ---------SAVING LOGIN ID TO GET USER DATA---------------//
    const [user, setUser] = useState();    //----------WHO LOGED IN CURRENTLY-----------------//
    const [users, setUsers] = useState([])    //------------ALL REGISTERED USERS---------------//
    const [height, setHeight] = useState(window.innerHeight - 145)
    
    
    const getUsers = () => {
        db.collection('user').doc(loginId).get().then((doc) => {
            if(doc.exists) {
                setUser(doc.data());
            }
        })

        db.collection('user').onSnapshot((snapshot) => {
            let tempItems = '';
            tempItems =  snapshot.docs.map((doc) => (
                {id: doc.id, data: doc.data()}
            ))

            setUsers(tempItems);
        })
    }


    useEffect(() => {
        getUsers();
    }, [])
    

    window.onresize = () => {setHeight(window.innerHeight- 145)};

    const hideContacts = () => {
        let elm = document.getElementById('contact-area');
        elm.style.left = -400 + 'px';
    }
        

    return (
        <Container id='contact-area'>
            <HeaderContainer>
                <UserContainer>
                    <UserAvatar style={user ? {backgroundImage: `url(${user.image})`} : null} />
                    <h2>chat</h2>
                    <CloseIcon onClick={hideContacts} />
                    
                </UserContainer>

                <SearchContainer>
                    <BackBtn id='back-btn'><ArrowBackIcon /></BackBtn>
                    <SearchInput>
                        <SearchIcon />
                        <input type='text' />
                    </SearchInput>
                </SearchContainer>
            </HeaderContainer>

            <ContactList style={{maxHeight: height}}>
                {users.map((user, index) => {
                    
                    if(user.id !== loginId) {
                        return (                           
                                
                            <Contact class={index===0 ? 'active-contact' : null} changeConnection={props.changeConnection} user={user} />
                                                                           
                        )   
                    }
                })}     
            </ContactList>           
        </Container>
    );
}

export default ContactArea;


const Container = styled.div`
    width: 370px;
    height: 100vh;
    background-color: #F38BA0;
    box-shadow: 2px 2px #bbb;
    transition: all linear 0.3s;

    @media(max-width: 768px) {
       position: absolute;
       z-index: 1;
       left: -400px;
       width: 300px;
    }
    
`;


const HeaderContainer = styled.div`
    box-shadow: 1px 1px #bbb;
    padding-bottom: 20px;
`;

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px 11px;

    h2 {
        text-transform: capitalize;
        padding-left: 11px;        
    }

    svg {
        margin-left: auto;
        font-size: 30px;
        cursor: pointer;

        @media(min-width: 770px) {
            display: none;
        }
    }
`;

const UserAvatar = styled.div`
    width: 45px;
    height: 45px;
    background-color: #e7e7e7;
    border-radius: 50%;

    background-size: cover;
    background-position: center;
    
`;

const SearchContainer = styled.div`
    padding: 0 11px;
    display: flex;
    align-items: center;

    :focus-within {
        #back-btn {
            display: grid;
        }
    }
`;

const BackBtn = styled.div`
    margin-right: 11px;
    width: 40px;
    height: 40px;
    background-color: #e7e7e7;
    display: grid;
    place-items: center;
    border-radius: 50%;
    cursor: pointer;
    display: none;

    svg {
        font-size: 20px;
        color: #5b5b5b;
    }
`;

const SearchInput = styled.div`
    background-color: #e7e7e7;
    display: flex;
    align-items: center;
    height: 40px;
    border-radius: 20px;
    padding: 0 11px;
    flex: 1;


    input {
        background: none;
        border: none;
        height: 100%;
        flex: 1;        

        :focus {
            outline: none;
        }
    }

    svg {
        margin-right: 11px;
        color: #5b5b5b;
    }

    
`;


const ContactList = styled.div`
    padding: 20px 6px;
    max-height: 100vh;
    box-sizing: border-box;
    
    :hover {
        overflow-y: auto;
    }
    
`;
