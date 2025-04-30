export default function Footer() {
    return (
      <>
        {/* <div className="fixed bottom-5 max-w-[900px] mx-auto w-full right-0 left-0">
          <div className="p-5 overflow-hidden flex items-center justify-center">
            Scroll Down
          </div>
        </div> */}

        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Daniel Kong. All rights reserved.
        </footer>
      </>
    )
}
