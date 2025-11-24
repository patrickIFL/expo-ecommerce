import { useHomeStyles } from '@/assets/styles/styles';
import useTheme from '@/hooks/useTheme';
import { useSignIn } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const {colors} = useTheme();
  const homeStyles = useHomeStyles();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  // Handle sign-in form submission
  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // Complete sign-in and set active session
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error('Sign-in incomplete:', JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error('Sign-in error:', JSON.stringify(err, null, 2));
    }
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
    color: colors.text
  },
  input: {
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
    <LinearGradient 
    colors={colors.gradients.background} 
    style={homeStyles.container}>
      <View style={styles.container}>

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
          <Text style={{color: colors.text}}>Don't have an account? </Text>
          <Link href="/sign-up">
            <Text style={styles.signupText}>Sign up</Text>
          </Link>
        </View>

        <View style={{justifyContent: "center", alignItems: "center", flexDirection: "row", marginTop:10}}>
                    <Link href="/">
                      <Ionicons name="arrow-back" color={colors.primary}/>
                      <Text style={{color: colors.primary}}>Back to Home</Text>
                    </Link>
                </View>
      </View>

    </LinearGradient>
  );
}


