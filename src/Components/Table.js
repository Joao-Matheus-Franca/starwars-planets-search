import { useContext } from 'react';
import { MyContext } from './MyContext';

function Table() {
  const { planets, nameFilter, filters } = useContext(MyContext);
  const filteredPlanets = planets
    .filter((p) => {
      if (filters[0] === undefined) {
        return p;
      }
      if (filters[0].comparison === 'maior que') {
        return Number(p[filters[0].type]) > Number(filters[0].value);
      }
      if (filters[0].comparison === 'menor que') {
        return Number(p[filters[0].type]) < Number(filters[0].value);
      }
      if (filters[0].comparison === 'igual a') {
        return Number(p[filters[0].type]) === Number(filters[0].value);
      }
      return p;
    })
    .filter((p) => {
      if (filters[1] === undefined) {
        return p;
      }
      if (filters[1].comparison === 'maior que') {
        return Number(p[filters[1].type]) > Number(filters[1].value);
      }
      if (filters[1].comparison === 'menor que') {
        return Number(p[filters[1].type]) < Number(filters[1].value);
      }
      if (filters[1].comparison === 'igual a') {
        return Number(p[filters[1].type]) === Number(filters[1].value);
      }
      return p;
    })
    .filter((p) => {
      if (filters[2] === undefined) {
        return p;
      }
      if (filters[2].comparison === 'maior que') {
        return Number(p[filters[2].type]) > Number(filters[2].value);
      }
      if (filters[2].comparison === 'menor que') {
        return Number(p[filters[2].type]) < Number(filters[2].value);
      }
      if (filters[2].comparison === 'igual a') {
        return Number(p[filters[2].type]) === Number(filters[2].value);
      }
      return p;
    })
    .filter((p) => {
      if (filters[3] === undefined) {
        return p;
      }
      if (filters[3].comparison === 'maior que') {
        return Number(p[filters[3].type]) > Number(filters[3].value);
      }
      if (filters[3].comparison === 'menor que') {
        return Number(p[filters[3].type]) < Number(filters[3].value);
      }
      if (filters[3].comparison === 'igual a') {
        return Number(p[filters[3].type]) === Number(filters[3].value);
      }
      return p;
    })
    .filter((p) => {
      if (filters[4] === undefined) {
        return p;
      }
      if (filters[4].comparison === 'maior que') {
        return Number(p[filters[4].type]) > Number(filters[4].value);
      }
      if (filters[0].comparison === 'menor que') {
        return Number(p[filters[4].type]) < Number(filters[4].value);
      }
      if (filters[0].comparison === 'igual a') {
        return Number(p[filters[4].type]) === Number(filters[4].value);
      }
      return p;
    });
  console.log(planets);
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {filteredPlanets.filter((p) => p.name.includes(nameFilter)).map((p) => (
          <tr
            key={ p.name }
            data-testid="table-line"
          >
            <td>{ p.name }</td>
            <td>{ p.rotation_period }</td>
            <td>{ p.orbital_period}</td>
            <td>{ p.diameter }</td>
            <td>{ p.climate }</td>
            <td>{ p.gravity }</td>
            <td>{ p.terrain }</td>
            <td>{ p.surface_water }</td>
            <td>{ p.population }</td>
            <td>{ p.films }</td>
            <td>{ p.created }</td>
            <td>{ p.edited }</td>
            <td>{ p.url }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
