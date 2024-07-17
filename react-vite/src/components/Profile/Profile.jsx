import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Favorites from './Favorites';
import PurchaseHistory from './PurchaseHistory';
import ManageProducts from '../Products/ManageProducts';
import TransactionHistory from './TransactionHistory';
import default_user from '../../../../assets/images/default_user.jpg';
// import { thunkAuthenticate } from '../../redux/session';
import { getAllFavoritesThunk } from '../../redux/favorites';
import styles from './Profile.module.css';
import { getAllProductsThunk } from '../../redux/products';

const Profile = () => {
  const dispatch = useDispatch();
  const [activeComponent, setActiveComponent] = useState(null);
  const user = useSelector(state => state.session.user);
  const isAdmin = user?.isAdmin === true;

  // Re-fetch the user data when the component mounts to ensure it's up-to-date
  useEffect(() => {
    // dispatch(thunkAuthenticate());
    dispatch(getAllFavoritesThunk());
    dispatch(getAllProductsThunk());
  }, [dispatch]);



  const renderComponent = () => {
    switch (activeComponent) {
      case 'favorites':
        return <Favorites />;
      case 'purchaseHistory':
        return <PurchaseHistory />;
      case 'manageProducts':
        return <ManageProducts />;
      case 'transactionHistory':
        return <TransactionHistory />;
      default:
        return <p className={styles.profileNotice}>Select an option to view</p>;
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profile}>
        <img className={styles.profile__img} src={user?.profile_image_url || default_user} alt={`${user?.username}'s profile`} />
        <h2>{user?.username}</h2>
        <p>Email: {user?.email}</p>
        {!isAdmin && (
          <>
            <button
              onClick={() => setActiveComponent('favorites')}
              className={styles.wishlistButton}
            >
              Wishlist
            </button>
            <button
              onClick={() => setActiveComponent('purchaseHistory')}
              className={styles.purchaseHistoryButton}
            >
              Purchase History
            </button>
          </>
        )}
        {isAdmin && (
          <>
            <button
              onClick={() => setActiveComponent('manageProducts')}
              className={styles.manageProductsButton}
            >
              Manage Products
            </button>
            <button
              onClick={() => setActiveComponent('transactionHistory')}
              className={styles.transactionHistoryButton}
            >
              Transaction History
            </button>
          </>
        )}
        <div className={styles.componentContainer}>
          {renderComponent()}
        </div>
      </div>
    </div>

  );
};

export default Profile;
