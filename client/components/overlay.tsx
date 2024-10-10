import Icons from "./icons";

export default function Overlay({ text }: { text?: string }) {
  if (!text) {
    text = "Loading...";
  }
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
        <Icons.spinner
          width={24}
          height={24}
          className="mr-2 h-4 w-4 animate-spin"
        />
        {text}
      </div>
    </div>
  );
}
