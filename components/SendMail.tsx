"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

export function SendMail() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const toEmail = 'shahadathhossensajib732@gmail.com';
    const toName = 'Shahadath Hossen Sajib';
    const fromEmail = form.email.value;
    // const fromName = form.name.value;
    const emailSubject = form.subject.value;
    const emailBody = form.message.value;
    const email = { toEmail, toName, fromEmail, emailSubject, emailBody };

    // const serviceId = process.env.NEXT_PUBLIC_EJS_SERVICE_ID;
    // const templateId = process.env.NEXT_PUBLIC_EJS_TEMPLATE_ID;
    // const apiKey = process.env.NEXT_PUBLIC_EJS_API_KEY;

    // implementing sending email using EmailJS or any other service
    emailjs.send('service_00pytkd', 'template_zjypgnp', email, '6tts-NUhjD3cxO454')
    .then((response) => {
      console.log('Email sent:', response);
      Swal.fire({
        icon: 'success',
        title: 'Email Sent Successfully!',
        text: 'Thank you for reaching out. I will get back to you soon.',
      });
      form.reset();
    })
    .catch((error) => {
      console.error('Email error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while sending the email. Please try again later.',
      });
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 py-10 gap-10 items-center">
      <div className="text-center max-w-md p-4 mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">Send Me a Message</h1>
        <p className="text-lg text-gray-400 mx-auto">
          Have a project in mind or interested in discussing opportunities? Feel free to reach out to me using the form. I look forward to connecting with you!
        </p>
      </div>

      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-gray-800">
        <form className="my-8" onSubmit={handleSubmit}>
          {/* <LabelInputContainer className="mb-4">
            <Label htmlFor="name">Your Name</Label>
            <Input id="name" name="name" placeholder="Enter Your Name" type="text" className="bg-zinc-800 text-white placeholder-text-neutral-600 focus-visible:ring-neutral-600" />
          </LabelInputContainer> */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" placeholder="projectmayhem@fc.com" type="email" className="bg-zinc-800 text-white placeholder-text-neutral-600 focus-visible:ring-neutral-600" required />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" placeholder="Enter Email Subject" type="text" className="bg-zinc-800 text-white placeholder-text-neutral-600 focus-visible:ring-neutral-600" required />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              name="message" required
              placeholder="Enter your message..."
              className="flex h-32 w-full border-none bg-zinc-800 text-white shadow-input rounded-md px-3 py-2 text-sm placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 shadow-0px-0px-1px-1px-var(--neutral-700) group-hover-input-shadow-none transition duration-400"
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block w-full bg-zinc-800 text-white rounded-md h-10 font-medium shadow-0px-1px-0px-0px-var(--zinc-800)-inset,0px-1px-0px-0px-var(--zinc-800)-inset"
            type="submit"
          >
            Send Email &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover-btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover-btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default SendMail;