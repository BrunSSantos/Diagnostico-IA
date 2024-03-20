import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ListarAdministradorAdmin from '@/components/ListarAdministrador';
import Navbar from '@/components/NavBar';
import NavbarAdmin from '@/components/NavBarAdmin';
import SignOut from '@/components/SignOut';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Home: React.FC = async () => {
  const session = await getServerSession(authOptions);


  return (

          
    <> 
        {session && session.user?.email ? (
        <>
          <div className="w-full flex flex-col min-h-screen">

            {/* Navbar no topo */}

            <NavbarAdmin logoSrc="/img/cardiogram.png" />

            {/* Conteúdo centralizado no meio */}
            <div className="flex-grow flex items-center justify-center">
              <ListarAdministradorAdmin />
            </div>

          </div>
        </>
      ) : (
        <>
          <SignOut />
        </>
      )}

    </>

);
}

export default Home;
