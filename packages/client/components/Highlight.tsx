interface HighlightProps {
  delay: string;
  styles: {
    readonly [key: string]: string;
  };
  svg: JSX.Element;
  text: string;
  highlights: string[];
  updateHighlights: (highlight: string) => void;
}

export const Highlight: React.FC<HighlightProps> = ({
  delay,
  styles,
  svg,
  text,
  highlights,
  updateHighlights,
}) => {
  return (
    <div
      className={styles.highlight__padding}
      style={{ animationDelay: delay }}
    >
      <button
        className={
          highlights.includes(text)
            ? styles.highlight__btn__selected
            : styles.highlight__btn
        }
        onClick={() => updateHighlights(text)}
      >
        <div className={styles.content__flexer}>
          {/* <div> */}
          <div className={styles.content__divider}>
            <div style={{ marginRight: 16 }}>{svg}</div>
            {text}
          </div>
          {/* </div> */}
          {/* <span className={styles.hidden__line}>
            <div className={styles.content__divider}></div>
          </span> */}
        </div>
      </button>
    </div>
  );
};
