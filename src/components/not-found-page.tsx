import BackHomeButton from "./back-home-button";
import { FluentEmojiMeltingFace } from "./icon";

export default function NotFoundPage() {
  return <div className="h-screen flex items-center justify-center">
    <FluentEmojiMeltingFace className="w-32 h-32" />
    <BackHomeButton />
  </div>;
}