"use client";
import React from 'react'
import VerifyEmailPage from '../VerifyEmailPage/VerifyImagePage';
import { Suspense } from 'react';

const VerifyEmailWrapper = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <VerifyEmailPage />
            </Suspense>
        </div>
    )
}

export default VerifyEmailWrapper
