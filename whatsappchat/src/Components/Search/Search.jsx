import React, { useState } from 'react'
import styles from './Search.module.scss'
import { BsChatLeftDots } from 'react-icons/bs'

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = () => {
    onSearch(searchTerm)
  }

  return (
    <div className={styles.searchContainer}>
      <input
        type='text'
        placeholder='Введите номер телефона'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>
        <BsChatLeftDots />
      </button>
    </div>
  )
}

export default Search
