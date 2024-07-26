"use client";
import { Button } from "@/components/ui/button";
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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { editRoomAction } from "./actions";
import { useParams, useRouter } from "next/navigation";
import { Room } from "@/db/schema";
import { toast } from "@/components/ui/use-toast";
import { Suspense, useState } from "react";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(250),
  language: z.string().min(1).max(50),
  githubRepo: z.string().min(1).max(50),
});

const EditRoomForm = ({ room }: { room: Room }) => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  params.roomId;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: room.name,
      description: room.description ?? "",
      language: room.language,
      githubRepo: room.githubRepo ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await editRoomAction({
        id: params.roomId as string,
        ...values,
      });
      toast({
        title: "Room Updated",
        description: "Your room has been updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating the room",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Suspense>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  please describe what you are codiing on
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="githubRepo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GithubRepo</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>please put your GithubRepo</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="typescript,drizzle-orm,next.js"
                  />
                </FormControl>
                <FormDescription>
                  List the technologies used in your project
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </Suspense>
  );
};

export default EditRoomForm;
