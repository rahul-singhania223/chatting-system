import React from 'react';
import styled from 'styled-components';

function Contact(props) {

    const user = props.user;

    const handleClick = (e) => {
        props.changeConnection(user.id);
        document.getElementsByClassName('active-contact')[0].classList.remove('active-contact');
        e.target.classList.add('active-contact');
    }

    const handelLoad = () => {
        let connectionElement = document.getElementsByClassName('active-contact')[0];
        if(connectionElement) {
            props.changeConnection(connectionElement.getAttribute('id'))
        }
    }


    window.onload = handelLoad();
       

    return (
        <Container onLoad={() => console.log('loaded')} id={user.id} className={props.class} onClick={handleClick}>
            <Avatar style={{backgroundImage: `url(${user.data.image})`}} />
            <div>            
                <Name>{user.data.name}</Name>
                <LastMessege>you and Rahul singhania are cele...</LastMessege>            
            </div>
        </Container>
    );
}

export default Contact;

const Container = styled.div`
    display: flex;
    align-items: center;  
    margin-bottom: 20px;
    padding: 11px;
    border-radius: 14px;
    cursor: pointer;

    :hover {
        background-color: #e7e7e7;
    }
`;

const Avatar = styled.div`
    width: 60px;
    height: 60px;
    background-color: #e7e7e7e7;
    border-radius: 50%;
    margin-right: 16px;

    background-size: cover;
    background-position: center;

    @media(max-width: 768px) {
        width: 45px;
        height: 45px;
    }
`;

const Name = styled.h3``;

const LastMessege = styled.p`
    font-size: 14px;
    padding-top: 6px;

    @media(max-width: 768px) {
        font-size: 12px;
    }
`;