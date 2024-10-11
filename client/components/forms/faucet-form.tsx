"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import Overlay from "@/components/overlay";
import SeeItOnExplorer from "../see-it-on-explorer";
import { faucetContractConfig } from "@/lib/contracts/faucet.config";
import { parseUnits } from "viem";

const FormSchema = z.object({
  amount: z.number(),
});

export default function FaucetForm({ address }: { address: `0x${string}` }) {
  const { toast } = useToast();

  const { data: hash, isPending, error, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 0,
    },
  });

  function setMax() {
    form.setValue("amount", 10);
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const amount = data.amount;
    writeContract({
      ...faucetContractConfig,
      functionName: "mint",
      args: [address, parseUnits(String(amount), 18)],
    });
  }

  useEffect(() => {
    if (isConfirmed) {
      const url = `https://basescan.org/tx/${hash}`;
      toast({
        title: "✅ Transaction confirmed",
        description: SeeItOnExplorer(url),
      });
      form.reset();
    }
  }, [form, hash, isConfirmed, toast]);

  useEffect(() => {
    if (error) {
      toast({
        title: "🚨 Error",
        description: error.message,
      });
      console.log({ error });
    }
  }, [error, toast]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 relative p-2"
      >
        <FormField
          control={form.control}
          name="amount"
          render={({}) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step={0.01}
                  placeholder="0"
                  {...form.register("amount", { valueAsNumber: true })}
                />
              </FormControl>
              <FormDescription>
                <Button
                  type="button"
                  onClick={() => setMax()}
                  className="p-0 text-xs"
                  variant="link"
                >
                  Recommended. (10 WETH)
                </Button>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Confirming..." : "Get fake WETH"}
        </Button>

        {isConfirming && <Overlay text="Waiting for confirmation..." />}
      </form>
    </Form>
  );
}
