import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersAdmin, updateUserStatusAdmin } from "../store/userSlice";

const UserManagement = () => {

  const dispatch = useDispatch();

  const { users } = useSelector(state => state.user);

  useEffect(()=>{

    dispatch(fetchAllUsersAdmin());

  },[dispatch]);

  const updateStatus = (id,status)=>{

    dispatch(updateUserStatusAdmin({id,status}));
  };

  return (

    <div>

      <h4>User Management</h4>

      <table className="table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {users?.map(user => (

            <tr key={user.id}>

              <td>{user.id}</td>

              <td>
                {user.firstName} {user.lastName}
              </td>

              <td>{user.email}</td>

              <td>

                <select
                  value={user.status}
                  className="form-select"
                  onChange={(e)=>
                    updateStatus(user.id,e.target.value)
                  }
                >
                 
                  <option value="ACTIVE">
                    ACTIVE
                  </option>

                  <option value="BLOCKED">
                    BLOCKED
                  </option>

                </select>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default UserManagement;
