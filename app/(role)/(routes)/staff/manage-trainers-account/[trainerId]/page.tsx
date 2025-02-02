import { format } from "date-fns";
import { ManageTrainerForm } from "./components/manage-account-form";
import axios from "axios";

const ManageTrainerPage = async ({ params }: { params: { trainerId: string } }) => {
    // Construct the URL using the staffId from the params object
    const url = `https://648867740e2469c038fda6cc.mockapi.io/staff/${params.trainerId}`;

    try {
        // Make the GET request to fetch staff data
        const response = await axios.get(url);

        // Extract trainerData from the response
        let trainerData = response.data;

        // If trainerData is null or undefined, set it to null
        if (trainerData == null) {
            trainerData = null;
        } else if (Array.isArray(trainerData)) {
            // If trainerData is an array, loop through it and update date format and isDeleted property
            trainerData.forEach((staff: any) => {
                staff.dob = format(new Date(staff.dob), 'MMMM do, yyyy');
                staff.isDeleted = staff.isDeleted.toString();
            });
        }

        return (
            <div className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    <ManageTrainerForm initialData={trainerData} />

                </div>
            </div>
        );
    } catch (error) {

        return (
            <div className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    <ManageTrainerForm initialData={null} />
                </div>
            </div>
        );
    }
};

export default ManageTrainerPage;
