import { FC } from "react";
import Link from "next/link";

export const Footer: FC = () => {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center gap-4 md:h-24 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <Link href="/" className="font-medium underline underline-offset-4">
              BeyondChat
            </Link>
            . All rights reserved.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 px-8 md:gap-6 md:px-0">
          <nav className="flex gap-4 md:gap-6">
            <Link
              href="/privacy"
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              Terms
            </Link>
            <Link
              href="/help"
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              Help
            </Link>
          </nav>
          <div className="text-sm text-muted-foreground">
            <a href="mailto:support@beyondchat.ai" className="hover:underline">
              support@beyondchat.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
