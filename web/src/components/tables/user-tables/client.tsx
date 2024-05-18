"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { columns } from "./columns";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";
import type { User } from "~/components/tables/user-tables/types";
import { CONTRACTS_ADDRESS } from "~/constants";

interface ProductsClientProps {
  data: User[];
}

export const UserClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();
  const [groupAddress, setGroupAddress] = useState(CONTRACTS_ADDRESS);
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Group Address: ${groupAddress}`}
          description={`Total Users (${data.length})`}
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/vote`)}
        >
          Vote
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="memberAddress" columns={columns} data={data} />
    </>
  );
};
