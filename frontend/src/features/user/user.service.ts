import type {User} from "@/features/user/user.type.ts";
import {API_PREFIX} from "@/config.ts";

const USER_PATH = '/user'
const USER_API = `${API_PREFIX}${USER_PATH}`;

export const getUser = async (): Promise<User> => {
  const response = await fetch(USER_API);

  if (response.status === 404) {
    return {username: ""}
  }

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}, statusText: ${response.statusText}`);
  }

  return response.json();
}

export const saveUser = async (name: string): Promise<User> => {
  const response = await fetch(USER_API, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      username: name,
    })
  });

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}, statusText: ${response.statusText}`);
  }

  return response.json();
}
