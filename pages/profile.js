import { getSession } from 'next-auth/react';
import UserProfile from '../components/profile/user-profile';

function ProfilePage() {
  return <UserProfile />;
}

export const getServerSideProps = async (context) => {
  const URL = process.env.NEXTAUTH_URL;
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: `${URL}/auth`,
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

export default ProfilePage;
