import { useState, useContext } from "react"
import logo from '../../assets/logo.png'
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

export default function SignUp(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signUp, loadingAuth } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (name && email && password){
            await signUp(email, password, name)
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
                    <h2>Cadastrar</h2>
                    <input 
                        type="text" 
                        placeholder="Seu Nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
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
                        {loadingAuth ? 'Carregando' : 'Criar conta'}
                    </button>
                </form>

                <Link to="/">Já tem uma conta? Faça o login.</Link>
            </div>
        </div>
    )
}