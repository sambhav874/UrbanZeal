import Link from "next/link";

export default function UserTabs({isAdmin}){
    return(
        <div className="flex mx-auto justify-center gap-2 tabs items-center">
            <Link className={"active"} href={'/profile'}>Profile</Link>
            {isAdmin && (
                <>
                <Link href={'/categories'}>Categories</Link>
                <Link href={'/store-items'}>Store Items</Link>
                <Link href={'/users'}>Users</Link>
                
                </>
            ) }
        </div>
    )
}