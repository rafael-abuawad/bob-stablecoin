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
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { formatNumber } from "@/lib/utils";
import { engineContractConfig } from "@/lib/contracts/engine.config";
import { useToast } from "@/hooks/use-toast";
import { formatUnits, parseUnits } from "viem";
import { useEffect } from "react";
import Overlay from "@/components/overlay";
import SeeItOnExplorer from "../see-it-on-explorer";

const FormSchema = z.object({
  amount: z.number(),
});

export default function MintForm({ address }: { address: `0x${string}` }) {
  const { toast } = useToast();

  const { data: available, refetch } = useReadContract({
    ...engineContractConfig,
    functionName: "get_bobc_available",
    args: [address],
  });

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

  function setMax(n: bigint | undefined) {
    form.setValue("amount", Number(formatUnits(n ?? BigInt(0), 18)));
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const amount = data.amount;
    writeContract({
      ...engineContractConfig,
      functionName: "mint_bobc",
      args: [parseUnits(String(amount), 18)],
    });
  }

  useEffect(() => {
    if (isConfirmed) {
      const url = `https://basescan.org/tx/${hash}`;
      toast({
        title: "✅ Transaction confirmed",
        description: SeeItOnExplorer(url),
      });
      refetch();
      form.reset();
    }
  }, [form, hash, isConfirmed, refetch, toast]);

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
              {available && available.toString() !== "0" && (
                <FormDescription>
                  <Button
                    type="button"
                    onClick={() => setMax(available)}
                    className="p-0 text-xs"
                    variant="link"
                  >
                    Max. ({formatNumber(available)} BOBC)
                  </Button>
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Confirming..." : "Mint"}
        </Button>

        {isConfirming && <Overlay text="Waiting for confirmation..." />}
      </form>
    </Form>
  );
}
