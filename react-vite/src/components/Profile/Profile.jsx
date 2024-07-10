// import styles from Profile.module.css
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
  const user = useSelector(state => state.session.user); // Adjust based on your state structure
  const isAdmin = user?.isAdmin === true;

  return (
    <div className="profile">
      <img src={user?.profile_image_url} alt={`${user?.username}'s profile`} />
      <h2>{user?.username}</h2>
      <p>Email: {user?.email}</p>
      <p>Balance: ${user?.balance}</p>
      <Link to="/favorites">Favorites</Link>
      <Link to="/purchase-history">Purchase History</Link>
      {isAdmin && (
        <Link to="/admin/manage-products">Manage Products</Link>
      )}
    </div>
  );
};

export default Profile;
