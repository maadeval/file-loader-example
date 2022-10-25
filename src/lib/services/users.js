const USERS_URL = "http://localhost:4000/users";

export const getUsers = async ({ signal }) => {
  let data = [];

  try {
    const res = await fetch(USERS_URL, { signal });

    if (res.ok) data = await res.json();

    return {
      data,
      error: !data,
      aborted: false,
    };
  } catch (err) {
    const isAborted = err.name === "AbortError";

    return {
      data,
      error: !isAborted,
      aborted: isAborted,
    };
  }
};

export const patchUserPicture = async (userId, picture) => {
  let user = null;

  try {
    const res = await fetch(`${USERS_URL}/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        picture,
      }),
    });

    if (res.ok) user = await res.json();

    return {
      success: res.ok,
      error: res.ok ? null : "No se pudo actualizar la imagen",
      user,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
      user,
    };
  }
};
