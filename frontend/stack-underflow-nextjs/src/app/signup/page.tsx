import Header from "@/components/Header";
import Signup from "@/components/Signup";
import { type Locale } from "@/i18n";

export default function SignupPage() {
  const locale: Locale = "en";
  
  return (
    <>
      <Header locale={locale} />
      <Signup locale={locale} />
    </>
  );
}
