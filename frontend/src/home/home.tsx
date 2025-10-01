import { ContentLayout } from '../layouts/content-layout';
import { PageLayout } from '../layouts/page-layout';
import { HomeHeader } from './home-header';
import { Button } from '../commons/button';
import { Link } from 'wouter';


export const Home = () => {
  return (
    <PageLayout>
      <HomeHeader />
      <ContentLayout>
         <Link href="/guest-booking">
   <Button className="bg-blue-500 text-white mt-10 mx-auto block">
    비회원 예매조회
      </Button>
        </Link>
      </ContentLayout>
    </PageLayout>
  );
};
