import { useContext, useState } from 'react';
import { MyContext } from './MyContext';

function Header() {
  const { filterName, filterNumber } = useContext(MyContext);

  const INITIAL_STATE = {
    type: 'population',
    comparison: 'maior que',
    value: '0',
  };

  const [state, setState] = useState(INITIAL_STATE);

  return (
    <form>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ ({ target: { value } }) => filterName(value) }
      />
      <select
        data-testid="column-filter"
        value={ state.type }
        onChange={ ({ target: { value } }) => setState({ ...state, type: value }) }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
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
        onClick={ () => filterNumber(state.type, state.comparison, state.value) }
      >
        Filtrar
      </button>
    </form>
  );
}

export default Header;
