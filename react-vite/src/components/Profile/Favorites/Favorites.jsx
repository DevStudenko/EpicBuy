import { useSelector } from 'react-redux';
import FavoriteItem from './FavoriteItem';
import { getFavoritesArray } from '../../../redux/favorites';
import styles from './Favorites.module.css';

const Favorites = () => {
  const favorites = useSelector(getFavoritesArray);

  return (
    <div className={styles.favoritesList}>
      {favorites.length > 0 ? (
        favorites.map((favorite) => (
          <FavoriteItem key={favorite.id} favorite={favorite} />
        ))
      ) : (
        <p className={styles.emptyMessage}>
          Your wish list is empty. Select a product to view and add it to your wish list.
        </p>
      )}
    </div>
  );
};

export default Favorites;
