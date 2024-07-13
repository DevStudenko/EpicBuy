import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Favorites from './Favorites';
import PurchaseHistory from './PurchaseHistory';
import ManageProducts from '../Products/ManageProducts';
import TransactionHistory from './TransactionHistory';
import default_user from '../../../../assets/images/default_user.jpg';
import { thunkAuthenticate } from '../../redux/session';

const Profile = () => {
  const dispatch = useDispatch();
  const [activeComponent, setActiveComponent] = useState(null);
  const user = useSelector(state => state.session.user);
  const isAdmin = user?.isAdmin === true;

  // Re-fetch the user data when the component mounts to ensure it's up-to-date
  useEffect(() => {
    dispatch(thunkAuthenticate());
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
        return <p>Select an option to view</p>;
    }
  };

  return (
    <div className="profile">
      <img src={user?.profile_image_url || default_user} alt={`${user?.username}'s profile`} />
      <h2>{user?.username}</h2>
      <p>Email: {user?.email}</p>
      <p>Balance: ${user?.balance.toFixed(2)}</p>
      {!isAdmin && (
        <>
          <button onClick={() => setActiveComponent('favorites')}>Favorites</button>
          <button onClick={() => setActiveComponent('purchaseHistory')}>Purchase History</button>
        </>
      )}
      {isAdmin && (
        <>
          <button onClick={() => setActiveComponent('manageProducts')}>Manage Products</button>
          <button onClick={() => setActiveComponent('transactionHistory')}>Transaction History</button>
        </>
      )}
      <div className="component-container">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Profile;
