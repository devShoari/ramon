import Link from "next/link";
import Hero from "@/components/Hero";
import { Messages } from "@/components/Messages";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Hero />
      <Messages />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Timed Messages</h2>
          <p className="mb-6">
            Create messages that will be revealed at a specific date in the
            future. Perfect for anniversaries, birthdays, or when you&apos;re
            ready for your words to be heard.
          </p>
          <Link href="/timed" className="btn-secondary">
            Schedule a Message
          </Link>
        </div>

        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Shared Memories</h2>
          <p className="mb-6">
            Post short stories or moments you cherish with someone special.
            Create a digital diary of your most meaningful connections.
          </p>
          <Link href="/memories" className="btn-secondary">
            Share a Memory
          </Link>
        </div>
      </section>
    </div>
  );
}
