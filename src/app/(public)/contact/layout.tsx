import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Dhara Foundation. Reach out for inquiries, partnerships, or to learn more about our charity and cultural preservation initiatives.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
