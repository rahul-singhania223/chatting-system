import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebase';
import titleImg from '../Imgs/signupForm.jpg';

function SignupForm(props) {

    const [login, setLogin] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [re, setRe] = useState('');
    const [users, setUsers] = useState([]);
    const [style, setStyle] = useState({display: 'none'})



    //-----STARTING THE LOG IN PROCESS----------//

    const handleClick = () => {          
        setLogin(!login);
    }

    
    //-----FUNCTION TO GET EXISTING USERS DATA------------//

    const getUsers = () => {                               
        db.collection('user').onSnapshot((snapshot) => {
            let tempItems = '';
            tempItems = snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            ))

            setUsers(tempItems)
        })
    }

    //----------FUNCTION TO START SIGN UP PROCESS--------//

    const signUp = (e) => {                          
        let flag = 0;

        //-----------CHECKING IF USER EXIST OR NOT--------//

        users.map((user) => {                        
            if(user.id === email) {                
                flag = 1;
                setStyle({
                    display: 'block',
                    color: 'red'
                })
            }
        })   
        
        //------------IF USER DOES NOT EXIST, WRITE TO DATABASE AND COMPLETE SIGN UP------//

        if(flag === 0) {                                
            db.collection('user').doc(email).set({
                name: name,
                password: password,                
            })
            
            props.setActive(email);
        }
                       
        e.preventDefault();
    }

    //-----FUNCTION TO START LOG IN PROCESS-------//

    const logIn = (e) => {
       users.map((user) => {
           if(user.id === email) {
               if(user.data.password === password) {
                   props.setActive(email);
               }
           } else {
               setStyle({
                   display: 'block',
                   color: 'red'
               })
           }
       }) 
       
        e.preventDefault();
    }


    useEffect(() => {
        getUsers();
    }, [])


    

        

    return (
        <Container>
            <LeftArea >
                <Title>Build a solid <span>relationship</span> with your freinds.</Title>
                <TitleImg ><img src={titleImg} alt='img' /></TitleImg>
            </LeftArea>

            <RightArea>
                <FormContainer>
                    <FormTitle>{login ? 'log in' : 'sign up'}</FormTitle>                
                    <form>
                        <p style={login ? {display: 'none'} : style}>Email has already registered. please log in.</p>
                        <InputArea style={login ? {display: 'none'} : {display: 'block'}}><input value={name} required='true' onChange={(e) => {setName(e.target.value)}} type='text' placeholder='Enter your full name' /></InputArea>
                        <InputArea><input value={email} required='true' onChange={(e) => {setEmail(e.target.value)}} type='email' placeholder='Enter your email address' /></InputArea>
                        <InputArea><input value={password} required='true' onChange={(e) => {setPassword(e.target.value)}} type='password' placeholder='Enter your password' /></InputArea>
                        <InputArea  style={login ? {display: 'none'} : {display: 'block'}}><input value={re} required='true' onChange={(e) => {setRe(e.target.value)}} type='password' placeholder='Re-enter your password' /></InputArea>
                        
                        <SubmitBtn onClick={login ? logIn : signUp} type='submit'>{login ? 'log in' : 'sign up'}</SubmitBtn>
                    </form>

                    <Messege>{login ? 'Create an account.' : 'Already have an account?'}<span onClick={handleClick}>{login ? 'sign up' : 'log in'}</span></Messege>
                </FormContainer>

               
            </RightArea>
        </Container>
    );
}

export default SignupForm;


const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;

`;

const LeftArea = styled.div`
    flex-basis: 50%;
    display: grid;
    place-items: center;
    padding: 40px;

    @media(max-width: 1150px) {
        display: none;
    }
`;

const Title = styled.h1`
    text-transform: uppercase;
    font-size: 2.4rem;
    text-align: center;
    line-height: 60px;

    span {
        color: #F6AE99
    }
    
`;

const TitleImg = styled.div`
    width: 500px;
    height: 500px;
    margin-bottom: -80px;

    img {
        max-width: 100%;
        max-height: 100%;
    }
`;

const RightArea = styled.div`
    flex-basis: 50%;
    background-color: #FFE3E3;
    display: grid;
    place-items: center;
    
    @media(max-width: 1150px) {
        padding: 0 40px;
        flex-basis: 100%;
    }
`;

const FormContainer = styled.div`  
    
    text-align: center;
   
`;

const FormTitle = styled.h2`
    padding-bottom: 100px;
    margin-top: -40px;
    text-transform: uppercase;
    
`;

const InputArea = styled.div`
    padding: 4px 0;  
    border-bottom: solid 2px;
    margin-bottom: 50px;
    width: 500px;
    
    

    input {
        width: 100%;
        background: none;
        border: none;
        font-size: 18px;

        :focus {
            outline: none;
        }
    }

    @media(max-width: 800px) {
        width: 400px;
    }

    
`;

const SubmitBtn = styled.button`
    width: 120px;
    height: 45px;
    background-color: #000;
    color: #ddd;
    text-transform: capitalize;
    font-weight: 700;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: all linear 0.3s;

    :hover {
        width: 180px;

    }
`;

const Messege = styled.div`
   margin-bottom: -40px;
   padding-top: 40px;
   text-transform: capitalize;
   font-size: 15px;

   span {
       color: #001E6C;
       font-weight: 700;
       padding-left: 13px;
       cursor: pointer;
   }
`;

