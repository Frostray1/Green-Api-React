import React, { useState } from 'react'
import styles from './Search.module.scss'
import { GoSearch } from 'react-icons/go'

const Search = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const handleSearch = () => {
		// Логика обработки поиска
		console.log('Searching for:', searchTerm)
	}

	return (
		<div className={styles.searchContainer}>
			<button onClick={handleSearch}>
				<GoSearch />
			</button>
			<input
				type='text'
				placeholder='Введите номер телефона'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
			/>
		</div>
	)
}

export default Search
