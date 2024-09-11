import React, { useCallback, useRef, useState } from 'react';
import debounce from 'lodash/debounce';

import style from './styles/Search.module.css'

const Search = () => {
  const [value, setValue] = useState('')
  const debounceSearchRef = useRef<any>(null)

  const handleSearch = (value: string) => {
    console.log(`пользователь отправил запрос = ${value}`)
  }

  const debounceSearch = (value: string) => {
    if(debounceSearchRef.current) {
      debounceSearchRef.current.cancel()
    }
    debounceSearchRef.current = debounce(() => handleSearch(value), 1000)
    debounceSearchRef.current()
  }
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    debounceSearch(value)
  }

  return(
    <div className={style.searchContainer}>
        <input value={value} onChange={handleChange} className={style.input} type="text" />
        <button className={style.btnSearch}>
          <img src="../search.png" alt="search" />
        </button>
      </div>
  )
}

export default Search;
