import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';
import { Cart } from '@/widgets/Cart';
import { Link } from 'react-router';
import styles from './styles.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to={CLIENT_ROUTES.HOME} className={styles.logo}>
          Store
        </Link>
        <div className={styles.categories}>
          <Link to={CLIENT_ROUTES.FOOD}>Food</Link>
          <Link to={CLIENT_ROUTES.CLOTHES}>Clothes</Link>
          <Link to={CLIENT_ROUTES.ELECTRONICS}>Electronics</Link>
        </div>
        <div className={styles.cartContainer}>
          <Cart />
        </div>
      </nav>
    </header>
  );
};
