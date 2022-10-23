import { createContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const MyContext = createContext();

function Provider({ children }) {
  const INITIAL_STATE = [];

  const [planets, addPlanets] = useState(INITIAL_STATE);

  const [nameFilter, setName] = useState('');

  const [filters, setFilters] = useState([]);

  const fetchAPI = async () => {
    const ENDPOINT = 'https://swapi.dev/api/planets';
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    const results = await data.results;
    const finalResults = await results.map((p) => {
      delete p.residents;
      return p;
    });
    addPlanets(await finalResults);
    return data;
  };

  useEffect(() => { fetchAPI(); }, []);

  const context = useMemo(() => ({
    planets,
    filters,
    nameFilter,
    setFilters,
    setName,
  }), [planets, nameFilter, filters]);

  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
