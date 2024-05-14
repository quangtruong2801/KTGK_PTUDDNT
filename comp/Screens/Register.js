import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Button, Text, TextInput ,HelperText} from "react-native-paper";
import { useMyContextController, register } from "../Context/Index"; 
import COLORS from "../../constants";
const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(null); 
  const [controller, dispatch] = useMyContextController();
  const hasErrorPassword = () => password.length < 6;
  const hasErrorFullname = () => fullName.length < 1;
  const hasErrorPasswordConfirm = () => confirmPassword != password;
  const hasErrorEmail = () => !email.includes("@");

  const onSubmit = async () => {
    try {
      await register(fullName, email, password);
    
      navigation.navigate('Login');
    
      Alert.alert('Success', 'Registration successful');
    } catch (error) {
      
      console.error("Error registering:", error.message);
      setError(error.message); 
    }
  };

  return (
    <View style={{ flex: 1,backgroundColor:'#808080', justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 40, fontWeight: "bold", color: COLORS.pink, marginBottom: 30 }}>
        Register
      </Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginVertical: 10 , width:390}}
        mode="outlined"
      />
      <HelperText type='error' visible={hasErrorEmail()}>Vui lòng nhập kiểm tra Email.</HelperText>
      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={{ marginVertical: 10 , width:390}}
        mode="outlined"
      />
      <HelperText type='error' visible={hasErrorFullname()}>Vui lòng nhập tên người dùng.</HelperText>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={{ marginVertical: 10 , width:390}}
        mode="outlined"
      />
      <HelperText type='error' visible={hasErrorPassword()}>Vui lòng nhập mật khẩu có đủ 6 ký tư.</HelperText>
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
        style={{ marginVertical: 10 , width:390}}
        mode="outlined"
      />
    <HelperText type='error' visible={hasErrorPasswordConfirm()}>Vui lòng nhập lại mật khẩu.</HelperText>
        <Button
          mode="contained"
          onPress={onSubmit} 
          disabled={hasErrorEmail() || hasErrorPassword() || hasErrorPasswordConfirm() || hasErrorFullname()}
          style={{ marginVertical: 10, padding: 5 }}
          labelStyle={{ fontSize: 20 }}
        >
        Register
      </Button>

      {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}
    </View>
  );
};

export default Register;