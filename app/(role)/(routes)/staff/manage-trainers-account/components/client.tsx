"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC, useState } from "react"
import { columns } from "./columns"
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons"


interface ManageTrainerClientProps {
    data: any
}

export const ManageTrainerClient: FC<ManageTrainerClientProps> = ({ data }) => {
    const router = useRouter();
    const statuses = [
        {
            value: "0",
            label: "Active",
            icon: CheckCircledIcon,
        },
        {
            value: "1",
            label: "Inactive",
            icon: CrossCircledIcon,
        },
    ]

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Trainer (${Object.keys(data).length})`} description="Manage Trainers' account in the zoo" />

                <Button onClick={() => router.push("/staff/manage-trainers-account/new")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="fullName" filterOptions={statuses} />

        </>
    )
}