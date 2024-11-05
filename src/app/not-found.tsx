"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    document.title = "404 - Page Not Found";
  }, []);

  return (
    <section className="grid h-full py-10 w-full place-items-center bg-white">
      <div className="fixed left-0 top-0 min-h-[100dvh] w-screen bg-white" />

      <div className="pointer-events-noe text-center relative z-30 flex flex-col gap-y-6 lg:max-w-lg max-w-md px-3 sm:px-0 ">
        <h1 className="text-8xl font-bold text-gray-800 text-center">404</h1>
        <p className="text-center font-medium uppercase text-secondary sm:text-2xl md:text-3xl lg:text-4xl lg:font-bold xl:font-bold">
          Page Not Found
        </p>
        <p className="text-gray-500">
          It seems the page you’re looking for doesn’t exist. It may have been
          moved or deleted. Please check the URL, or return to the homepage to
          explore our site.
        </p>
        <div className="flex w-full items-center justify-center gap-x-6">
          <button
            onClick={handleGoBack}
            className="hover:text-accent-color pointer-events-auto flex items-center gap-x-1 rounded-xl border border-gray-200 bg-white hover:bg-secondary hover:text-white  px-4 py-2 transition-colors duration-300"
          >
            {" "}
            <MoveLeftIcon className="w-4" />
            Back
          </button>
          <Link
            href="/"
            prefetch
            className="hover:text-accent-color pointer-events-auto flex items-center gap-x-2 rounded-xl border border-gray-200 bg-white hover:bg-secondary hover:text-white  px-4 py-2 transition-colors duration-300"
          >
            Home
          </Link>
        </div>
        <p className="text-gray-500 text-center mt-10">
          If you need assistance, please{" "}
          <a
            href="mailto:housinnafrica@gmail.com"
            className="text-blue-600 hover:underline"
          >
            contact our support team
          </a>
          .
        </p>
      </div>
    </section>
  );
};
export default NotFound;
