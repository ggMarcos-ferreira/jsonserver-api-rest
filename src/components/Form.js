import React, { useState } from "react"
import DropComapies from "./DropCompanies"
// Componente de formulário para adicionar ou editar informações do usuário
const Form = ({ userData = {}, postUser, updateUser }) => {
	const [user, setUser] = useState({   // Estado para armazenar os dados do usuário no formulário
		name: userData.name ?? "",
		username: userData.username ?? "",
		email: userData.email ?? "",
		phone: userData.phone ?? "",
		companiesId: userData.companiesId ?? "0",
	})
  // Função para lidar com a mudança de valores nos campos do formulário
	const handleValue = e => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}
  // Função para lidar com o envio do formulário
	const submitUser = e => {
		e.preventDefault()
    // Verifica se a empresa foi selecionada
		if (user.companiesId === "0") return
    // Se userData.id existe chama a função para atualizar o usuário, senão, chama a função para adicionar um novo usuário
		if (userData.id) {
			updateUser(userData.id, user)
		} else {
			postUser(user)
		}
	}
  // Renderiza o formulário com os campos de entrada e o menu de empresas
	return (
		<form onSubmit={submitUser} className='row'>
			<input
				type='text'
				name='name'
				value={user.name}
				placeholder='Name'
				onChange={e => handleValue(e)}
			/>
			<input
				type='email'
				name='email'
				value={user.email}
				placeholder='Email'
				onChange={e => handleValue(e)}
			/>
			<input
				type='tel'
				name='phone'
				value={user.phone}
				placeholder='Phone (10)'
				pattern='[0-9]{10}'
				onChange={e => handleValue(e)}
			/>
			<DropComapies companiesId={user.companiesId} handleValue={handleValue} />
			<input
				className='btn-submit'
				type='submit'
				value={`${!userData.id ? "Add new user" : "Save user"}`}
			/>
		</form>
	)
}

export default Form
