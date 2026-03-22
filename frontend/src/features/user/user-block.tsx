import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import {getUser, saveUser} from "@/features/user/user.service.ts";
import {useThrowAsyncError} from "@/hooks/useThrowAsyncError.tsx";
import {isNameValid} from "@/features/user/user.validation..ts";
import {Card} from "@/components/ui/card.tsx";

const UserBlock = () => {
  const throwAsyncError = useThrowAsyncError();

  const [name, setName] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [validationError, setValidationError] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        setName(user.username);
      } catch (err) {
        throwAsyncError(err as Error);
      }
    };

    fetchUser();
  }, [throwAsyncError]);


  const handleUserSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const validation = isNameValid(inputName)
      if (!validation.isOk) {
        setValidationError(validation.message);
        return;
      }

      const user = await saveUser(inputName);
      setName(user.username);
    } catch (err) {
      throwAsyncError(err as Error);
    }
  };

  return (
      !name
          ? (
              <div className="flex flex-col w-full max-w-sm gap-2">
                <div className="flex gap-2">
                  <Input
                      type="text"
                      placeholder="enter name"
                      onChange={(e) => {
                        setInputName(e.target.value);
                        setValidationError('');
                      }}
                  />
                  <Button
                      type="submit"
                      variant="outline"
                      onClick={handleUserSave}
                      disabled={!inputName || !!validationError}>
                    Save
                  </Button>
                </div>
                {validationError && (
                    <p className="text-red-500 text-sm">{validationError}</p>
                )}
              </div>
          )
          : (
              <Card className="flex items-center justify-center">
                <span className="text-3xl font-semibold">{`Hello, ${name}`}</span>
              </Card>)
  )
}

export default UserBlock;
