import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import type {Entry} from "@/types/entry.type.ts";
import {Button} from "@/components/ui/button.tsx";
import {useThrowAsyncError} from "@/hooks/useThrowAsyncError.tsx";
import {useEffect, useState} from "react";
import {addEntry, deleteEntry, getEntries} from "@/features/entries/entries.service.ts";
import generateEntry from "@/features/entries/entries-generator.ts";
import {Trash2} from "lucide-react";

const sortEntriesNewestFirst = (list: Entry[]): Entry[] =>
  [...list].sort((a, b) => b.id - a.id);

const EntriesBlock = () => {
  const throwAsyncError = useThrowAsyncError();

  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const entries = await getEntries();
        setEntries(sortEntriesNewestFirst(entries));
      } catch (err) {
        throwAsyncError(err as Error);
      }
    };

    fetchEntries();
  }, [throwAsyncError]);


  const handleAddEntry = async () => {
    try {
      const value = generateEntry()
      const entry = await addEntry(value)
      setEntries(prev => sortEntriesNewestFirst([entry, ...prev]))
    } catch (err) {
      throwAsyncError(err as Error);
    }
  }

  const handleRemoveEntry = async (id: number) => {
    await deleteEntry(id)
    setEntries(prev => prev.filter(entry => entry.id !== id))
  }

  return (
      <Card className="flex flex-col h-full overflow-hidden">
        <CardHeader className="flex-shrink-0">
          <Button
              type="submit"
              variant="outline"
              onClick={handleAddEntry}>
            Add entry
          </Button>
        </CardHeader>
        <CardContent className="p-6 overflow-y-auto flex-1">
          <ul className="space-y-2">
            {entries.map(({id, value}) => (
                <li key={id} className="p-3 border rounded-lg flex justify-between items-center">
                  <span>{value}</span>
                  <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveEntry(id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4"/>
                  </Button>
                </li>
            ))}
          </ul>
        </CardContent>
      </Card>
  )
}

export default EntriesBlock;
