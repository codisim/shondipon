// components/Footer.tsx

import Link from "next/link";
import { Facebook, Youtube } from "lucide-react";
import { FooterBottom } from "./footer-bottom";
import { footerSections } from "@/data/footerData";
import { FacebookIcon } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Background YouTube Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 w-[177.77vh] h-[100vw]
                  min-w-full min-h-full
                  -translate-x-1/2 -translate-y-1/2"
        >
          <iframe
            src="https://www.youtube.com/embed/ANBXHRDY7Jk?autoplay=1&mute=1&loop=1&playlist=ANBXHRDY7Jk&start=60&controls=0&rel=0&modestbranding=1&playsinline=1"
            title="Background Video"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full pointer-events-none"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Footer Content */}
      <div className="relative z-10 container mx-auto px-6 pt-20 pb-10">
        {/* Footer Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 md:gap-12">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-green-400 mb-4">
                {section.title}
              </h3>

              <ul className="space-y-2 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="hover:text-green-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-4">
              যোগাযোগ
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-green-400 transition-colors"
                >
                  যোগাযোগ
                </Link>
              </li>

              <li>
                <a
                  href="https://youtube.com/@ShondiponOfficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-green-400 transition-colors"
                >
                  <Youtube className="mr-2 h-4 w-4" />
                  YouTube Channel
                </a>
              </li>

              <li>
                <a
                  href="https://facebook.com/shondiponsg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-green-400 transition-colors"
                >
                  <Facebook className="mr-2 h-4 w-4" />
                  Facebook Page
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <FooterBottom />
      </div>
    </footer>
  );
}
