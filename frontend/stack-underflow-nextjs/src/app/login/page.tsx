import Header from "@/components/Header";
import Login from "@/components/Login";
import { type Locale } from "@/i18n";

export default function LoginPage() {
  const locale: Locale = "en";
  
  return (
    <>
      <Header locale={locale} />
      <Login locale={locale} />
    </>
  );
}
