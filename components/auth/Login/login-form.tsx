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
import Password from "@/components/ui/Password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { signIn } from "next-auth/react";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, {
    message: "password must be at least 6 characters long",
  }),
});

type TLoginForm = z.infer<typeof loginSchema>;

const loginWithCredentials = async (data: TLoginForm) => {
  const res = await signIn("credentials", { ...data, redirect: false });
  if (res?.error) throw new Error(res.error);
  return res;
};

const LoginForm = () => {
  const router = useRouter();

  const form = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginWithCredentials,
    onSuccess: (res) => {
      toast.success("Login Successfull");
      form.reset();
      router.push("/");
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  const handleLogin = form.handleSubmit((data) => mutate(data));
  return (
    <>
      <Form {...form}>
        <form onSubmit={handleLogin} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-sm">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="@: ahr@e.com"
                    type="email"
                    className="focus:ring-1 focus:ring-primary focus:outline-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-sm">
                  Password
                </FormLabel>
                <FormControl>
                  <Password {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full cursor-pointer">
            {isPending ? "Logging..." : "Login"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
