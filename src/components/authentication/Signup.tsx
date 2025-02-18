"use client"
import React, { use, useId, useState } from 'react'
import { set, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Redirect } from 'next'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { toast } from "sonner"
import { signup } from '@/app/actions/authActions'
import { useRouter } from 'next/navigation'

 const passwordValidationRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})" );

const formSchema = z.object({
  full_name : z.string().min(3, {
    message: "Full name must be at least 3 characters"
  }),
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string({
      required_error: "Password is required",
    }).min(8, {
      message: "Password must be at least 8 characters",
    }).regex(passwordValidationRegex, {
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      
    }),
    confirmPassword: z.string({
      required_error: "Password is required",
    })
    }).refine(data => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

export const SignupForm = ({className}:{className?:string}) => {
  const[loading, setLoading] = useState(false)
  const toastid = useId();
  const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: "",
          full_name: "",
          confirmPassword: "",
        },
      })

      async function onSubmit(values: z.infer<typeof formSchema>) {
        toast.loading("Signin up...", {id: toastid})
        setLoading(true) 
        
        const formData = new FormData()
        formData.append("email", values.email)
        formData.append("password", values.password)
        formData.append("full_name", values.full_name)

        const{success, error} = await signup(formData)
        if (!success) {
          console.log(error)
          toast.error(error, {id: toastid}) 
          setLoading(false)        
        } else {
          toast.success("Signup successful", {id: toastid})
          setLoading(false);
          router.push('/login')
        }
        setLoading(false)
      }

    return (
        <div className = {cn("grid gap-6", className)}>
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" {...field} />
              </FormControl>             
              <FormMessage />
            </FormItem>
          )}
        />
       
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>             
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type = "password" placeholder="Enter password" {...field} />
              </FormControl>             
              <FormMessage />
            </FormItem>
          )}
        />
           <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type = "password" placeholder="Confirm password" {...field} />
              </FormControl>             
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='w-full' disabled = {loading}>
          {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin'/>}
          Signup</Button>
      </form>
    </Form>
        </div>
    )
}

