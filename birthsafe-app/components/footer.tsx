import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
        <p className="text-center text-sm leading-loose text-gray-500 md:text-left dark:text-gray-400">
          © 2023 BirthSafe. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="/privacy" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
            Terms of Service
          </Link>
          <Link href="/contact" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}

