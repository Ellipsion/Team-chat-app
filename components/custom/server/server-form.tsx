"use client";

import { z } from "zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/components/uploadthing";
import ServerImageUpload from "@/components/custom/server/server-image-upload";
import { useRouter } from "next/navigation";

interface ServerFormProps {
  close?: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Server Name must be at least 2 characters.",
  }),
  imageUrl: z.string().min(1, {
    message: "Server Image is required",
  }),
});

type formType = z.infer<typeof formSchema>;

const ServerForm: FC<ServerFormProps> = ({ close }) => {
  const router = useRouter();

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: formType) {
    try {
      const res = await axios.post("/api/servers", values);
      console.log(res);
      router.refresh();
      router.push(`/servers/${res.data.server.id}`);
      close && close();
      // TODO: add a success toast
    } catch (error) {
      // TODO: add a failure toast
    }
  }

  return (
    <div className="max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="px-2">
                <FormControl>
                  <ServerImageUpload {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="px-2">
                <FormLabel className="uppercase text-xs text-zinc-500 dark:text-secondary-foreground/70 font-bold">
                  server name
                </FormLabel>
                <FormControl>
                  <Input
                    className="dark:bg-gray-600 bg-gray-200 focus-visible:ring-indigo-500 focus-visible:ring-1 focus-visible:ring-offset-0"
                    placeholder="Enter server name"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  This is your public display name.
                </FormDescription>
                <FormMessage className="dark:text-rose-500 text-xs" />
              </FormItem>
            )}
          />
          <div className="w-full p-2">
            <Button type="submit" variant={"primary"} className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ServerForm;
