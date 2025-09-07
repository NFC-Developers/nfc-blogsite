
import AuthForm from "@/components/auth/AuthForm";
import Navbar from "@/components/shared/NavigationBar";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 dark:from-gray-900 dark:via-slate-900 dark:to-pink-950">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <AuthForm mode="register" />
      </div>
    </div>
  );
}
