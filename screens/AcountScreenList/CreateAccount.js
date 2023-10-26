import React, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, 
  ScrollView, Button, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import LinearGradient from 'react-native-linear-gradient';
import styles from '../../style';

import axios from 'axios';
import { SERVER_IP, SERVER_PORT } from '@env';

const CreateAccount = () => {
    const [focusedEmail, setFocusedEmail] = useState(false);
    const [focusedPassword, setFocusedPassword] = useState(false);
    const [focusedConfirmPassword, setFocusedConfirmPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassWord] = useState("");


    const handleAddUser = () => {
        const data = {
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }
        if (password !== confirmPassword) {
            alert("Password not match")
            return
        }
        // axios.post('http://192.168.1.13:3000/create-account', data)
        axios.post(`http://${SERVER_IP}:${SERVER_PORT}/create-account`, data)
        .then(res => {
            setShowSuccess(true);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const [showSuccess, setShowSuccess] = useState(false);

    const handleReset = () => {
        setEmail("");
        setPassword("");
        setConfirmPassWord("");
        setShowSuccess(false);
    }


    return (
        <LinearGradient
            style={styles.backgroundLinearGradient}
            locations={[0, 0.25]}
            colors={["#d0e4b6", "#E4B6B6"]}
        >
            <View style={styles.container}>
                <View style={[styles.createAccountContainer, {opacity: showSuccess ? 0.2 : 1}]}>
                    <View style={styles.createAccountForm}>
                        <Text style={styles.createText}>Create</Text>
                        <View>
                            <View style={styles.createAccountInputContainer}>
                                <Text style={styles.createAccountText}>EMAIL</Text>
                                <TextInput style={[
                                    styles.inputProduct,
                                    focusedEmail ? styles.focusedInput : {} // Nếu input đang focus thì sẽ có viền đỏ
                                ]}
                                    placeholder="hongduc@gmail.com"
                                    value={email}
                                    onChangeText={(text) => setEmail(text)}
                                    onFocus={() => setFocusedEmail(true)}
                                    onBlur={() => setFocusedEmail(false)}
                                />
                            </View>
                            <View style={styles.createAccountInputContainer}>
                                <Text style={styles.createAccountText}>PASSWORD</Text>
                                <TextInput 
                                    style={[
                                        styles.createAccountInput,
                                        focusedPassword ? styles.focusedInput : {} // Nếu input đang focus thì sẽ có viền đỏ
                                    ]}
                                    placeholder="********"
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                    onFocus={() => setFocusedPassword(true)}
                                    onBlur={() => setFocusedPassword(false)}

                                />
                            </View>
                            <View style={styles.createAccountInputContainer}>
                                <Text style={styles.createAccountText}>CONFIRM PASSWORD</Text>
                                <TextInput style={[
                                    styles.createAccountInput,
                                    focusedConfirmPassword ? styles.focusedInput : {} // Nếu input đang focus thì sẽ có viền đỏ

                                ]} 
                                    placeholder="********"
                                    value={confirmPassword}
                                    onChangeText={(text) => setConfirmPassWord(text)}
                                    onFocus={() => setFocusedConfirmPassword(true)}
                                    onBlur={() => setFocusedConfirmPassword(false)}

                                />
                            </View>
                        </View>
                        <View style={styles.createAccountButtonContainer}>
                            <TouchableOpacity 
                                style={styles.createAccountButton}
                                onPress={handleAddUser}
                            >
                                <Text style={styles.createAccountButtonText}>Create</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.notifyContainer}>
                    {showSuccess ? (
                        <View style={styles.successMessage}>
                        <Text>Create Success</Text>
                        <Button 
                            title="Đóng"
                            onPress={handleReset} 
                        />
                        </View>
                    ) : null}
                </View>
            </View>
        </LinearGradient>
    )
}

export default CreateAccount