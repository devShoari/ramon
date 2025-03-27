"use client";

import { useState } from "react";
import Link from "next/link";

export default function CreateMessage() {
  const [message, setMessage] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const popularTags = [
    "Regret",
    "MissYou",
    "Memories",
    "Nostalgia",
    "LostLove",
    "Apology",
  ];

  const handleAddTag = (tag: string) => {
    const formattedTag = tag.startsWith("#") ? tag : `#${tag}`;
    if (!tags.includes(formattedTag) && tags.length < 5) {
      setTags([...tags, formattedTag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate API call
    setTimeout(() => {
      // Reset form
      setMessage("");
      setTags([]);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="card text-center">
          <svg
            className="mx-auto mb-4 text-[var(--pink)]"
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <h2 className="text-2xl font-semibold mb-4">Message Sent</h2>
          <p className="mb-6">
            Your message has been successfully submitted. Thank you for sharing
            your thoughts.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/" className="btn-secondary">
              Return Home
            </Link>
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-primary"
            >
              Write Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Write Your Message
      </h1>

      <form onSubmit={handleSubmit} className="card">
        <div className="mb-6">
          <label htmlFor="message" className="block mb-2 font-medium">
            Your Message
          </label>
          <textarea
            id="message"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What would you like to say to them?"
            className="w-full p-3 border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--pink)]"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Tags (up to 5)</label>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleAddTag(tag)}
                className="text-sm bg-[var(--light-pink)] px-2 py-1 rounded-full hover:bg-[var(--pink)] hover:text-white transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <button type="submit" className="btn-primary w-full">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
