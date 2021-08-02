import styles from '../sass/layout/ServerError.module.scss';

interface ServerErrorProps {}

export const ServerError: React.FC<ServerErrorProps> = ({}) => {
  return (
    <div className={styles.errorbox__margin}>
      <div className={styles.errorbox__shadow}>
        <div className={styles.svg__margin}>
          <svg
            viewBox='0 0 32 32'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            role='presentation'
            focusable='false'
            display='block'
            height='16px'
            width='16px'
            fill='rgb(193, 53, 21)'
          >
            <path d='M16 1c8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15C1 7.716 7.716 1 16 1zm0 20.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm1.5-16h-3V18h3V5.5z'></path>
          </svg>
        </div>
        <div className={styles.content__flex}>
          <div className={styles.error__header}>Something went wrong</div>
          <div className={styles.error__text}>
            Unfortunately, a server error prevented your request from being
            completed. Airbnb may be undergoing maintenance or your connection
            may have timed out. Please refresh the page or try again.
          </div>
        </div>
      </div>
    </div>
  );
};
