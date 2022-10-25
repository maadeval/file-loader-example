import { createContext } from "react";
import { useUsers } from "../../../lib/hooks/useUsers";
import UsersListRows from "../UsersListRows/UsersListRows";

import style from "./UsersList.module.css";

export const UsersContext = createContext();

const UsersList = () => {
  const { users, loading, error, updateUsersByUser } = useUsers();

  return (
    <section className={style.wrapper}>
      <h1 className={style.title}>Lista de invitados</h1>
      <UsersContext.Provider value={{ updateUsersByUser }}>
        <UsersListRows users={users} loading={loading} error={error} />
      </UsersContext.Provider>
    </section>
  );
};

export default UsersList;
