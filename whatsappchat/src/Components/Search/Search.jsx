import React, { useState } from 'react';
import styles from './Search.module.scss';
import { BsChatLeftDots } from 'react-icons/bs';

const Search = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState('');

	const handleKey = e => {
		e.code === 'Enter' && handleSearch();
	};

	const handleSearch = () => {
		onSearch(searchTerm);
	};

	const handleInputChange = e => {
		const inputValue = e.target.value;
		const numericValue = inputValue.replace(/\D/g, '');
		setSearchTerm(numericValue);
	};

	return (
		<div className={styles.searchContainer}>
			<input
				type='text'
				placeholder='Введите номер телефона'
				value={searchTerm}
				onChange={handleInputChange}
				onKeyDown={handleKey}
			/>
			<button onClick={handleSearch}>
				<BsChatLeftDots />
			</button>
		</div>
	);
};

export default Search;
