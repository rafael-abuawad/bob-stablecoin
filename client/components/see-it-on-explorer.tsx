import { Button } from "@/components/ui/button";
import { Link2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

const SeeItOnExplorer = (url: string) => (
  <Button asChild variant="link" className="px-0">
    <Link href={url}>
      <Link2Icon className="w-3 h-3 mr-1" /> See it on Basescan
    </Link>
  </Button>
);

export default SeeItOnExplorer;
