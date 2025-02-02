'use client';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useMemo } from 'react';
import { columns } from './columns';

interface ManageNewsClientProps {
	data: any;

}

export const ManageNewsClient: FC<ManageNewsClientProps> = ({ data }) => {
	const router = useRouter();
	const uniqueTags = useMemo(() => {
		const allTags = data.flatMap((item: any) => item.tags);
		return [...new Set(allTags)];
	}, [data]) as string[];


	const tagsData = uniqueTags.map((tag) => ({
		label: tag,
		value: tag,
	}));

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading title={`News (${Object.keys(data).length})`} description='Manage News information in the zoo' />
				<Button onClick={() => router.push('/staff/manage-news/new')}>
					<Plus className='mr-2 h-4 w-4' />
					Add New
				</Button>
			</div>
			<Separator />
			<DataTable columns={columns} data={data} searchKey='title' filterOptions={tagsData} />
		</>
	);
};
