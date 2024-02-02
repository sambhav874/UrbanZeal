import React from 'react';
import {redirect} from 'next/navigation'
import { useSession } from 'next-auth/react';

const Home = () => {
    const session = useSession();
    const {status} = session;

    if(status === 'loading'){
        return 'loading....';
    }
    if(status === 'unauthenticated'){
        return redirect('/login');
    }

    const userImage = session.data.user.image;
    
    
    return(
    <div className="mt-8">
        <h1 className='text-center text-primary text-4xl mb-4'>Profile</h1>
        <form className='max-w-xs  mx-auto border'>
        <div>
            <Image src={userImage} width={64} height={64}>
                
            </Image>
        </div>


        </form>
    </div>
)
}


export default Home;