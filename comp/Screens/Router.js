import 'react-native-gesture-handler';  
import React from "react"  
import {View, Text, StyleSheet} from "react-native"  
import { useMyContextController } from '../Context/Index';
import { createStackNavigator } from '@react-navigation/stack';   
import Login from './Login';  
import Register from './Register';
import Home from './Home';


const Stack = createStackNavigator();  


export default Router = () =>{  
    const [controller, dispatch] = useMyContextController();  
    const {userLogin} = controller;  
    console.log(userLogin)  
    return (  
        <Stack.Navigator initialRouteName='Login'  
            screenOptions={{  
                headerTitleAlign: 'center'  
            }}  
        >  
            <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>   
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
            <Stack.Screen name="Register"component={Register} />
        </Stack.Navigator>  
    )  
}