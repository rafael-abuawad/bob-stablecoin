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
import { formatNumber } from "@/lib/utils";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { wethContractConfig } from "@/lib/contracts/weth.config";
import { engineContractConfig } from "@/lib/contracts/engine.config";
import Overlay from "@/components/overlay";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  amount: z.string(),
});

export function DepositForm({ address }: { address: `0x${string}` }) {
  const { toast } = useToast()
  const { data: balance } = useReadContract({
    ...wethContractConfig,
    functionName: "balanceOf",
    args: [address],
  });
  const { data: hash, isPending, error, writeContract } = useWriteContract();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: "",
    },
  });

  function setMax() {
    form.setValue("amount", (balance ?? BigInt(0)).toString());
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const amount = data.amount;
    writeContract({
      ...engineContractConfig,
      functionName: "deposit_collateral",
      args: [BigInt(amount)],
    });
    console.log(data)
    console.log(error)
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirmed) {
      toast({
            title: "✅ Transaction confirmed",
            description: "Friday, February 10, 2023 at 5:57 PM",
          })
    }
  }, [isConfirmed, toast])

  useEffect(() => {
    if (error) {
      toast({
            title: "🚨 Error",
            description: error.message,
          })
    }
  }, [error, toast])


  

  

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 relative"
      >
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
                  <Button
                    type="button"
                    onClick={setMax}
                    className="p-0 text-xs"
                    variant="link"
                  >
                    Max. ({formatNumber(balance)} WETH)
                  </Button>
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Confirming..." : "Deposit"}
        </Button>

        {isConfirming && <Overlay text="Waiting for confirmation..." />}
      </form>
    </Form>
  );
}
