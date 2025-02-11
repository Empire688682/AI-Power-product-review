import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import LoadingSpinner from '@/Component/LoadingSpinner/LoadingSpinner';
import styles from './VerifyEmail.module.css';

const Page = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const username = searchParams.get('username');
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.post('/api/auth/verifyemail', { token });
                if (response.data.success) {
                    const userData = response.data.data;
                    localStorage.setItem('userData', JSON.stringify(userData));
                    setMessage('Email verified successfully! Redirecting...');
                    setTimeout(() => {
                        router.push('/userAnalysis');
                    }, 2000);
                } else {
                    setMessage('Verification failed. Please try again.');
                }
            } catch (error) {
                setMessage('An error occurred during verification. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        verifyEmail();
    }, [token, router]);

    return (
        <div className={styles.verifyEmail}>
            {loading ? (
                <div className={styles.loadingContainer}>
                    <LoadingSpinner />
                    <p>Verifying {username}'s email...</p>
                </div>
            ) : (
                <h1>{message}</h1>
            )}
        </div>
    );
};

export default Page;
