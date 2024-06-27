import { NavLink } from "react-router-dom";
import logo from '../../../../../images/Logo.png'
import styles from "./Navigation.module.css"
import { FaSearch } from "react-icons/fa";
import { MdOutlineShoppingBasket } from "react-icons/md";

function Navigation() {
  return (
    <div className={styles.nav}>
      <div className={styles.nav__left}>
        <NavLink to="/"><img className={styles.logo} src={logo} /></NavLink>
        <h5>Epic Buy</h5>
      </div>
      <div className={styles.nav__search}>
        <input className={styles.nav__searchInput} type="text" />
        <button className={styles.nav__searchIcon}>
          <FaSearch />
        </button>
      </div>
      <div className={styles.nav__right}>
        <MdOutlineShoppingBasket className={styles.basket} />
      </div>

    </div>

  );
}

export default Navigation;
