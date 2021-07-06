import Image from 'next/image';
import Link from 'next/link';
import { ProtectSvg } from '@airbnb-clone/controller';
import profileStyles from './ProfileSection.module.scss';

interface ProfileSectionProps {
  id: string;
  styles: {
    readonly [key: string]: string;
  };
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  id,
  styles,
}) => {
  return (
    <div className={styles.room__section__flex}>
      <div className={styles.room__section__padding}>
        <div className={styles.room__section__margin}>
          <div className={styles.section__divider}></div>
          <div className={styles.section__padding}>
            <div className={profileStyles.hosted__container}>
              <div className={profileStyles.profile__img__margin}>
                <Link href='/users/'>
                  <a className={styles.profile__btn}>
                    <div className={profileStyles.profile__img}>
                      <Image
                        src='https://a0.muscache.com/im/pictures/user/061f66a1-0515-48be-a24a-c6eda9772651.jpg?im_w=240'
                        height='100%'
                        width='100%'
                        layout='responsive'
                        objectFit='cover'
                      />
                    </div>
                  </a>
                </Link>
              </div>

              <div className={styles.amenities__heading__container}>
                <h2 className={styles.section__heading}>Hosted by Sergiu</h2>
                <div className={styles.calendar__range}>Joined in May 2021</div>
              </div>
            </div>

            <div className={styles.amenities__list__grid}>
              <div className={styles.amenity__item__container}>
                <div className={profileStyles.contact__margin}>
                  <Link href={`/contact_host/${id}`}>
                    <a className={styles.contact__btn}>Contact host</a>
                  </Link>
                </div>
              </div>

              <div className={profileStyles.protect__payment__margin}>
                <div className={profileStyles.protect__payment__flex}>
                  <div className={profileStyles.protect__svg__margin}>
                    <ProtectSvg />
                  </div>
                  To protect your payment, never transfer money or communicate
                  outside of the Airbnb website or app.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
