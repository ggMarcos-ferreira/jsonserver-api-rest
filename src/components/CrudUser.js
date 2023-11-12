import React, { useState, useEffect } from "react"
import Form from "./Form"
import Table from "./Table"

import { httpHelper } from "../helpers/httpHelper"

// Componente para lidar com operações CRUD em dados de usuários
const CrudUser = () => {
	const [users, setUsers] = useState(null)   // Estado para armazenar a lista de usuários

	const url = "http://localhost:5000/users"   // URL do endpoint da API para usuários
	const api = httpHelper()   // Função auxiliar para fazer requisições HTTP
  // Hook useEffect para buscar usuários quando o componente é montado
	useEffect(() => { 
		getUsers()
	}, [])
  // Função para adicionar um novo usuário
	const postUser = user => {
		api
			.post(`${url}`, { body: user })
			.then(res => getUsers())
			.catch(err => console.log(err))
	}
  // Função para atualizar um usuário existente
	const updateUser = (id, user) => {
		api
			.put(`${url}/${id}`, { body: user })
			.then(res => getUsers())
			.catch(err => console.log(err))
	}
  // Função para excluir um usuário
	const deleteUser = id => {
		api
			.del(`${url}/${id}`, {})
			.then(res => getUsers())
			.catch(err => console.log(err))
	}
  // Função para buscar todos os usuários
	const getUsers = () => {
		api
			.get(`${url}?_expand=companies`)
			.then(res => {
				setUsers(res)
			})
			.catch(err => console.log(err))
	}
  // Se os usuários ainda não foram carregados, retorna null
	if (!users) return null
  // Renderiza o componente com um formulário para adicionar um novo usuário e uma tabela para exibir todos os usuários
	return (
		<>
			<h3>New user</h3>
			<Form postUser={postUser} />
			<div className='all-users'>
				<h3>All users</h3>
				<Table
					users={users}
					setUsers={setUsers}
					postUser={postUser}
					updateUser={updateUser}
					deleteUser={deleteUser}
				/>
			</div>
		</>
	)
}

export default CrudUser
