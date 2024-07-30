// app/dogGame/[page].js
"use client"
import { useRouter } from 'next/navigation';
import Page from './page';
import Game from './game';

const DynamicPage = () => {
  const router = useRouter();
  const { page } = router.query;

  if (page === 'game') {
    return <Game />;
  }

  return <Page />;
};

export default DynamicPage;
