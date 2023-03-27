import { getSession } from 'next-auth/react';
import React from 'react';

const UserPage = () => {
  return (
    <div>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt quas
      consequuntur hic tenetur dignissimos suscipit earum cumque vero adipisci
      explicabo? Similique vitae molestias blanditiis eum mollitia pariatur
      explicabo molestiae, harum, aut dignissimos voluptatum corrupti, laborum
      quaerat sequi nemo perferendis. At, quidem quam. Harum ea, quasi aut quia
      dolore voluptatum quisquam.
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  const URL = process.env.NEXTAUTH_URL;
  if (!session) {
    return {
      redirect: {
        destination: `${URL}/auth`,
        permanent: false,
      },
    };
  }
  return { props: { session } };
};

export default UserPage;
