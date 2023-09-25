"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"
import ImageUpload from "@/components/ui/image-upload"

const formSchema = z.object({
    image: z.string().min(1),
    fullName: z.string().min(1),
    dob: z.string().min(1),
    citizenId: z.string().min(1),
    email: z.string().min(1),
    phoneNumber: z.string().min(1),
    isDeleted: z.string().min(1),

});

type ManageStaffFormValues = z.infer<typeof formSchema>

interface Staff {

}

interface ManageStaffFormProps {
    initialData: Staff | null;
};

export const ManageStaffForm: React.FC<ManageStaffFormProps> = ({
    initialData
}) => {
    const url = "https://648867740e2469c038fda6cc.mockapi.io/staff";
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? 'Edit Staff Account' : 'Create Staff Account';
    const description = initialData ? 'Edit a staff account.' : 'Add a new staff account';
    const toastMessage = initialData ? 'Staff account updated.' : 'Staff account created.';
    const action = initialData ? 'Save changes' : 'Create';

    const form = useForm<ManageStaffFormValues>({
        resolver: zodResolver(formSchema),
        // defaultValues: initialData || {
        //     label: '',
        //     imageUrl: ''
        // }
    });

    const onSubmit = async (data: ManageStaffFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`https://648867740e2469c038fda6cc.mockapi.io/staff/${params.staffId}`, data);
            } else {
                await axios.post(`https://648867740e2469c038fda6cc.mockapi.io/staff`, data);
            }
            router.refresh();
            router.push(`/admin/manage-staff`);
            toast.success(toastMessage);
        } catch (error: any) {
            toast.error('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
            router.refresh();
            router.push(`/${params.storeId}/billboards`);
            toast.success('Billboard deleted.');
        } catch (error: any) {
            toast.error('Make sure you removed all categories using this billboard first.');
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Staff Avatar Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange('')}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="md:grid md:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Billboard label" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dob"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date of birth</FormLabel>
                                    <FormControl>
                                        <Input type="date" disabled={loading} placeholder="Billboard label" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="citizenId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Citizen ID:</FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled={loading} placeholder="Billboard label" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email:</FormLabel>
                                    <FormControl>
                                        <Input type="email" disabled={loading} placeholder="Billboard label" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone:</FormLabel>
                                    <FormControl>
                                        <Input type="tel" disabled={loading} placeholder="Billboard label" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isDeleted"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status:</FormLabel>
                                    <FormControl>
                                        <Input type="text" disabled={loading} placeholder="Billboard label" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};