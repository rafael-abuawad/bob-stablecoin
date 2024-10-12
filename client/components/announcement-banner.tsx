import localFont from "next/font/local";
import Link from "next/link";

const fiftiesFont = localFont({ src: "../lib/fonts/fifties.ttf" });

export default function AnnouncementBanner() {
  return (
    <div
      id="ab-full-width-with-dismiss-button-on-blue-bg"
      className="hs-removing:-translate-y-full bg-blue-600"
    >
      <div className="max-w-[85rem] px-4 py-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex">
          <p className="text-white">
            <span className={fiftiesFont.className}>
              <span className="text-xs">B$</span>BOBC
            </span>{" "}
            is live and deployed on{" "}
            <Link
              className="decoration-2 underline font-medium hover:text-white/80 focus:outline-none focus:text-white/80"
              href={"/deployments"}
            >
              Base Sepolia.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
