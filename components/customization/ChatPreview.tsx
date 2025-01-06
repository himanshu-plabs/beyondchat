import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CustomizationForm } from "@/types/customization";
import { useState } from "react";
import { useRouter } from "next/router";
interface ChatPreviewProps {
  previewUrl: string;
  formValues: CustomizationForm;
}

export function ChatPreview({ previewUrl, formValues }: ChatPreviewProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { position, primaryColor } = formValues.theme;
  const router = useRouter();
  return (
    <div className="relative aspect-video w-full rounded-lg border bg-background">
      <div className="absolute inset-0 flex items-center justify-center">
        {!previewUrl ? (
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              No website URL found. Please go back to the organization setup.
            </p>
            <Button
              variant="outline"
              onClick={() => router.push("/setup/organization")}
            >
              Go to Organization Setup
            </Button>
          </div>
        ) : (
          <iframe
            src={previewUrl}
            className="h-full w-full rounded-lg"
            sandbox="allow-same-origin allow-scripts"
          />
        )}
      </div>

      <div
        className={cn(
          "absolute p-4",
          position === "bottom-right" && "bottom-0 right-0",
          position === "bottom-left" && "bottom-0 left-0",
          position === "top-right" && "top-0 right-0",
          position === "top-left" && "top-0 left-0"
        )}
      >
        <Button
          size="icon"
          className={cn(
            "h-12 w-12 rounded-full shadow-lg",
            `bg-${primaryColor}-500 hover:bg-${primaryColor}-600`
          )}
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          {isChatOpen ? "×" : "💬"}
        </Button>
      </div>

      {isChatOpen && (
        <div
          className={cn(
            "absolute w-[350px] h-[500px] bg-white rounded-lg shadow-xl border",
            position === "bottom-right" && "bottom-16 right-4",
            position === "bottom-left" && "bottom-16 left-4",
            position === "top-right" && "top-16 right-4",
            position === "top-left" && "top-16 left-4"
          )}
        >
          <div className="flex flex-col h-full">
            <div
              className={cn(
                "p-4 rounded-t-lg",
                `bg-${primaryColor}-500 text-white`
              )}
            >
              <h3 className="font-semibold">Chat with us</h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  {formValues.behavior.welcomeMessage}
                </div>
              </div>
            </div>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input placeholder="Type a message..." className="flex-1" />
                <Button>Send</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
