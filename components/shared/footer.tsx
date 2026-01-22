// components/Footer.tsx

import Link from "next/link";
import { Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Background YouTube Video (muted, autoplay, loop) */}
      <div className="absolute inset-0 z-0 opacity-30">
        <iframe
          src="https://www.youtube.com/embed/VIDEO_ID_HERE?autoplay=1&mute=1&loop=1&playlist=VIDEO_ID_HERE&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1"
          title="Background Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/ANBXHRDY7Jk?si=xAvZsAmk61KPzfZO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
        {/* Optional overlay to make text more readable */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Footer Content */}
      <div className="relative z-10 container mx-auto px-6 py-16 max-w-screen-xl">
        {/* Main Footer Links - Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 md:gap-12">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-4">
              পরিচিতি
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/history"
                  className="hover:text-green-400 transition-colors"
                >
                  ইতিহাস
                </Link>
              </li>
              <li>
                <Link
                  href="/department"
                  className="hover:text-green-400 transition-colors"
                >
                  বিভাগসমূহ
                </Link>
              </li>
              <li>
                <Link
                  href="/executive-committee"
                  className="hover:text-green-400 transition-colors"
                >
                  কার্যনির্বাহী পরিষদ
                </Link>
              </li>
              <li>
                <Link
                  href="/cultural-committee"
                  className="hover:text-green-400 transition-colors"
                >
                  সাংস্কৃতিক ব্যক্তিত্ব
                </Link>
              </li>
              <li>
                <Link
                  href="/past-presidents"
                  className="hover:text-green-400 transition-colors"
                >
                  সাবেক পরিচালনা
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-4">
              সেরাদের সেরা
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/best-singers"
                  className="hover:text-green-400 transition-colors"
                >
                  গায়কদের সেরা
                </Link>
              </li>
              <li>
                <Link
                  href="/best-songs"
                  className="hover:text-green-400 transition-colors"
                >
                  গানের সেরা
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-4">
              কার্যক্রম
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/regular-programs"
                  className="hover:text-green-400 transition-colors"
                >
                  নিয়মিত কার্যক্রম
                </Link>
              </li>
              <li>
                <Link
                  href="/special-programs"
                  className="hover:text-green-400 transition-colors"
                >
                  বিশেষ কার্যক্রম
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-green-400 transition-colors"
                >
                  গ্যালারি
                </Link>
              </li>
              <li>
                <Link
                  href="/notice-board"
                  className="hover:text-green-400 transition-colors"
                >
                  নোটিশ বোর্ড
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-4">
              বিনোদন
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/video-songs"
                  className="hover:text-green-400 transition-colors"
                >
                  ভিডিও গান
                </Link>
              </li>
              <li>
                <Link
                  href="/audio-songs"
                  className="hover:text-green-400 transition-colors"
                >
                  অডিও গান
                </Link>
              </li>
              <li>
                <Link
                  href="/short-films"
                  className="hover:text-green-400 transition-colors"
                >
                  শর্টফিল্ম
                </Link>
              </li>
              <li>
                <Link
                  href="/drama-theater"
                  className="hover:text-green-400 transition-colors"
                >
                  নাটক/টেলিফিল্ম
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5 */}
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-4">
              সাহিত্য ও প্রকাশনা
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/song-lyrics"
                  className="hover:text-green-400 transition-colors"
                >
                  গানের স্বরলিপি
                </Link>
              </li>
              <li>
                <Link
                  href="/poetry"
                  className="hover:text-green-400 transition-colors"
                >
                  কবিতা
                </Link>
              </li>
              <li>
                <Link
                  href="/published-books"
                  className="hover:text-green-400 transition-colors"
                >
                  প্রকাশিত বইসমূহ
                </Link>
              </li>
              <li>
                <Link
                  href="/magazine"
                  className="hover:text-green-400 transition-colors"
                >
                  পত্রিকা
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 6 */}
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-4">
              সাংস্কৃতিক সংগঠন
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/dhaka-division"
                  className="hover:text-green-400 transition-colors"
                >
                  ঢাকা বিভাগ
                </Link>
              </li>
              <li>
                <Link
                  href="/chittagong-division"
                  className="hover:text-green-400 transition-colors"
                >
                  চট্টগ্রাম বিভাগ
                </Link>
              </li>
              <li>
                <Link
                  href="/rajshahi-division"
                  className="hover:text-green-400 transition-colors"
                >
                  রাজশাহী বিভাগ
                </Link>
              </li>
              <li>
                <Link
                  href="/rangpur-division"
                  className="hover:text-green-400 transition-colors"
                >
                  রংপুর বিভাগ
                </Link>
              </li>
              <li>
                <Link
                  href="/mymensingh-division"
                  className="hover:text-green-400 transition-colors"
                >
                  ময়মনসিংহ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 7 - Contact / Others */}
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
                  <Youtube className="mr-2 h-4 w-4" /> YouTube Channel
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@ShondiponOfficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-green-400 transition-colors"
                >
                  <Youtube className="mr-2 h-4 w-4" /> Facebook Page
                </a>
              </li>
            </ul>
          </div>
        </div>

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
      </div>
    </footer>
  );
}
