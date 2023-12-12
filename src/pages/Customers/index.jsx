import { useState } from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiUser } from 'react-icons/fi'
import { db } from '../../services/firebaseConnection'
import { addDoc, collection } from 'firebase/firestore'
import { toast } from 'react-toastify'

export default function Customers(){
    const [name, setName] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [address, setAddress] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault()

        if (name && cnpj && address){
            await addDoc(collection(db, 'customers'), {
                name,
                cnpj,
                address
            })
            .then(() => {
                setName('')
                setCnpj('')
                setAddress('')

                toast.success('Cliente adicionado!')
            })
            .catch((err) => {
                console.log(err)
                toast.error('Erro ao realizar o cadastro.')
            })
        } else {
            toast.error('Preencha todos os campos!')
            return
        }
    }

    return(
        <>
            <Header />
            <div className="content">
                <Title name="Clientes">
                    <FiUser size={25} />
                </Title>
                <div className="container">
                    <form className="form-profile" onSubmit={handleRegister}>
                        <label>
                            <span>Nome fantasia</span>
                            <input type="text" placeholder="Nome da empresa" value={name} onChange={(e) => setName(e.target.value)} />
                        </label>

                        <label>
                            <span>CNPJ</span>
                            <input type="text" placeholder="CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
                        </label>

                        <label>
                            <span>Endereço</span>
                            <input type="text" placeholder="Endereço" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </label>

                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        </>
    )
}