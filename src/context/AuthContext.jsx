import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  updatePassword as fbUpdatePassword
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  async function updateUserProfile(data) {
    const userRef = doc(db, 'users', currentUser.uid);
    await setDoc(userRef, data, { merge: true });
    // Reload user data
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      setUserData(userDoc.data());
    }
  }

  async function updatePassword(newPassword) {
    if (currentUser) {
      await fbUpdatePassword(currentUser, newPassword);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Firebase Auth State Changed:", user ? user.email : "No user");
      try {
        setCurrentUser(user);
        if (user) {
          console.log("Fetching user data from Firestore for UID:", user.uid);
          
          // Fallback para o admin caso o Firestore esteja offline
          if (user.email === 'seikivinicius@gmail.com') {
            console.log("Admin detectado. Aplicando fallback de dados.");
            setUserData({ name: 'Vinícius Matoba', role: 'admin' });
            setLoading(false);
          }

          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
              console.log("User data found:", userDoc.data());
              setUserData(userDoc.data());
            } else if (user.email !== 'seikivinicius@gmail.com') {
              console.log("No user document found and not admin.");
              setUserData({});
            }
          } catch (dbErr) {
            console.error("Erro ao acessar Firestore (possivelmente offline):", dbErr);
            // Se for admin, já definimos o fallback acima, então não fazemos nada.
            // Se for outro usuário, eles verão a tela de 'Boas-vindas' se userData for {}
            if (user.email !== 'seikivinicius@gmail.com') {
              setUserData({});
            }
          }
        } else {
          setUserData(null);
        }
      } catch (err) {
        console.error("Erro crítico no AuthContext:", err);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    login,
    logout,
    updateUserProfile,
    updatePassword
  };

  if (loading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f8fafc',
        fontFamily: 'sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #cbd5e1', 
            borderTopColor: '#1a1a1a', 
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ opacity: 0.6 }}>Carregando Portal...</p>
          <style>{`
            @keyframes spin { to { transform: rotate(360deg); } }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
