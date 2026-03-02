import Header from "@/components/Header";
import CreateQuestion from "@/components/CreateQuestion";
import { type Locale } from "@/i18n";

export default function CreateQuestionPage() {
  const locale: Locale = "en";
  
  return (
    <>
      <Header locale={locale} />
      <CreateQuestion locale={locale} />
    </>
  );
}
