import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';
import { Cart } from '@/widgets/Cart/ui/CartItem';
import { Link, useLocation } from 'react-router';
import styles from './styles.module.css';

export const Header = () => {
  const location = useLocation();
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link to={CLIENT_ROUTES.HOME} className={styles.logoText}>
            Магазин
          </Link>
        </div>
        <div className={styles.menu}>
          <Link
            to={CLIENT_ROUTES.HOME}
            className={
              location.pathname === CLIENT_ROUTES.HOME
                ? styles.active
                : styles.link
            }>
            Главная
          </Link>
          <Link
            to={CLIENT_ROUTES.PRODUCTS}
            className={
              location.pathname.startsWith(CLIENT_ROUTES.PRODUCTS)
                ? styles.active
                : styles.link
            }>
            Продукты
          </Link>
        </div>
        <div className={styles.cartContainer}>
          <Cart />
        </div>
      </nav>
    </header>
  );
};
