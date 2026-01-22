// components/Footer.tsx

import Link from "next/link";

export function FooterBottom() {
  return (
    <>
      {/* Footer Bottom */}
      <div
        className="mt-12 pt-8 border-t border-green-900/50 text-sm text-gray-400
                flex flex-col items-center gap-2
                md:flex-row md:justify-between md:gap-0"
      >
        <p className="text-center md:text-left">
          © Copyright 2012 - {new Date().getFullYear()} - সর্বস্ব সংরক্ষিত
        </p>

        <p className="text-center md:text-right">
          Maintain Team |{" "}
          <Link
            href="/codisim.com"
            className="hover:text-green-400 transition-colors"
          >
            Codisim.com
          </Link>
        </p>
      </div>
    </>
  );
}
