import './Modal.css'
import { FiX } from 'react-icons/fi'

export default function Modal({details, setShowModal}){
    return(
        <div className="modal">
            <div className="container">
                <button className="close" onClick={() => setShowModal(false)}>
                    <FiX color="#fff" size={25} />
                </button>

                <main>
                    <h2>Detalhes do chamado</h2>
                    <div className="row">
                        <span>Cliente: <i>{details.customer}</i></span>
                    </div>
                    <div className="row">
                        <span>Assunto: <i>{details.subject}</i></span>
                        <span>Cadastrado em: <i>{details.createdFormat}</i></span>
                    </div>
                    <div className="row">
                       <span>Status: <i style={{color: details.status === 'Aberto' ? '#017601' : '#fff'}}>{details.status}</i></span>
                    </div>
                    {details.complement && (
                        <>
                            <h3>Complemento</h3>
                            <p>{details.complement}</p>
                        </>
                    )}
                </main>
            </div>
        </div>
    )
}