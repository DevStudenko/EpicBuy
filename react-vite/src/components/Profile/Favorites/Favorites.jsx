import { useSelector } from 'react-redux';
import FavoriteItem from './FavoriteItem';
import styles from './Favorites.module.css';
import { getFavoritesArray } from '../../../redux/favorites';

const Favorites = () => {
  const favorites = useSelector(getFavoritesArray);

  return (
    <div className={styles.favoritesList}>
      {favorites.map((favorite) => (
        <FavoriteItem key={favorite.id} favorite={favorite} />
      ))}
    </div>
  );
};

export default Favorites;
