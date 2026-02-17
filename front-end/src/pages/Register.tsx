import Input from '../components/Input'
import Button from '../components/Button'

import { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [cep, setCep] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (!name || !email || !password || !cep) {
        setError('Todas as informações são obrigatórias')
        return
      } else if (password !== confirmPassword) {
        setError('Senhas não conferem')
        return
      }

      const response = await fetch('https://projeto-casa-do-hamburguer.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ name, email, password, cep })
      })

      switch (response.status) {
        case 409:
          setError('E-mail já cadastrado')
          break
        case 400:
          setError('Todas as informações são obrigatórias')
          break
        case 201:
          setName('')
          setEmail('')
          setPassword('')
          setCep('')
          setError('')
          setConfirmPassword('')
          break
        case 500:
          setError('Tente novamente mais tarde!')
          break
        default:
          setError('')
      }

      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      className="flex h-screen items-center justify-center bg-[#161410]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col justify-center gap-2">
        <Link to="/">
          <img
            src="/logo (3).png"
            alt="Casa do Hamburguer"
            className="mx-auto mb-4"
          />
        </Link>
        <Input
          placeholder="Nome completo"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          min={5}
        />
        <Input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          placeholder="Confirme sua senha"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Input
          placeholder="CEP"
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />
        <p className="font-bold text-red-500">{error}</p>
        <div className="mt-3 flex w-full flex-col gap-2">
          <Button title="Criar conta" type="submit" />
          <Link to="/login" className="w-full">
            <Button title="Já tenho uma conta" variant="outline" />
          </Link>
        </div>
      </div>
    </form>
  )
}

export default Register
