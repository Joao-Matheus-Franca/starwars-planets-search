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

  const context = useMemo(() => ({
    planets,
    renderPlanets,
    filterName: (text) => {
      filterPlanets(planets.filter((p) => p.name.includes(text)));
    },
    filterNumber: (type, comparison, value) => {
      filterPlanets(renderPlanets.filter((p) => {
        if (comparison === 'maior que') {
          return Number(p[type]) > Number(value);
        }
        if (comparison === 'menor que') {
          return Number(p[type]) < Number(value);
        }
        if (comparison === 'igual a') {
          return Number(p[type]) === Number(value);
        }
        return p;
      }));
    },
  }), [planets, renderPlanets]);

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
