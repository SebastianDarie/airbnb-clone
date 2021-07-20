import Image from 'next/image';
import Link from 'next/link';
import { ProtectSvg, User } from '@airbnb-clone/controller';
import profileStyles from './ProfileSection.module.scss';

interface ProfileSectionProps {
  id: string;
  owner: {
    __typename?: 'User' | undefined;
  } & Pick<User, 'id' | 'email' | 'name' | 'photoUrl' | 'createdAt'>;
  styles: {
    readonly [key: string]: string;
  };
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  id,
  owner,
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
                <Link href={`/users/${owner.id}`}>
                  <a className={styles.profile__btn}>
                    <div className={profileStyles.profile__img}>
                      <Image
                        src={owner.photoUrl}
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
                <h2 className={styles.section__heading}>
                  Hosted by {owner.name}
                </h2>
                <div className={styles.calendar__range}>
                  Joined in{' '}
                  {new Date(+owner.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                  })}
                </div>
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
