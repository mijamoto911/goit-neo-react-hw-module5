import css from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const generateClassName = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};
const Navigation = () => {
  return (
    <nav className={css.navigation}>
      <NavLink className={generateClassName} to="/">
        Home
      </NavLink>

      <NavLink className={generateClassName} to="/movie">
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
