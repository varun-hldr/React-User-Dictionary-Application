const endponit = "http://localhost:5000/users";

export async function getUsers(page) {
  try {
    let response = await fetch(
      endponit + `?_page=${page}&_limit=${10000}?_sort=[Full Name]&_order=asc`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
    return {
      type: "USERS",
      payload: response,
    };
  } catch (err) {
    console.error(err);
  }
}

export async function updateUser(user, id) {
  try {
    let response = await fetch(`${endponit}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}

export async function deleteUser(id) {
  try {
    await fetch(`${endponit}/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  } catch (err) {
    console.error(err);
  }
}

export async function postUser(user) {
  try {
    let response = await fetch(endponit, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}

export function setLoaded(check) {
  return {
    type: "LOADED",
    payload: check,
  };
}
