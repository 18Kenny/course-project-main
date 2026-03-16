import {API_PREFIX} from "@/config.ts";
import type {Entry} from "@/types/entry.type.ts";

const ENTRIES_PATH = '/entries'
const ENTRIES_API = `${API_PREFIX}${ENTRIES_PATH}`;

export const getEntries = async (): Promise<Entry[]> => {
  const response = await fetch(ENTRIES_API);

  if (response.status === 404) {
    return []
  }

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}, statusText: ${response.statusText}`);
  }

  return response.json();
}

export const addEntry = async (value: string): Promise<Entry> => {
  const response = await fetch(ENTRIES_API, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      value
    })
  });

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}, statusText: ${response.statusText}`);
  }

  return response.json();
}

export const deleteEntry = async (id: number): Promise<void> => {
  const response = await fetch(`${ENTRIES_API}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}, statusText: ${response.statusText}`);
  }
}
