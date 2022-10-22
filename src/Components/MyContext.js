import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const MyContext = createContext();

function Provider({ children }) {
  const INITIAL_STATE = {
    planets: [],
  };

  const [planets, addPlanets] = useState(INITIAL_STATE);

  const fetchAPI = async () => {
    const ENDPOINT = 'https://swapi.dev/api/planets';
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    const results = await data.results;
    const finalResults = await results.map((p) => {
      delete p.residents;
      return p;
    });
    addPlanets({ planets: await finalResults });
    return data;
  };

  useEffect(() => { fetchAPI(); }, []);

  return (
    <MyContext.Provider value={ planets }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
