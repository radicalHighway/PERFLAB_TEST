import styles from './Footer.module.css';

export function Footer(): React.JSX.Element {
  return (
    <footer className={styles.footer}>
      <span className={styles.text}>
        &copy; {new Date().getFullYear()} Магазин продуктов. Все права защищены.
      </span>
    </footer>
  );
}
