import Icons from "./icons";

export default function Loading() {
  return (
    <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
      <Icons.spinner
        width={24}
        height={24}
        className="mr-2 h-4 w-4 animate-spin"
      />
      Loading...
    </div>
  );
}
