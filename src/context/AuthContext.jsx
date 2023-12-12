import { createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../services/firebaseConnection'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState('')
    const [loading, setLoading] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        function loadUser(){
            const storageUser = localStorage.getItem('user')
            setUser(JSON.parse(storageUser))
            setLoading(false)
        }

        loadUser()
    }, [])

    async function signIn (email, password) {
        setLoadingAuth(true)

        await signInWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                let uid = value.user.uid
                const docRef = doc(db, 'users', uid)
                const docSnap = await getDoc(docRef)

                let data = {
                    uid,
                    name: docSnap.data().name,
                    email: value.user.email,
                    avatarUrl: docSnap.data().avatarUrl
                }

                setUser(data)
                setLoadingAuth(false)
                storageUser(data)
                toast.success('Bem-vindo de volta!')
                navigate('/dashboard')
            })
            .catch(err => {
                console.log(err)
                setLoadingAuth(false)
                toast.error('Ops! Algo deu errado...')
            })
    }

    async function signUp (email, password, name){
        setLoadingAuth(true)

        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                let uid = value.user.uid
                await setDoc(doc(db, 'users', uid), {
                    name,
                    avatarUrl: null
                })
                .then(() => {
                    let data = {
                        uid: uid,
                        name: name,
                        email: value.user.email,
                        avatarUrl: null
                    }
                    setUser(data)
                    setLoadingAuth(false)
                    storageUser(data)
                    toast.success('Usuário cadastrado com sucesso.')
                    navigate('/dashboard')
                })
            })
            .catch(err => {
                console.error(err)
                setLoadingAuth(false)
            })
    }

    function storageUser(data){
        localStorage.setItem('user', JSON.stringify(data))
    }

    async function logout(){
        await signOut(auth)
        localStorage.removeItem('user')
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            setUser,
            signIn,
            signUp,
            logout,
            loadingAuth,
            loading,
            storageUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}