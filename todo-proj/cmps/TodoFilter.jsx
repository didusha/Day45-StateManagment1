import { utilService } from "../services/util.service.js";

const { useState, useEffect, useRef } = React

export function TodoFilter({ onSetFilterBy, defaultFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter)
    // console.log("🚀 ~ TodoFilter ~ filterByToEdit:", filterByToEdit)
    const debouncedOnSetFilterByTxt = useRef(utilService.debounce(onSetFilterBy, 300)).current;

    useEffect(() => {
        // Notify parent
        if( filterByToEdit.txt !== undefined) debouncedOnSetFilterByTxt(filterByToEdit)
        else onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default: break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        // onSetFilterBy(filterByToEdit)
    }

    const { txt, importance, isDone, sortField, sortDir } = filterByToEdit
    return (
        <section className="todo-filter">
            <h2>Filter Todos</h2>
            <form onSubmit={onSubmitFilter}>
                <input value={txt} onChange={handleChange}
                    type="search" placeholder="By Txt" id="txt" name="txt"
                />
                <label htmlFor="importance">Importance: </label>
                <input value={importance} onChange={handleChange}
                    type="number" placeholder="By Importance" id="importance" name="importance"
                />

                <label htmlFor="isDone">Filter By: </label>
                <select value={isDone} onChange={handleChange} name="isDone" id="isDone">
                    <option value="">All</option>
                    <option value="active">Active</option>
                    <option value="done">Done</option>
                </select>

                <label htmlFor="sortField">Sort by:</label>
                <select id="sortField" name="sortField" value={sortField} selected={sortField} onChange={handleChange}>
                    <option value="">Select sort</option>
                    <option value="title">Title</option>
                    <option value="importance">Importance</option>
                    <option value="createdAt">Created At</option>
                </select>

                <label><span>⬇</span>
                    <input type="checkbox" name="sortDir" checked={sortDir} onChange={handleChange} />
                </label>


                <button hidden>Set Filter</button>
            </form>
        </section>
    )
}