import { createContext, useContext, useMemo, useReducer } from "react";
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { alert } from "react-native";

const MyContext = createContext();

  
MyContext.displayName = "MyContextContext";

function reducer(state, action){
    switch (action.type){
        case "USER_LOGIN": {
            return { ...state, userLogin: action.value};
        }
        default:{
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

function MyContextControllerProvider({ children }){
    const initialState = {
        userLogin: null,
    };
    const [controller, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(()=> [controller, dispatch], [controller,dispatch]);
    return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}

function useMyContextController() {
    const context = useContext(MyContext);
    if(!context){
        throw new Error(
            "useMycontextController should be used inside the MyContextControllerProvider."
        );
    }
    return context;
}

const USERS = firestore().collection("USERS")
const SERVICES = firestore().collection("SERVICES")

const login = (dispatch, email, password) =>{
    auth().signInWithEmailAndPassword(email, password)
    .then(
        ()=>
            USERS.doc(email)
        .onSnapshot(u=>{
            const value = u.data();
            console.log("Dang nhap thanh cong voi user : ",value);
            dispatch({type:"USER_LOGIN",value});
        })
    )
    .catch(e=> alert("Sai user va password"))
}

const logout = (dispatch,navigation) => {
    dispatch({ type: "USER_LOGIN", value: null });
    navigation.navigate('Login');
};

const register = async (fullName, email, password) => {
    try {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        const userData = {
            email: userCredential.user.email,
            fullName: fullName, 
        };
        await USERS.doc(email).set(userData);

        console.log("Registration successful with user:", userData);
        return userData; 
    } catch (error) {
        console.error("Error registering:", error.message);
        throw error; 
    }
};



export {
    MyContextControllerProvider,
    useMyContextController,
    login,
    logout,
    register,
};