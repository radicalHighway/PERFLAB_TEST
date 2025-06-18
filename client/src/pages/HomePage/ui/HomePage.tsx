import magazImg from '@/assets/magaz.jpg';
import styles from './styles.module.css';

export const HomePage = () => {
  return (
    <div
      className={styles.homeBg}
      style={{ backgroundImage: `url(${magazImg})` }}>
      <div className={styles.homeContent}>
        <h1 className={styles.homeTitle}>Добро пожаловать в наш магазин!</h1>
        <p className={styles.homeDesc}>
          У нас вы найдёте свежие продукты, одежду, электронику и многое другое
          по отличным ценам.
          <br />
          Быстрая доставка, удобная корзина и приятный сервис ждут вас!
          <br />
          <br />
          Приятных покупок!
        </p>
      </div>
    </div>
  );
};
