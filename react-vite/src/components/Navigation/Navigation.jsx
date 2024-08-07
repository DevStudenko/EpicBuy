import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../../../assets/images/Logo.png';
import styles from "./Navigation.module.css";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../Auth/SignupFormModal";
import { FaSearch } from "react-icons/fa";
import { MdOutlineShoppingBasket } from "react-icons/md";
import { useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import { useDispatch } from "react-redux";
import { getCartItemsArray } from "../../redux/cart";

function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);
  const cartItems = useSelector(getCartItemsArray);

  let totalItemCount = 0;
  if (cartItems.length) {
    totalItemCount = cartItems.reduce((total, item) => total + item.quantity, totalItemCount);
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    navigate('/');
  };

  const handleSearchClick = () => {
    alert("Feature coming soon...");
  };

  return (
    <div className={styles.nav}>
      <div className={styles.nav__left}>
        <NavLink to="/"><img className={styles.logo} src={logo} alt="Epic Buy Logo" /></NavLink>
        <h4>Epic Buy</h4>
      </div>
      <div className={styles.nav__searchContainer}>
        <div className={styles.nav__search}>
          <input className={styles.nav__searchInput} type="text" placeholder="Feature coming soon..." />
          <button className={styles.nav__searchIcon} onClick={handleSearchClick}>
            <FaSearch />
          </button>
        </div>
      </div>
      <div className={styles.nav__right}>
        <span className={styles.nav__optionOne}>
          {user ? `Welcome, ${user.username}` :
            <OpenModalButton
              buttonText="Sign Up"
              className={styles.nav__signUp}
              modalComponent={<SignupFormModal />}
            />
          }
        </span>
        <span className={styles.nav__optionThree}>
          {user && <NavLink className={styles.profileLink} to="/profile">
            Profile
          </NavLink>}
        </span>
        <span className={styles.nav__optionFour}>
          {user && <button className={styles.nav__logout} onClick={logout}>
            Log Out
          </button>}
        </span>
        <span className={styles.nav__optionTwo}>
          {user && <NavLink to="/cart" className={styles.basketContainer}>
            <MdOutlineShoppingBasket className={styles.basket} />
            {totalItemCount > 0 && <span className={styles.itemCount}>{totalItemCount}</span>}
          </NavLink>}
        </span>
      </div>
    </div>
  );
}

export default Navigation;
