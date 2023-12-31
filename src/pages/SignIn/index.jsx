import './Auth.css'
import logo from '../../assets/logo.png'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export default function SignIn(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signIn, loadingAuth } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (email && password){
            await signIn(email, password)
        }
    }

    return(
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="Logo Sistema de Chamados" />
                    <h1>Sistema de Chamados</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <h2>Entrar</h2>
                    <input 
                        type="email" 
                        placeholder="email@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={e => setPassword(e.target.value)} 
                    />
                    <button type="submit">
                        {loadingAuth ? 'Carregando...' : 'Acessar'}
                    </button>
                </form>
            </div>
            <Link to="/register">Não tem uma conta? Registre-se.</Link>
        </div>
    )
}