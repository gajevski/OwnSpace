'use client';

import { SignInResponse, signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { BsGithub } from 'react-icons/bs';
import { useRouter } from "next/navigation";

import AuthSocialButton from './AuthSocialButton';

const AuthForm: React.FC = () => {
    const session = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/welcome')
        }
    }, [session?.status, router]);


    const socialAction = (action: string) => {
        setIsLoading(true);

        signIn(action, { redirect: false })
            .then((callback: SignInResponse | undefined) => {
                if (callback?.error) {
                    console.error('Invalid credentials!');
                }

                if (callback?.ok) {
                    router.push('/welcome')
                }
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div
                className="
        bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        "
            >

                <div className="mt-6">

                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialAction('github')}
                        />
                    </div>
                </div>
                <div
                    className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
                >
                </div>
            </div>
        </div>
    );
}

export default AuthForm;