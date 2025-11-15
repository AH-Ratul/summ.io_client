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
import { createUser } from "@/src/api/query/auth.query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const registerSchema = z
  .object({
    name: z.string("Name required"),
    email: z.email(),
    password: z.string().min(6, {
      message: "password must be at least 6 characters long",
    }),
    confirmPassword: z.string().min(6, {
      message: "password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: (res) => {
      toast.success(res.message);
      form.reset();
      router.push("/login");
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    mutate(userInfo);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-sm">Name</FormLabel>
                <FormControl>
                  <Input placeholder="@: ahr" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-sm">Email</FormLabel>
                <FormControl>
                  <Input placeholder="@: ahr@e.com" type="email" {...field} />
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
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-sm">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Password {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full cursor-pointer mt-2">
            {isPending ? "Proccessing..." : "Register"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
