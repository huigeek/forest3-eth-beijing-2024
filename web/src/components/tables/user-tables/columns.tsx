"use client";
import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "./types";
import { Checkbox } from "~/components/ui/checkbox";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "memberAddress",
    header: "合约地址",
  },
  {
    accessorKey: "stakeAmount",
    header: "质押金额（Wei）",
  },
  {
    accessorKey: "hasVoted",
    header: "是否已投票",
  },
  {
    accessorKey: "hasCompletedGoal",
    header: "是否完成目标",
  },
  {
    accessorKey: "hasWithdraw",
    header: "是否已提现",
  },
  {
    accessorKey: "votesReceived",
    header: "收到的投票数",
  },
];
