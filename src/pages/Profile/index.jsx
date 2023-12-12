import './Profile.css'
import { db, storage } from '../../services/firebaseConnection'
import { doc, updateDoc } from 'firebase/firestore'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiSettings, FiUpload } from  'react-icons/fi'
import avatar from '../../assets/avatar.png'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage'

export default function Profile(){
    const { user, storageUser, setUser, logout } = useContext(AuthContext)
    const [name, setName] = useState(user.name || null)
    const [email] = useState(user.email || null)
    const [imageAvatar, setImageAvatar] = useState(null)

    const handleFile = (e) => {
        const image = e.target.files[0]

        if (image.type === 'image/jpeg' || image.type === 'image/png'){
            setImageAvatar(URL.createObjectURL(image))
        } else {
            alert('Apenas imagens do tipo JPG ou PNG são aceitos.')
            setImageAvatar(null)
            return
        }
    }

    const handleUpload = () => {
        const currentUid = user.uid
        const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`)
        const uploadTask = uploadBytes(uploadRef, imageAvatar)
        .then((snapshot) => {
            getDownloadURL(snapshot.ref)
                .then( async (downloadURL) => {
                    let urlFoto = downloadURL

                    const docRef = doc(db, 'users', user.uid)
                    await updateDoc(docRef, {
                        avatarUrl: urlFoto,
                        name: name
                    })
                .then(() => {
                    let data = {
                        ...user,
                        name: name,
                        avatarUrl: urlFoto
                    }
    
                    setUser(data)
                    storageUser(data)
                    toast.success('Atualizado com sucesso!')
                })
            })
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!imageAvatar && name){
            const docRef = doc(db, 'users', user.uid)
            await updateDoc(docRef, {
                name,
            })
            .then(() => {
                let data = {
                    ...user,
                    name: name
                }

                setUser(data)
                storageUser(data)
                toast.success('Atualizado com sucesso!')
            })
        } else if (name && imageAvatar){
            handleUpload()
        }
    }

    return(
        <div>
            <Header />

            <div className="content">
                <Title name="Meu perfil">
                    <FiSettings></FiSettings>
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleSubmit}>
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#fff" size={25} />
                            </span>
                            <input type="file" accept="image/" onChange={handleFile} />
                            <img src={imageAvatar || user.avatarUrl || avatar} alt="Avatar do usuário" width={250} height={250} />
                        </label>

                        <label>
                            <span>Nome</span>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" />
                        </label>

                        <label>
                            <span>Email</span>
                            <input type="email" value={email} disabled={true} />
                        </label>

                        <button type="submit">Salvar</button>
                    </form>
                </div>

                <div>
                    <button className="logout-btn" onClick={() => logout()}>Sair</button>
                </div>
            </div>
        </div>
    )
}