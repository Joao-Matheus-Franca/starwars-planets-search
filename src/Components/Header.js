import { useContext } from 'react';
import { MyContext } from './MyContext';

function Header() {
  const { filterName } = useContext(MyContext);
  console.log(filterName);
  return (
    <input
      type="text"
      data-testid="name-filter"
      onChange={ ({ target: { value } }) => filterName(value) }
    />
  );
}

export default Header;
