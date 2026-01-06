import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-sm">
        {/* Header */}
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
          Privacy Policy
        </h1>
        <p className="mb-10 text-center text-sm text-gray-500">
          Effective Date: {new Date().toLocaleDateString()}
        </p>

        {/* Intro */}
        <p className="mb-8 text-gray-700 leading-relaxed">
          PrefAI (<span className="font-medium">“we”, “our”, or “us”</span>)
          operates the <span className="font-medium">PrefAI</span> mobile
          application (the “App”). PrefAI helps immigrants, expats, and refugees
          in France manage complex bureaucratic processes such as{" "}
          <span className="font-medium">CAF</span>,{" "}
          <span className="font-medium">CPAM</span>, and other public services
          using AI-powered assistance, multilingual translation, voice input,
          and smart PDF form generation.
        </p>

        {/* Section */}
        <Section title="1. Information We Collect">
          <SubTitle>Account & Identity Information</SubTitle>
          <List>
            <li>Full name</li>
            <li>Email address</li>
            <li>Password (securely encrypted)</li>
            <li>Passport number (used only for administrative assistance)</li>
          </List>

          {/* <Note>
            Passport numbers are treated as sensitive personal data and protected
            using strict security controls.
          </Note> */}

          <SubTitle>Subscription & Payment Information</SubTitle>
          <p className="text-gray-700">
            PrefAI offers free and paid subscriptions (€4.99/month, €59.99/year).
            Payments are securely processed through{" "}
            <span className="font-medium">Stripe</span>.
          </p>

          <Note>
            We do not store credit/debit card numbers, CVV, or banking
            information.
          </Note>

          <SubTitle>User-Generated Content</SubTitle>
          <List>
            <li>AI chat messages</li>
            <li>Voice inputs (converted to text)</li>
            <li>Uploaded documents (PDFs and images)</li>
            <li>Language preferences</li>
          </List>

          <SubTitle>Automatically Collected Information</SubTitle>
          <List>
            <li>Device type and operating system</li>
            <li>App usage analytics</li>
            <li>Error logs and crash reports</li>
          </List>
        </Section>

        <Section title="2. How We Use Your Information">
          <List>
            <li>Provide AI-powered administrative assistance</li>
            <li>Translate text and voice across multiple languages</li>
            <li>Generate and manage PDF forms</li>
            <li>Manage subscriptions and access control</li>
            <li>Improve performance, security, and reliability</li>
          </List>
        </Section>

        <Section title="3. Third-Party Services">
          <List>
            <li>
              <span className="font-medium">OpenAI API</span> – AI chat
              assistance
            </li>
            <li>
              <span className="font-medium">Google Translation API</span> –
              Multilingual translation
            </li>
            <li>
              <span className="font-medium">Cloudinary</span> – Secure file
              storage
            </li>
            <li>
              <span className="font-medium">Stripe</span> – Subscription and
              payment processing
            </li>
          </List>

          <p className="mt-3 text-gray-700">
            Each third-party provider processes data according to its own
            privacy and security policies.
          </p>
        </Section>

        <Section title="4. Data Security">
          <p className="text-gray-700">
            We use HTTPS/TLS encryption, secure storage, and access controls to
            protect your data. While no system can guarantee complete security,
            we continuously improve our safeguards.
          </p>
        </Section>

        <Section title="5. Data Retention">
          <List>
            <li>Account data is retained while your account is active</li>
            <li>Uploaded documents are stored only as long as necessary</li>
            <li>Users may request deletion of their data at any time</li>
          </List>
        </Section>

        <Section title="6. User Rights (GDPR)">
          <p className="text-gray-700">
            Users in the European Union have the right to access, correct,
            delete, or export their personal data, withdraw consent, and object
            to certain processing activities.
          </p>
        </Section>

        <Section title="7. Children’s Privacy">
          <p className="text-gray-700">
            PrefAI is not intended for children under the age of 13. We do not
            knowingly collect personal data from children.
          </p>
        </Section>

        <Section title="8. Policy Updates">
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. Any changes
            will be reflected by updating the effective date at the top of this
            page.
          </p>
        </Section>

        <Section title="9. Contact Us">
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, you can contact
            us at:
          </p>

          <p className="mt-2 font-medium text-gray-900">
            📧{" "}
            <a
              href="mailto:u1447229543@gmail.com"
              className="underline underline-offset-4"
            >
              u1447229543@gmail.com
            </a>
          </p>

          <p className="mt-1 text-gray-700">
            <span className="font-medium">App Name:</span> PrefAI
          </p>
        </Section>
      </div>
    </div>
  );
};

/* ---------- Reusable Components ---------- */

const Section = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="mb-4 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-900">
      {title}
    </h2>
    {children}
  </section>
);

const SubTitle = ({ children }) => (
  <h3 className="mb-2 mt-4 text-lg font-medium text-gray-800 underline underline-offset-4">
    {children}
  </h3>
);

const List = ({ children }) => (
  <ul className="ml-6 list-disc space-y-1 text-gray-700">{children}</ul>
);

const Note = ({ children }) => (
  <p className="mt-3 rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-700">
    {children}
  </p>
);

export default PrivacyPolicy;
