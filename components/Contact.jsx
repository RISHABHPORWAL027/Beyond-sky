"use client";

import { LetsWorkTogether } from "@/components/ui/lets-work-section";

export { LetsWorkTogether };

export default function Contact(props) {
  return (
    <LetsWorkTogether
      id="contact"
      email="beyondsky@intheblackmedia.com"
      buttonText="Mail us"
      statusText="Available for Collaboration"
      subheading="Have a project in mind? I'd love to hear about it. Let's create something exceptional together."
      {...props}
    />
  );
}
