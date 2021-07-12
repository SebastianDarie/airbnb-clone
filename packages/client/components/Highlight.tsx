interface HighlightProps {
  delay: string;
  styles: {
    readonly [key: string]: string;
  };
  svg: JSX.Element;
  text: string;
  highlights: string[];
}

export const Highlight: React.FC<HighlightProps> = ({
  delay,
  styles,
  svg,
  text,
  highlights,
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
        onClick={async () =>
          (await import('../stores/useListingStore')).default.updateHighlights(
            text
          )
        }
      >
        <div className={styles.content__flexer}>
          <div className={styles.content__divider}>
            <div style={{ marginRight: 16 }}>{svg}</div>
            {text}
          </div>
        </div>
      </button>
    </div>
  );
};
