import { useGradient } from '../shared-hooks/useGradient';
import { DotLoader } from './DotLoader';
import styles from '../sass/components/GradientBtn.module.scss';
import { CSSProperties, MouseEventHandler } from 'react';

interface GradientBtnProps {
  disabled?: boolean;
  loading?: boolean;
  style?: CSSProperties;
  text: string | JSX.Element;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const GradientBtn: React.FC<GradientBtnProps> = ({
  disabled,
  loading,
  style,
  text,
  type,
  onClick,
}) => {
  const [coords, setCoords] = useGradient();

  return (
    <button
      className={styles.btn__save}
      disabled={disabled}
      style={style}
      type={type ?? 'button'}
      onMouseMove={(e) => setCoords(e)}
      onClick={onClick}
    >
      <span className={loading ? styles.inset__span : styles.absolute__span}>
        <span
          className={styles.radial__span}
          style={{
            backgroundPosition: `calc((100 - ${coords.x}) * 1%) calc((100 - ${coords.y}) * 1%)`,
            display: loading ? 'none' : '',
          }}
        ></span>
        {loading ? <DotLoader /> : null}
      </span>
      <span className={styles.text__span}>{text}</span>
    </button>
  );
};
