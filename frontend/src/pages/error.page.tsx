import {AlertTriangle} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

type Props = {
  error: Error;
};

export const ErrorPage = ({error}: Props) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader className="flex flex-col items-center gap-2">
          <AlertTriangle className="h-12 w-12 text-destructive"/>
          <CardTitle className="text-2xl font-semibold">
            Something went wrong
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {error.message}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
