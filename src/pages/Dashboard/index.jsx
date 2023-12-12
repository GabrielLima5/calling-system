import { useState, useEffect } from "react"
import Header from "../../components/Header"
import Title from '../../components/Title'
import { FiPlus, FiMessageSquare, FiEdit2, FiSearch } from "react-icons/fi"
import { Link } from "react-router-dom"
import { query, collection, getDocs, orderBy, limit, startAfter, updateDoc } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"
import { format } from "date-fns"
import Modal from "../../components/Modal"
import './Dashboard.css'

export default function Dashboard(){
    const [callings, setCallings] = useState([])
    const [loading, setLoading] = useState(true)
    const [isEmpty, setIsEmpty] = useState(false)
    const [lastDoc, setLastDoc] = useState('')
    const [loadingMore, setLoadingMore] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [details, setDetails] = useState('')

    const listRef = collection(db, 'callings')

    useEffect(() => {
        async function loadCallings(){
            const q = query(listRef, orderBy('createdAt', 'desc'), limit(5))
            const querySnapshot = await getDocs(q)
            await updateState(querySnapshot)
            setLoading(false)
        }

        loadCallings()

        return () => {}
    }, [])

    async function updateState(querySnapshot){
        const isCollectionEmpty = querySnapshot.size === 0
        if (!isCollectionEmpty){
            let lista = []
            querySnapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    subject: doc.data().subject,
                    customer: doc.data().customer,
                    customerId: doc.data().customerId,
                    createdAt: doc.data().createdAt,
                    createdFormat: format(doc.data().createdAt.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                    complement: doc.data().complement
                })
            }) 

            const lastDoc = querySnapshot.docs[querySnapshot.docs.length-1]
            setLastDoc(lastDoc)
            setCallings((callings) => [...callings, ...lista])
        } else {
            setIsEmpty(true)
        }

        setLoadingMore(false)
    }

    const handleMore = async () => {
        setLoadingMore(true)
        const q = query(listRef, orderBy('createdAt', 'desc'), startAfter(lastDoc), limit(5))
        const querySnapshot = await getDocs(q)
        await updateState(querySnapshot)
        setLoadingMore(false)
    }

    const handleModal = (calling) => {
        setShowModal(true)
        setDetails(calling)
    }

    return(
        <>
            <Header />
            <div className="content">   
                <Title name="Chamados">
                    <FiMessageSquare size={25} />
                </Title>

                <>
                    {loading && (
                            <div className="container dashboard">
                                <span>Buscando chamados...</span>
                            </div>
                        )
                    }
                    {!loading && callings.length === 0 ? (
                        <div className="container dashboard">
                            <span style={{marginBottom: '30px'}}>Nenhum chamado encontrado.</span>
                            <Link to="/new" className="new">
                                <FiPlus size={25} />
                                Novo chamado
                            </Link>
                        </div>
                    ) : (
                        <>
                            <Link to="/new" className="new">
                                <FiPlus size={25} />
                                Novo chamado
                            </Link>

                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Cliente</th>
                                        <th scope="col">Assunto</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Cadastrado em</th>
                                        <th scope="col">#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {callings?.map((calling => (
                                        <tr key={calling.id}>
                                            <td data-label="Cliente">{calling.customer}</td>
                                            <td data-label="Assunto">{calling.subject}</td>
                                            <td data-label="Status">
                                                <span className="badge" style={{backgroundColor: calling.status === 'Aberto' ? '#5cb85c' : '#999'}}>{calling.status}</span>
                                            </td>
                                            <td data-label="Cadastrado em">{calling.createdFormat}</td>
                                            <td data-label="#">
                                                <button className="action" onClick={() => handleModal(calling)} style={{backgroundColor: '#3583f6'}}>
                                                    <FiSearch color="#fff" size={17} />
                                                </button>
                                                <Link to={`/new/${calling.id}`} className="action" style={{backgroundColor: '#f6a935'}}>
                                                    <FiEdit2 color="#fff" size={17} />
                                                </Link>
                                            </td>
                                        </tr>
                                    )))}
                                </tbody>
                            </table>

                            {loadingMore &&  <h3>Buscando mais chamados...</h3>}
                            {!loadingMore && !isEmpty && <button className="btn-more" onClick={() => handleMore()}>Buscar mais</button>}
                        </>
                    )}
                    <div className="container dashboard"></div>
                </>
            </div>

            {showModal && <Modal details={details} setShowModal={setShowModal} />}
        </>
    )
}