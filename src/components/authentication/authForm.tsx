'use client'
import React from 'react'
import { LoginForm } from './LoginForm'
import { Button } from '../ui/button'
import { SignupForm } from './Signup'
import { ResetPassword } from './ResetPassword'

export const AuthForm = () => {
    const [mode, setMode] = React.useState('login')
    return (
        <div className='space-y-6'>
            <div className='flex flex-col space-y-2 text-center'>
                <h1 className='text-2xl font-semibold tracking-tight'>
                    {
                        mode === "reset" ? "Reset Password" : mode === "login" ? "Login" : "Sign Up"
                    }

                </h1>
                <p className='text-sm text-muted-foreground'>
                    {
                        mode === "reset" ? "Enter your email to reset password" : mode === "login" ? "Enter your email to login" : "Enter your details to create account"
                    }

                </p>


            </div>
            {
                mode === "login" && <>
                <LoginForm />
                <div className='text-center flex justify-between'>
                    <Button variant ={'link'} className='p-0' onClick={() => setMode('signup')}>
                        Need an account
                    </Button>
                    <Button variant ={'link'} className='p-0' onClick={() => setMode('reset')}>
                        Forgot password?
                    </Button>
                </div>
                </>
                

            }
            {
                mode === "reset" && <>
                 <ResetPassword />
                 <div className='text-center '>
                    <Button variant ={'link'} className='p-0' onClick={() => setMode('login')}>
                        Back to Login
                    </Button>
                    
                </div>

                </>
               
            }
            {
                mode === "signup" && <>
                <SignupForm />
                <div className='text-center '>
                    <Button variant ={'link'} className='p-0' onClick={() => setMode('login')}>
                        Already have an account? Login
                    </Button>
                    
                </div>
                <p className=' px-8 text-center text-muted-foreground '>
                    By signing up, you agree to our terms and conditions
                </p>

                </>
            }
        </div>

    )
}
