import './styles.css'

export const TextInput = ({searchValue, handleChange}) => {
    return (
        <input
          className="text-input"
          placeholder='Type your search'
          value={searchValue}
          type="search"
          onChange={handleChange}
        />
    )
}