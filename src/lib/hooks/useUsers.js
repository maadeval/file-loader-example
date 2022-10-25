import { useEffect, useState } from "react";
import { getUsers } from "../services/users";

export const useUsers = () => {
  const [users, setUsers] = useState({
    data: [],
    loading: true,
    error: false,
    update: false,
  });

  const setData = (data) =>
    setUsers({
      data,
      loading: false,
      error: !data,
      update: false,
    });

  const setError = () =>
    setUsers({
      data: [],
      loading: false,
      error: true,
      update: false,
    });

  const updateUsersByUser = (user) => {
    const newUsers = users.data.map((u) => (u.id === user.id ? user : u));

    setData(newUsers);
  };

  useEffect(() => {
    const controller = new AbortController();

    loadUsers(setData, setError, { signal: controller.signal });

    return () => controller.abort();
  }, [users.update]);

  return {
    users: users.data,
    loading: users.loading,
    error: users.error,
    updateUsersByUser,
  };
};

const loadUsers = async (setData, setError, { signal }) => {
  const { data, aborted } = await getUsers({ signal });

  if (aborted) return;
  if (data) setData(data);
  else setError();
};
