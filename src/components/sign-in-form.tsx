"use client";

import {
  type SignInFormData,
  SignInFormDataSchema,
} from "@/models/sign-in-form-data";

import { LockIcon, LockOpenIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { ApiKeyInput } from "@/components/api-key-input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";

export function SignInForm() {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(SignInFormDataSchema),
    defaultValues: {
      apiKey: "",
    },
  });

  const router = useRouter();

  const submitFormData = async (formData: SignInFormData) => {
    // Clear the form
    form.reset();

    // Send the request
    try {
      // Send the request to sign in
      await axios.post("/api/auth/sign-in", formData);

      // Redirect to the home page
      router.push("/");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitFormData)}>
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-6">
            <LockIcon className="text-muted-foreground size-24" />

            <div className="flex flex-col gap-4">
              <FormField
                name="apiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ApiKeyInput {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit">
                <LockOpenIcon
                  className="-ms-1 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                Unlock
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
