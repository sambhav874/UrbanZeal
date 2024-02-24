import { useProfile } from "../../../components/UseProfile";
import UserTabs from "../../../components/layout/UserTabs";

export default function EditUserPage(){

    const {loading , data } = useProfile();

    if(loading){
        return  <div>Loading...</div>;
    }

    if(!data.admin){
        return 'Not an admin';
    }

    return(
        <div className="mt-8 mx-auto max-w-2xl">
            <UserTabs isAdmin={true} />
        </div>
    )
}