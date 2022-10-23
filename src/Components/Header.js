import { useContext, useState } from 'react';
import { MyContext } from './MyContext';

function Header() {
  const {
    setFilters,
    setName,
  } = useContext(MyContext);

  const INITIAL_STATE = {
    type: 'population',
    comparison: 'maior que',
    value: '0',
  };

  const [state, setState] = useState(INITIAL_STATE);

  const type = ['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

  const [types, setType] = useState(type);

  const [renderFilter, setFilter] = useState([]);

  return (
    <form>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ ({ target: { value } }) => setName(value) }
      />
      <select
        data-testid="column-filter"
        value={ state.type }
        onChange={ ({ target: { value } }) => setState({ ...state, type: value }) }
      >
        {types.map((t) => (<option key={ t }>{ t }</option>))}
      </select>
      <select
        data-testid="comparison-filter"
        value={ state.comparison }
        onChange={ ({ target: { value } }) => setState({ ...state, comparison: value }) }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ state.value }
        onChange={ ({ target: { value } }) => setState({ ...state, value }) }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => {
          setFilter([...renderFilter, { ...state }]);
          setFilters([...renderFilter, { ...state }]);
          setState({ ...state, type: types.filter((t) => t !== state.type)[0] });
          setType(types.filter((t) => t !== state.type));
        } }
      >
        Filtrar
      </button>
      { renderFilter.map((r) => (
        <div
          key={ r.type }
          data-testid="filter"
        >
          <h4>
            {r.type}
            {' '}
            {r.comparison}
            {' '}
            {r.value}
          </h4>
          <button
            id={ r.type }
            type="button"
            onClick={ ({ target: { id } }) => {
              setFilter(renderFilter.filter((f) => f.type !== id));
              setFilters(renderFilter.filter((f) => f.type !== id));
            } }
          >
            Excluir filtro
          </button>
        </div>
      )) }
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => {
          setFilter([]);
          setFilters([]);
        } }
      >
        Remover filtros
      </button>
    </form>
  );
}

export default Header;
