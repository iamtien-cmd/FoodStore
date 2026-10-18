import { useState } from "react";
export default function AboutUs() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-emerald-800 px-6 py-20 text-center text-white sm:py-28">
        <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-emerald-600/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <span className="rounded-full border border-emerald-300/40 bg-white/10 px-4 py-2 text-sm font-medium">
            🌙 Welcome to Halal Food
          </span>

          <h1 className="mt-8 text-4xl font-extrabold leading-tight sm:text-6xl">
            Good Food.
            <br />
            Good Moments.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-emerald-50 sm:text-lg">
            Discover your favorite Vietnamese dishes in one place.
            We are here to make your food ordering experience
            simple, convenient, and enjoyable.
          </p>

          <a
            href="#our-story"
            className="mt-9 inline-block rounded-xl bg-white px-7 py-3 font-bold text-emerald-800 shadow-lg transition hover:-translate-y-1 hover:bg-emerald-50"
          >
            Discover Our Story ↓
          </a>
        </div>
      </section>

      {/* Our Story */}
      <section
        id="our-story"
        className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2"
      >
        <div className="rounded-3xl bg-emerald-50 p-8 sm:p-12">
          <div className="text-center">
            <div className="text-8xl">🍜</div>
            <div className="mt-6 text-2xl font-extrabold text-emerald-900">
              A Little Taste of Vietnam
            </div>
            <p className="mt-3 text-gray-600">
              Your cravings, our passion.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-white p-3">
              <div className="text-2xl">🥖</div>
              <p className="mt-2 text-xs font-semibold">Bánh mì</p>
            </div>
            <div className="rounded-xl bg-white p-3">
              <div className="text-2xl">🍲</div>
              <p className="mt-2 text-xs font-semibold">Phở</p>
            </div>
            <div className="rounded-xl bg-white p-3">
              <div className="text-2xl">🥗</div>
              <p className="mt-2 text-xs font-semibold">Gỏi cuốn</p>
            </div>
          </div>
        </div>

        <div>
          <p className="font-bold uppercase tracking-[0.2em] text-emerald-700">
            About Our Website
          </p>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
            Bringing Vietnamese Food Closer to You
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            Halal Food is a food ordering website created to make
            discovering and ordering Vietnamese favorites easier.
            From a quick bánh mì to a comforting bowl of phở,
            we want to help you find something delicious for every day.
          </p>

          <p className="mt-4 leading-8 text-gray-600">
            Our website provides a convenient way to explore products,
            manage your shopping cart, and place orders online.
            We are continuously working to improve the experience
            for our customers.
          </p>

          <p className="mt-4 leading-8 text-gray-600">
            Our goal is to build a friendly and reliable platform
            where good food and convenience come together.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-bold uppercase tracking-[0.2em] text-emerald-700">
              What Matters to Us
            </p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Our Values
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
              We believe that a good food ordering experience
              should be simple, enjoyable, and customer-focused.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-3xl">
                🍽️
              </div>
              <h3 className="mt-6 text-xl font-bold">
                Food We Love
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                Celebrate the variety and flavors of Vietnamese
                cuisine, from familiar favorites to comforting classics.
              </p>
            </article>

            <article className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-3xl">
                🛍️
              </div>
              <h3 className="mt-6 text-xl font-bold">
                Easy Ordering
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                Browse products, add your favorites to the cart,
                and manage your orders through one convenient platform.
              </p>
            </article>

            <article className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-3xl">
                💚
              </div>
              <h3 className="mt-6 text-xl font-bold">
                Customer First
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                We value your feedback and aim to make every
                interaction with our website better.
              </p>
            </article>
          </div>
        </div>
      </section>

     
      {/* Contact Me */}
      <section id="contact" className="bg-emerald-50/50 px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-start">

          {/* Contact Information */}
          <div className="pt-4">
            <p className="font-bold uppercase tracking-[0.2em] text-emerald-700">
              Contact Me
            </p>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
              Let's Talk About
              <span className="block text-emerald-700">
                Your Questions
              </span>
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              Have a question, suggestion, or feedback about Halal Food?
              Fill out the form and let me know how I can help.
              I would love to hear from you!
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-xl">
                  ✉️
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    Email
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Send us your questions or feedback.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-xl">
                  💬
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    Customer Support
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    We welcome your ideas and suggestions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </section>


      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-7 text-center text-sm text-gray-500">
        <p className="font-semibold text-emerald-800">
          🌙 Halal Food
        </p>
        <p className="mt-2">
          Made with care, inspired by Vietnamese cuisine.
        </p>
        <p className="mt-3">
          © {new Date().getFullYear()} Halal Food. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setStatus("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, email, subject, message } = formData;

    const mailtoLink =
      `mailto:YOUR_EMAIL@example.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`;

    window.location.href = mailtoLink;

    setStatus(
      "Your email application should open with your message prepared."
    );
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-100";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-lg sm:p-8"
    >
      <h3 className="text-2xl font-bold text-gray-900">
        Send Me a Message
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        Fill in the details below and tell me what is on your mind.
      </p>

      <div className="mt-6">
        <label
          htmlFor="contact-name"
          className="text-sm font-semibold text-gray-700"
        >
          Full Name *
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          className={inputClass}
          required
          maxLength={100}
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-email"
          className="text-sm font-semibold text-gray-700"
        >
          Email Address *
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          className={inputClass}
          required
          maxLength={254}
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-subject"
          className="text-sm font-semibold text-gray-700"
        >
          Subject *
        </label>
        <select
          id="contact-subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={inputClass}
          required
        >
          <option value="">Select a subject</option>
          <option value="Product Inquiry">Product Inquiry</option>
          <option value="Order Support">Order Support</option>
          <option value="Delivery Question">Delivery Question</option>
          <option value="Feedback and Suggestions">
            Feedback and Suggestions
          </option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-message"
          className="text-sm font-semibold text-gray-700"
        >
          Your Message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="How can we help you?"
          value={formData.message}
          onChange={handleChange}
          className={inputClass}
          required
          minLength={5}
          maxLength={3000}
        />
        <p className="mt-1 text-right text-xs text-gray-400">
          {formData.message.length}/3000 characters
        </p>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-xl bg-emerald-700 px-6 py-3.5 font-bold text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        Send Message ✉️
      </button>

      {status && (
        <p
          role="status"
          className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm leading-6 text-emerald-800"
        >
          {status}
        </p>
      )}

      <p className="mt-4 text-center text-xs leading-5 text-gray-400">
        Your information will be included in the email you prepare to send.
      </p>
    </form>
  );
}

