import { redirect } from "next/navigation";
import { getSession, login, logout } from "@/app/lib";

export default async function Page() {
  const session = await getSession();
  console.log(session?.user?.name);
  return (
    <section className="flex justify-center items-center h-[90vh]">
      <div className="border-2 border-main bg-white rounded-md shadow-lg h-[50%] w-[40%] flex flex-col items-center justify-center text-4xl">
        <form className="flex flex-col items-center"
          action={async (formData) => {
            "use server";
            const success: boolean = await login(formData);
            if(success) redirect("/admin/dashboard");
          }}
        >
          <input type="password" placeholder="Password" name="password" />
          <br />
          <button className="w-64 bg-accent rounded-lg m-6 h-16" type="submit">Login</button>
        </form>
        <form
          action={async () => {
            "use server";
            await logout();
            redirect("/");
          }}
        >
          <button className="w-64 bg-accent rounded-lg m-6 h-16" type="submit">Logout</button>
        </form>
      </div>
    </section>
  );
}