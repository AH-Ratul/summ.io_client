"use client";

import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import Password from "@/src/components/ui/Password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { credentialsLogin } from "@/src/api/query/auth.query";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, {
    message: "password must be at least 6 characters long",
  }),
});

type TLoginForm = z.infer<typeof loginSchema>;

const loginWithCredentials = async (data: TLoginForm) => {
  const res = await credentialsLogin(data);
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
    mutationKey: ["USER"],
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

  const insertDemoCredentials = () => {
    form.setValue("email", "admin@summ.io");
    form.setValue("password", "admin12");
  };

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

          <Button
            onClick={insertDemoCredentials}
            type="button"
            variant="ghost"
            className="underline w-full cursor-pointer mt-1"
          >
            Use demo credentials
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
