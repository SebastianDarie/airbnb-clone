import Link from 'next/link';
import styles from '../../sass/components/MenuLink.module.scss';

interface MenuLinkProps {
  href: string;
  light: boolean;
  onClick?: () => Promise<void>;
}

export const MenuLink: React.FC<MenuLinkProps> = ({
  href,
  light,
  children,
  onClick,
}) => {
  return (
    <Link href={href}>
      <a
        className={styles.UtilsNav__menu__link}
        id={light ? styles.thin : undefined}
        onClick={onClick}
      >
        {children}
      </a>
    </Link>
  );
};
