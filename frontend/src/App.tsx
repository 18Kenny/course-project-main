import {ErrorBoundary} from "@/error-boundary/error-boundary.tsx";
import UserBlock from "@/features/user/user-block.tsx";
import EntriesBlock from "@/features/entries/entries-block.tsx";

function App() {
  return (
      <ErrorBoundary>
        <div className="h-screen flex flex-col overflow-hidden">
          <div className="bg-[rgb(226,0,116)] h-16 md:h-20 flex-shrink-0"></div>
          <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden">
            <div className="flex flex-col space-y-6 md:space-y-8 w-full max-w-md h-full max-h-full mt-2">
              <UserBlock />
              <EntriesBlock />
            </div>
          </div>
        </div>
      </ErrorBoundary>
  )
}

export default App
