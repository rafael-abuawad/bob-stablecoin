"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
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
import { useReadContract } from "wagmi";
import { formatNumber } from "@/lib/utils";
import { bobcContractConfig } from "@/lib/contracts/bobc.config";

const FormSchema = z.object({
  amount: z.number(),
});

export default function BurnForm({ address }: { address: `0x${string}` }) {
  const { data: balance } = useReadContract({
    ...bobcContractConfig,
    functionName: "balanceOf",
    args: [address],
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 0,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              {balance && balance.toString() !== "0" && (
                <FormDescription>
                  <Button className="p-0 text-xs" variant="link">
                    Max. ({formatNumber(balance)} WETH)
                  </Button>
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Burn</Button>
      </form>
    </Form>
  );
}
