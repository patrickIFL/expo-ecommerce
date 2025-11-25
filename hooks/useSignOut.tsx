import { useClerk } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

export default function useSignOut() {
  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.replace('/')
    } catch (err) {
      console.error("Sign-out error:", err?.errors ?? err)
    }
  }

  return { handleSignOut }
}
