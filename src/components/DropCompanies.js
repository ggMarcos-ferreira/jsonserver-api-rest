import React, { useState, useEffect } from "react"
import { httpHelper } from "../helpers/httpHelper"
// Componente DropCompanies que renderiza um menu de empresas
const DropCompanies = ({ companiesId, handleValue }) => {
	const [companies, setCompanies] = useState(null)   // Estado para armazenar a lista de empresas
	const [company, setCompany] = useState(companiesId)  // Estado para armazenar a empresa selecionada
  // URL do endpoint da API para empresas
	const url = "http://localhost:5000/companies"
	const api = httpHelper()
  // useEffect para buscar empresas quando o componente é montado
	useEffect(() => {
		api
			.get(url)
			.then(res => { 				// Adiciona uma opção padrão "Select Company" à lista de empresas obtidas
				setCompanies([{ id: 0, name: "Select Company" }, ...res])
			})
			.catch(err => console.log(err))
	}, [])
  // Se as empresas ainda não foram carregadas, retorna null
	if (!companies) return null
  // Renderiza um menu (select) com as empresas disponíveis
	return (
		<select
			name='companiesId'
			value={company}
			onChange={e => {
				setCompany(e.target.value)
				handleValue(e)
			}}
		>
			{companies.map(c => (
				<option value={c.id} key={c.id}>
					{c.name}
				</option>
			))}
		</select>
	)
}

export default DropCompanies
