import { ArrowLeftSvg } from '@airbnb-clone/controller';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import Layout from '../../../components/Layout';
import styles from '../../sass/pages/Header.module.scss';
import roomStyles from '../../sass/pages/Room.module.scss';
import { withApollo } from '../../../utils/withApollo';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const router = useRouter();

  return (
    <Layout filter room search>
      <div>header</div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Header);
