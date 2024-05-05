import { UploadButton, UploadDropzone } from "@/components/uploadthing";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface ServerImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ServerImageUpload: FC<ServerImageUploadProps> = ({ value, onChange }) => {
  if (value) {
    return (
      <div className="flex justify-center items-center h-40 animate-fade-in">
        <div className="relative h-20 w-20 rounded-full border bg-gray-200">
          <Image fill alt="server image" src={value} className="rounded-full" />
          <button
            onClick={() => onChange("")}
            className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          >
            <X size={12} />
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <UploadDropzone
        appearance={{
          button:
            "ut-ready:bg-zinc-500 h-8 text-sm ut-uploading:cursor-not-allowed bg-blue-500",
          container: "dark:border-gray-500 p-5 ",
        }}
        endpoint="serverImage"
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error) => {
          console.log("Image must be less than 2 MB");
        }}
      />
    </div>
  );
};

export default ServerImageUpload;
