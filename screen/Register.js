import React, { useState } from 'react'

import { Dimensions, Text, KeyboardAvoidingView, ImageBackground } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import styled from 'styled-components/native'

import Header from '../components/Header'
import { auth, db } from '../firebase';

const Container = styled.ScrollView`
	flex: 1;
    background-color: #000;
`


const FormWrapper = styled.View`
    width: 100%;
    justifyContent: center;
    alignItems: center;
    height: 70%;
`

const Form = styled.View`
height: 600px;
    width: 90%;
    background-color: black;
    flex-direction: column;
    border-radius: 20px;
    padding: 20px;
    justify-content: center;
`

const SubmitForm = styled.TouchableOpacity`
    width: 95%;
    height: 50px;
    color: white;
    border-radius: 10px;
    border: none;
    justify-content: center;
    align-items: center
    margin-top: 20px;
    background-color: #E7442E;
`

const Input = styled.TextInput`
    width: 95%;
    height: 50px;
    border: none;
    padding: 10px;
    border-radius: 15px;
    background-color: #333333;
    color: white;
    margin-top: 10px;
`

const ButtonText = styled.Text`
	font-size: 15px;
	font-weight: bold;
    padding-left: 5px;
    color: white;
`
const SignInText = styled.Text`
font-size: 30px;
font-weight: bold;
color: white;
margin: 10px;
text-align: left;
`

const NewToNetflixTextWrapper = styled.TouchableOpacity`
    width: 100%;
`

const NewToNetflix = styled.Text`
font-size: 15px;
font-weight: 500;
text-align: center;
color: #ccc;
margin: 15px;
text-align: center;
`

const Overlay = styled.View`
    background-color: 'rgba(0,0,0,0.5)';
    flex: 1;
`

const HalfInputWrapper = styled.View`
    flex-direction:row;
    justify-content: center;
    align-items: center;
`

const HalfInput = styled.TextInput`
width: 45.8%;
    height: 50px;
    border: none;
    padding: 10px;
    border-radius: 15px;
    background-color: #333333;
    color: white;
    margin-right: 5px;
    margin-top: 10px;
    &:focus {
        background-color: #454545;
    }   
`

const InputsWrapper = styled.View` 
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Register = ({ navigation }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [myAge, setMyAge] = useState('');
    const [myGender, setMyGender] = useState('');
    const [myHeight, setMyHeight] = useState('');
    const [myWeight, setMyWeight] = useState('');
    const [myShoes, setMyShoes] = useState('');
    const [mySkin, setMySkin] = useState('');

    const [loading, setLoading] = useState(false);
   

    const register = () => {
        setLoading(true);
        if (!email || !password || !firstName || !lastName  ) {
            alert("All fields are mandatory");
            setPassword("");
            setEmail("");
            setLoading(false);
            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then(cred => {
            db.collection('users')
            .doc(cred.user.uid)
            .set({
                firstName,
                lastName,
                email,
                myAge,
                myGender,
                myHeight,
                myWeight,
                myShoes,
                mySkin,
            
                 list: [
                        ],
            })
            .then(() => {
                navigation.replace("BottomStack");
                setPassword('');
                setEmail("");
                setMyAge("");
                setMyGender("");
                setMyHeight("");
                setMyWeight("");
                setMySkin("");
                setMyShoes("");
                setLoading(false);
            })
        }).catch(err => {
            alert(err)
            setPassword('');
            setEmail("");
            setLoading(false);
        })
        
    };

    return (
        <>
            <StatusBar style="light" />
            <Container>
                <ImageBackground source={{ uri: 'https://assets.nflxext.com/ffe/siteui/vlv3/9c5457b8-9ab0-4a04-9fc1-e608d5670f1a/710d74e0-7158-408e-8d9b-23c219dee5df/IN-en-20210719-popsignuptwoweeks-perspective_alpha_website_small.jpg' }} resizeMode="cover" style={{ flex: 1, height: Dimensions.get("window").height }}>
                    <Overlay>
                        <Header login={false} />
                        <FormWrapper>
                            <Form>
                                <KeyboardAvoidingView style={{ width: '100%' }}>
                                    <SignInText>Sign Up</SignInText>
                                    <InputsWrapper>
                                        <HalfInputWrapper>
                                            <HalfInput placeholderTextColor='grey' placeholder="First Name" value={firstName} onChangeText={(text) => setFirstName(text)} />
                                            <HalfInput placeholderTextColor='grey' placeholder="Last Name" value={lastName} onChangeText={(text) => setLastName(text)} />
                                        </HalfInputWrapper>
                                        <HalfInputWrapper>
                                            <HalfInput placeholderTextColor='grey' placeholder="Age" value={myAge} onChangeText={ (number) => setMyAge(number)} />
                                            <HalfInput placeholderTextColor='grey' placeholder="Gender" value={myGender} onChangeText={(text) => setMyGender(text)} />
                                        </HalfInputWrapper>
                                        <HalfInputWrapper>
                                            <HalfInput placeholderTextColor='grey' placeholder="Height" value={myHeight} onChangeText={(number) => setMyHeight(number)} />
                                            <HalfInput placeholderTextColor='grey' placeholder="Weight" value={myWeight} onChangeText={(number) => setMyWeight(number)} />
                                        </HalfInputWrapper>
                                        <HalfInputWrapper>
                                            <HalfInput placeholderTextColor='grey' placeholder="Shoes" value={myShoes} onChangeText={(number) => setMyShoes(number)} />
                                           <HalfInput placeholderTextColor='grey' placeholder="Skin" value={mySkin} onChangeText={(text) => setMySkin(text)} />
                                        </HalfInputWrapper>
                                        <Input placeholderTextColor='grey' placeholder="Enter your email" value={email} onChangeText={(text) => setEmail(text)} />
                                        <Input placeholderTextColor='grey' placeholder="Password" value={password} secureTextEntry onChangeText={(text) => setPassword(text)} />
                                        <SubmitForm onPress={register} disabled={loading}><ButtonText>{loading ? 'Loading...' : "Sign Up"}</ButtonText></SubmitForm>
                                        <NewToNetflixTextWrapper activeOpacity={0.5} onPress={() => navigation.navigate("Login")}><NewToNetflix>Already have an account ? Sign In</NewToNetflix></NewToNetflixTextWrapper>
                                    </InputsWrapper>
                                </KeyboardAvoidingView>
                            </Form>
                        </FormWrapper>
                    </Overlay>
                </ImageBackground>
            </Container>
        </>
    )
}

export default Register
