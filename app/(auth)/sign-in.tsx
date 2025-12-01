import useTheme from '@/hooks/useTheme';
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignInPage({setSelected, setVisible}:{setSelected:any, setVisible:any}) {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const { colors } = useTheme();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        setVisible(false);
        router.replace('/');
      } else {
        console.error('Sign-in incomplete:', JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error('Sign-in error:', JSON.stringify(err, null, 2));
    }
  };

  const styles = StyleSheet.create({
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: colors.text,
    },
    input: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      marginBottom: 15,
      fontSize: 16,
      color: colors.text,
    },
    button: {
      width: '100%',
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
    signupContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    signupText: {
      color: colors.primary,
      fontWeight: 'bold',
    },
  });

  return (
    <>
      <Text style={styles.title}>Sign in</Text>

      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor="#999"
        onChangeText={setEmailAddress}
      />

      <TextInput
        style={styles.input}
        value={password}
        placeholder="Enter password"
        placeholderTextColor="#999"
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={onSignInPress}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={{ color: colors.text }}>{"Don't"} have an account? </Text>
        <TouchableOpacity onPress={() => {
            setVisible(false)
            setSelected("signup")
            setVisible(true)
            }}>
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
