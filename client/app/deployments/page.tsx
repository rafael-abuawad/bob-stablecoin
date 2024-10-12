import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function DeploymentsPage() {
  const contracts = [
    {
      name: "Engine",
      address: "0xA7e9D84133936Ab2599BB8ec5B29caa9Df4A9bD1",
    },
    {
      name: "BOBC",
      address: "0x947eA44Bd6560476819a91F2a5DBf030C43dee26",
    },
    {
      name: "WETH (Testnet only)",
      address: "0xec915716AE8cC0359A88c24E214792f6A12c192b",
    },
    {
      name: "Faucet (Testnet only)",
      address: "0x2AB5d7A0009b0409A422587A6B0ff18f40a8Cec6",
    },
  ];

  return (
    <>
      <main className="max-w-[85rem] px-4 py-4 sm:px-6 lg:px-8 mx-auto">
        <div className="w-full grid gap-3 grid-cols-1 max-w-7xl">
          <hgroup className="space-y-0.5">
            <h1 className="text-2xl font-bold tracking-tight">Deployments</h1>
            <h2 className="text-muted-foreground">
              A list of all the smartcontract deployed on Base Sepolia.
            </h2>
          </hgroup>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Contract</TableHead>
                    <TableHead>Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.map((contract, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {contract.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="link"
                            asChild
                            className="text-blue-500 hover:text-blue-600 px-0"
                          >
                            <Link
                              target="_blank"
                              href={`https://sepolia.basescan.org/address/${contract.address}`}
                            >
                              {contract.address}
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div></div>
        </div>
      </main>
    </>
  );
}
