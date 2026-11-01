"use client";

import { useState, type FormEvent } from "react";
import { supportEmail } from "@/lib/site";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(`Website inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}\n`);
    window.location.href = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-[#f7f8fc] rounded-3xl border border-[#d5dbed] p-6 lg:p-8 space-y-4 shadow-sm"
    >
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-[#1e2235] mb-1.5">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-11 px-4 rounded-xl border border-[#d5dbed] bg-white text-base sm:text-sm outline-none focus:ring-2 focus:ring-[#7a8fd4]/30"
          placeholder="Your name"
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-[#1e2235] mb-1.5">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-11 px-4 rounded-xl border border-[#d5dbed] bg-white text-base sm:text-sm outline-none focus:ring-2 focus:ring-[#7a8fd4]/30"
          placeholder="you@lab.edu"
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-[#1e2235] mb-1.5">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-[#d5dbed] bg-white text-base sm:text-sm outline-none focus:ring-2 focus:ring-[#7a8fd4]/30 resize-y"
          placeholder="How can we help?"
        />
      </div>
      <p className="text-xs text-[#6b7189] leading-relaxed">
        Owner placeholder: this opens the visitor&apos;s email app to {supportEmail}. A hosted
        form inbox is not connected, so nothing is stored on the site.
      </p>
      <button
        type="submit"
        className="h-11 px-6 rounded-full bg-[#1e2235] text-[#f7f8fc] text-sm font-medium hover:bg-[#2a3148] transition-colors"
      >
        Email support
      </button>
    </form>
  );
}
