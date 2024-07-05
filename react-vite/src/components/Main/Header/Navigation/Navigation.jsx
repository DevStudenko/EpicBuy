import { NavLink } from "react-router-dom";
import logo from '../../../../../../assets/images/Logo.png';
import styles from "./Navigation.module.css";
import OpenModalButton from "../../../OpenModalButton";
import LoginFormModal from "../../../Auth/LoginFormModal";
import { FaSearch } from "react-icons/fa";
import { MdOutlineShoppingBasket } from "react-icons/md";
import { useSelector } from "react-redux";
import { thunkLogout } from "../../../../redux/session";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllCartItemsThunk } from "../../../../redux/cart";
import { getCartItemsArray } from "../../../../redux/cart";



function Navigation() {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const cartItems = useSelector(getCartItemsArray);


  let totalItemCount = 0
  if (cartItems.length) {
    totalItemCount = cartItems.reduce((total, item) => total + item.quantity, totalItemCount)
  }



  useEffect(() => {
    if (user) {
      dispatch(getAllCartItemsThunk())
    }
  }, [user, dispatch]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
  };

  return (
    <div className={styles.nav}>
      <div className={styles.nav__left}>
        <NavLink to="/"><img className={styles.logo} src={logo} alt="Epic Buy Logo" /></NavLink>
        <h4>Epic Buy</h4>
      </div>
      <div className={styles.nav__search}>
        <input className={styles.nav__searchInput} type="text" />
        <button className={styles.nav__searchIcon}>
          <FaSearch />
        </button>
      </div>
      <div className={styles.nav__right}>
        <span className={styles.nav__optionOne}>
          {user ? `Welcome, ${user.username}` :
            <OpenModalButton
              buttonText="Sign In"
              className={styles.login}
              modalComponent={<LoginFormModal />}
            />
          }
        </span>
        <span className={styles.nav__optionThree}>
          {user && <>
            Balance: $999
          </>
          }
        </span>

        <span className={styles.nav__optionFour}>
          {user && <button className={styles.nav__logout} onClick={logout}>
            Log Out
          </button>
          }
        </span>
        <span className={styles.nav__optionTwo}>
          {user && <NavLink to="/cart">
            <MdOutlineShoppingBasket className={styles.basket} />
          </NavLink>}
          <span className={styles.itemCount}>{totalItemCount > 0 && totalItemCount}</span>
        </span>
      </div>
    </div>
  );
}

export default Navigation;
