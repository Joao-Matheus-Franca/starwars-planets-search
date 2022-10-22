import { createContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const MyContext = createContext();

function Provider({ children }) {
  const INITIAL_STATE = [];

  const [planets, addPlanets] = useState(INITIAL_STATE);

  const [renderPlanets, filterPlanets] = useState(INITIAL_STATE);

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
    filterPlanets(await finalResults);
    return data;
  };

  useEffect(() => { fetchAPI(); }, []);

  const value = useMemo(() => ({
    planets,
    renderPlanets,
    filterName: (text) => {
      filterPlanets(planets.filter((p) => p.name.includes(text)));
    },
  }), [planets, renderPlanets]);

  return (
    <MyContext.Provider value={ value }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
