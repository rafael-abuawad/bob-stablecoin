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
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import {
  engineAddress,
  engineContractConfig,
} from "@/lib/contracts/engine.config";
import Overlay from "@/components/overlay";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { tokenContractConfig, wethAddress } from "@/lib/contracts/token.config";
import { formatUnits, parseUnits } from "viem";

const FormSchema = z.object({
  amount: z.any(),
});

export function DepositForm({ address }: { address: `0x${string}` }) {
  const { toast } = useToast();

  const { data, refetch } = useReadContracts({
    contracts: [
      {
        ...tokenContractConfig,
        address: wethAddress,
        functionName: "balanceOf",
        args: [address],
      },
      {
        ...tokenContractConfig,
        address: wethAddress,
        functionName: "allowance",
        args: [address, engineAddress],
      },
    ],
  });

  const [balance, allowance] = data || [];

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

  function onSubmitAllowance(data: z.infer<typeof FormSchema>) {
    const amount = data.amount;
    writeContract({
      ...tokenContractConfig,
      address: wethAddress,
      functionName: "approve",
      args: [engineAddress, parseUnits(amount, 18)],
    });
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const amount = data.amount;
    writeContract({
      ...engineContractConfig,
      functionName: "deposit_collateral",
      args: [parseUnits(amount, 18)],
    });
  }

  useEffect(() => {
    if (isConfirmed) {
      toast({
        title: "✅ Transaction confirmed",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
      refetch();
    }
  }, [isConfirmed, refetch, toast]);

  useEffect(() => {
    if (error) {
      toast({
        title: "🚨 Error",
        description: error.message,
      });
    }
  }, [error, toast]);

  if (allowance?.result?.toString() == "0") {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitAllowance)}
          className="w-2/3 space-y-6 relative"
        >
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" step={0.01} placeholder="0" {...field} />
                </FormControl>
                {balance && balance.toString() !== "0" && (
                  <FormDescription>
                    <Button
                      type="button"
                      onClick={() => setMax(balance.result)}
                      className="p-0 text-xs"
                      variant="link"
                    >
                      Max. ({formatNumber(balance.result)} WETH)
                    </Button>
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Confirming..." : "Approve"}
          </Button>

          {isConfirming && <Overlay text="Waiting for confirmation..." />}
        </form>
      </Form>
    );
  }

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
              {allowance && allowance.toString() !== "0" && (
                <FormDescription>
                  <Button
                    type="button"
                    onClick={() => setMax(allowance.result)}
                    className="p-0 text-xs"
                    variant="link"
                  >
                    Max. ({formatNumber(allowance.result)} WETH)
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
