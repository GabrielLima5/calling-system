import { FiPlusCircle } from "react-icons/fi";
import Header from "../../components/Header";
import Title from "../../components/Title";
import './New.css'
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../services/firebaseConnection";
import { collection, getDocs, addDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

export default function New(){
    const [complement, setComplement] = useState('')
    const [subject, setSubject] = useState('Suporte')
    const [status, setStatus] = useState('Aberto')
    const [customers, setCustomers] = useState([])
    const [loadCustomer, setLoadCustomer] = useState(true)
    const [customerSelected, setCustomerSelected] = useState(0)
    const [editableCustomer, setEditableCustomer] = useState(false)
    const navigate = useNavigate()

    const { user } = useContext(AuthContext)
    const listRef = collection(db, 'customers')

    const { id } = useParams()

    useEffect(() => {
        async function loadCustomers(){
            const querySnapshot = await getDocs(listRef)
                .then((snapshot) => {
                    let list = []

                    snapshot.forEach((doc) => {
                        list.push({
                            id: doc.id,
                            nomeFantasia: doc.data().name
                        }) 
                    })

                    if(snapshot.docs.size === 0){
                        toast.error('Nenhuma empresa encontrada!')
                        setCustomers([])
                    } else {
                        setCustomers((customers) => [...customers, ...list])
                    }
                    
                    setLoadCustomer(false)

                    if (id){
                        loadCallingById(list)
                    }
                })
                .catch((err) => {
                    console.log('Erro: ', err)
                    setLoadCustomer(false)
                    setCustomers([])
                })
        }

        loadCustomers()
    }, [id])

    const loadCallingById = async (list) => {
        const docRef = doc(db, 'callings', id)
        await getDoc(docRef)
        .then((snapshot) => {
            setSubject(snapshot.data().subject)
            setStatus(snapshot.data().status)
            setComplement(snapshot.data().complement)
            
            let index = list.findIndex(item => item.id === snapshot.data().customerId)
            setCustomerSelected(index)
            setEditableCustomer(true)
        })
        .catch((err) => {
            toast.error('Chamado não encontrado.')
            console.log(err)
            setEditableCustomer(false)
        })
    }

    const handleOptionChange = (e) => {
        setStatus(e.target.value)
    }

    const clearInputs = (message) => {
        toast.success(message)
        setComplement('')
        setCustomerSelected(0)
        navigate('/dashboard')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        if(editableCustomer){
            const docRef = doc(db, 'callings', id)
            await updateDoc(docRef, {
                customer: customers[customerSelected].nomeFantasia,
                customerId: customers[customerSelected].id,
                subject,
                complement,
                status,
                userId: user.uid
            })
            .then(() => {
                clearInputs('Chamado atualizado com sucesso!')
            })
            .catch((err) => {
                console.log(err)
                toast.error('Oops! Tente novamente mais tarde.')
            })

            return
        }

        await addDoc(collection(db, 'callings'), {
            createdAt: new Date(),
            customer: customers[customerSelected].nomeFantasia,
            customerId: customers[customerSelected].id,
            subject,
            complement,
            status,
            userId: user.uid
        })
        .then(() => {
            clearInputs('Chamado registrado com sucesso!')
        })
        .catch((err) => {
            console.log(err)
            toast.error('Oops! Tente novamente mais tarde.')
        })
    }

    return(
        <div>
            <Header />
            <div className="content">
                <Title name="Novo chamado">
                    <FiPlusCircle />
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleSubmit}>
                        <label>
                            <span>Clientes</span>
                            <select value={customerSelected} onChange={(e) => setCustomerSelected(e.target.value)}>
                               {customers?.map((customer, index) => (
                                    <option key={customer.id} value={index}>{customer.nomeFantasia}</option>
                               ))}
                            </select> 
                        </label>
                        <label>
                            <span>Assunto</span>
                            <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                                <option key={1} value="Suporte">Suporte</option>
                                <option key={2} value="Visita técnica">Visita Técnica</option>
                                <option key={3} value="Financeiro">Financeiro</option>
                            </select>
                        </label>

                        <label>Status</label>
                        <div className="status">
                            <label>
                                <input type="radio" name="status" value="Aberto" onChange={handleOptionChange} checked={status === 'Aberto'} />
                                <span>Em aberto</span>
                            </label>
                        
                            <label>
                                <input type="radio" name="status" value="Progresso" onChange={handleOptionChange} checked={status === 'Progresso'} />
                                <span>Progresso</span>
                            </label>
                        
                            <label>
                                <input type="radio" name="status" value="Concluído" onChange={handleOptionChange} checked={status === 'Concluído'} />
                                <span>Concluído</span>
                            </label>
                        </div>

                        <label>
                            <span>Complemento</span>
                            <textarea 
                                type="text" 
                                placeholder="Descreva o seu problema (opcional)" 
                                value={complement} 
                                onChange={(e) => setComplement(e.target.value)} 
                            ></textarea>
                        </label>

                        <button type="submit">{editableCustomer ? 'Editar' : 'Registrar'}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}