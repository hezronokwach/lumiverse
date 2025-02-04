"use client"
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: "",
          full_name: "",
          confirmPassword: "",
        },
      })

      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
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
        <Button type="submit" className='w-full'>Signup</Button>
      </form>
    </Form>
        </div>
    )
}
