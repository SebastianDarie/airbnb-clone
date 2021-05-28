interface SearchbarProps {}

export const Searchbar: React.FC<SearchbarProps> = ({}) => {
  return (
    <div className='Searchbar'>
      <div className='Searchbar__container'>
        <div className='Searchbar__part1'>
          <div className='Searchbar__part1__container'>
            <label className='Searchbar__location'>
              <div className='Searchbar__location__label'>Location</div>
              {/* Switch to react hook form */}
              <input
                className='Searchbar__location__input'
                aria-expanded='false'
                autoComplete='off'
                autoCorrect='off'
                spellCheck='false'
              />
            </label>
          </div>
        </div>

        <div className='Searchbar__part2__container'>
          <div className='Searchbar__part2__checkin'>
            <div className='Searchbar__btn'>
              <div className='Searchbar__text__container'>
                <div className='Searchbar__text__bold'>Check in</div>
                <div className='Searchbar__text__gray'>Add dates</div>
              </div>
            </div>
          </div>

          <div className='vline'></div>

          <div className='Searchbar__part2__checkout'>
            <div className='Searchbar__btn'>
              <div className='Searchbar__text__container'>
                <div className='Searchbar__text__bold'>Check out</div>
                <div className='Searchbar__text__gray'>Add dates</div>
              </div>
            </div>
          </div>
        </div>

        <div className='Searchbar__part3__container'>
          <div className='Searchbar__btn'>
            <div className='Searchbar__text-container'>
              <div className='Searchbar__text__bold'>Guests</div>
              <div className='Searchbar__text__gray'>Add guests</div>
            </div>
          </div>

          <div className='Searchbar__icon__btn__container'>
            <button className='Searchbar__icon__btn'>
              <div className='Searchbar__inner__icon__container'>
                <div className='Searchbar__search__icon'>
                  <svg
                    viewBox='0 0 32 32'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                    role='presentation'
                    focusable='false'
                    fill='none'
                    height='16'
                    width='16'
                    stroke='currentColor'
                    strokeWidth='4'
                    overflow='visible'
                  >
                    <g fill='none'>
                      <path d='m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9'></path>
                    </g>
                  </svg>
                </div>

                <div className='Searchbar__hidden__text'>Search</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
