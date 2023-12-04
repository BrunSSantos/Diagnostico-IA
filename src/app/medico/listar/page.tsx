import { listarDiagnostico } from '@/app/actions/diagnostico/listarDiagnostico';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ExpandingListDiag from '@/components/ExpandingListDiag';
import ExpandingList from '@/components/ExpandingListDiag';
import Navbar from '@/components/NavBar';
import SignOut from '@/components/SignOut';
import ListarProfSaude from '@/components/listarMedico';
import { getServerSession } from 'next-auth';
import React, {useEffect , useState } from 'react';




const Home: React.FC = async () => {
  const session = await getServerSession(authOptions);

  
 

  return (

          <>
              {session && session.user?.email ? (
                <>
                    <div className="w-full flex flex-col min-h-screen">

                    {/* Navbar no topo */}
                    <Navbar logoSrc="/img/cardiogram.png"/>
                    <div className="w-full flex flex-col min-h-screen items-center justify-center">
                      
                        <ListarProfSaude />
                      </div>
                      </div>
                </>
              ): (
                <>
                <SignOut />
                </>
              )}

            </>
  
  );
};

export default Home;
