import { format } from "date-fns";
import { ManageStaffForm } from "./components/manage-staff-form";
import axios from "axios";

const EditStaffPage = async ({ params }: { params: { staffId: string } }) => {
    // Construct the URL using the staffId from the params object
    const url = `https://648867740e2469c038fda6cc.mockapi.io/staff/${params.staffId}`;

    try {
        // Make the GET request to fetch staff data
        const response = await axios.get(url);

        // Extract staffData from the response
        let staffData = response.data;

        // If staffData is null or undefined, set it to null
        if (staffData == null) {
            staffData = null;
        } else if (Array.isArray(staffData)) {
            // If staffData is an array, loop through it and update date format and isDeleted property
            staffData.forEach((staff: any) => {
                staff.dob = format(new Date(staff.dob), 'MMMM do, yyyy');
                staff.isDeleted = staff.isDeleted.toString();
            });
        }

        return (
            <div className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    <ManageStaffForm initialData={staffData} />
                </div>
            </div>
        );
    } catch (error) {

        return (
            <div className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    <ManageStaffForm initialData={null} />
                </div>
            </div>
        );
    }
};

export default EditStaffPage;
