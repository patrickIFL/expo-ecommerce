import useTheme from '@/hooks/useTheme';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUpPage({setSelected, setVisible}:{setSelected:any, setVisible:any}) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  // 👉 Track focus
  const [focus, setFocus] = useState("none");

  const { colors } = useTheme();

  // Base input style
  const baseInput = {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: colors.text,
    },

    input: {
      ...baseInput,
      borderColor: '#ccc',
      color: colors.text,
    },
    inputFocused: {
      ...baseInput,
      borderColor: colors.primary,
      color: colors.text,
    },

    nameInputs: {
      ...baseInput,
      borderColor: '#ccc',
      color: colors.text,
      flex: 1,
    },
    nameInputsFocused: {
      ...baseInput,
      borderColor: colors.primary,
      color: colors.text,
      flex: 1,
    },

    button: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: 'center',
      marginBottom: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    signInContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    signInText: {
      color: colors.primary,
      fontWeight: 'bold',
    },
  });

  // -----------------------------
  // VALIDATION
  // -----------------------------
  const validateFields = () => {
    if (!firstName.trim() || !lastName.trim() || !emailAddress.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert("Missing fields", "Please fill out all fields.");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("Password mismatch", "Passwords do not match.");
      return false;
    }
    return true;
  };

  // -----------------------------
  // SIGNUP HANDLER
  // -----------------------------
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    if (!validateFields()) return;

    try {
      await signUp.create({
        emailAddress,
        password,
        firstName,
        lastName,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err) {
      console.error('Sign-up error:', JSON.stringify(err, null, 2));
    }
  };

const onVerifyPress = async () => {
  if (!isLoaded) return;

  try {
    const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

    if (signUpAttempt.status === "complete") {
      await setActive({ session: signUpAttempt.createdSessionId });
      setVisible(false);
      router.replace("/");
      return;
    }

    console.error("Verification incomplete:", JSON.stringify(signUpAttempt, null, 2));
  } catch (err: any) {
    console.error("Verification error:", JSON.stringify(err, null, 2));
  }
};



  // -----------------------------
  // VERIFY SCREEN
  // -----------------------------
  if (pendingVerification) {
    return (
      
        <>
          <Text style={styles.title}>Verify your email</Text>

          <TextInput
            style={focus === "verify" ? styles.inputFocused : styles.input}
            value={code}
            placeholder="Enter verification code"
            placeholderTextColor="#999"
            onFocus={() => setFocus("verify")}
            onChangeText={setCode}
          />

          <TouchableOpacity style={styles.button} onPress={onVerifyPress}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </>
    );
  }

  // -----------------------------
  // SIGN-UP UI
  // -----------------------------
  return (
    <>
        <Text style={styles.title}>Create an Account</Text>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <TextInput
            style={focus === "firstName" ? styles.nameInputsFocused : styles.nameInputs}
            autoCapitalize="words"
            value={firstName}
            placeholder="First Name"
            placeholderTextColor="#999"
            onFocus={() => setFocus("firstName")}
            onChangeText={setFirstName}
          />

          <TextInput
            style={focus === "lastName" ? styles.nameInputsFocused : styles.nameInputs}
            autoCapitalize="words"
            value={lastName}
            placeholder="Last Name"
            placeholderTextColor="#999"
            onFocus={() => setFocus("lastName")}
            onChangeText={setLastName}
          />
        </View>

        <TextInput
          style={focus === "email" ? styles.inputFocused : styles.input}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor="#999"
          onFocus={() => setFocus("email")}
          onChangeText={setEmailAddress}
        />

        <TextInput
          style={focus === "password" ? styles.inputFocused : styles.input}
          secureTextEntry
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#999"
          onFocus={() => setFocus("password")}
          onChangeText={setPassword}
        />

        <TextInput
          style={focus === "confirmPassword" ? styles.inputFocused : styles.input}
          secureTextEntry
          value={confirmPassword}
          placeholder="Confirm password"
          placeholderTextColor="#999"
          onFocus={() => setFocus("confirmPassword")}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.signInContainer}>
          <Text style={{ color: colors.text }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => {
            setVisible(false)
            setSelected("login")
            setVisible(true)
          }
            }>
            <Text style={styles.signInText}>Sign in</Text>
          </TouchableOpacity>
        </View>
    </>

  );
}
