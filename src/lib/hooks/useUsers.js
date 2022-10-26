import { useEffect, useState } from "react";
import { getUsers } from "../services/users";

export const useUsers = () => {
  const [users, setUsers] = useState({
    data: [],
    loading: true,
    error: false,
  });

  const setData = (data) =>
    setUsers({
      data,
      loading: false,
      error: !data,
    });

  const setError = () =>
    setUsers({
      data: [],
      loading: false,
      error: true,
    });

  const updateUsersByUser = (user) => {
    const newUsers = users.data.map((u) => (u.id === user.id ? user : u));

    setData(newUsers);
  };

  useEffect(() => {
    const controller = new AbortController();

    loadUsers(setData, setError, { signal: controller.signal });

    return () => controller.abort();
  }, []);

  return {
    users: users.data,
    loading: users.loading,
    error: users.error,
    updateUsersByUser,
  };
};

const loadUsers = async (setData, setError, { signal }) => {
  const { data, aborted, error } = await getUsers({ signal });

  if (aborted) return;

  if (error) setError();
  else setData(data);
};
