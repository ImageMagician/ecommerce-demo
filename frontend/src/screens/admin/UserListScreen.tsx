// GENERAL
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

// SLICES
import { useGetAllUsersQuery } from "../../slices/usersApiSlice";

// TYPES
import type { User } from "../../types.ts";

const UserListScreen = () => {
    const { data: users } = useGetAllUsersQuery();

    const editUserHandler = ( id: string ) => {
        console.log('edit user: ', id);
    }

    const deleteUserHandler = ( id: string ) => {
        console.log('delete user: ', id);
    }

    return <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl text-gray-500 font-semibold mb-4">Users</h1>
        <div className="grid grid-cols-7 gap-8 text-sm uppercase text-gray-400 border-b border-gray-200 pb-1">
            <div className="col-span-2">NAME</div>
            <div className="col-span-2">EMAIL</div>
            <div className="col-span-1 text-center">ADMIN</div>
            <div className="col-span-1">DATE ADDED</div>
            <div className="col-span-1"></div>
        </div>
        <div className="order-list">

            { users && users.length > 0 && users.map((user: User) =>
                <div className="grid grid-cols-7 gap-8 order-list-item items-center" key={ user._id }>
                    <div className="col-span-2">
                        { user.name }
                    </div>
                    <div className="col-span-2">
                        { user.email }
                    </div>
                    <div className="col-span-1 text-center">
                        {
                            user.isAdmin ? <span className="font-bold text-green-600">&#10003;</span>
                            : ''
                        }
                    </div>
                    <div className="col-span-1">
                        { format( user.createdAt, "MMM d, yyyy" ) }
                    </div>
                    <div className="col-span-1">
                        <button type="button"
                                className="p-2 text-gray-400 hover:bg-gray-200 rounded cursor-pointer"
                                onClick={ () => editUserHandler( user._id ) }
                        >
                            <FontAwesomeIcon icon={faEdit} size="sm" />
                        </button>
                        <button type="button"
                                className="p-2 text-gray-400 hover:bg-gray-200 rounded cursor-pointer"
                                onClick={ () => deleteUserHandler( user._id ) }
                        >
                            <FontAwesomeIcon icon={ faTrash } size="sm" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
}

export default UserListScreen;