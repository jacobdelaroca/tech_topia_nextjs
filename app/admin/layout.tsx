import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const divStyle: React.CSSProperties = {
  //   backgroundImage: `url(${topShape.src})`,
  //   backgroundSize: '',
  //   backgroundRepeat: "no-repeat",
  //   backgroundPosition: 'center',
  // };
  const navItems = [
    {
      text: "Login",
      href: "/admin/credentials"
    },
    {
      text: "Generate QR",
      href: "/admin/generateQR"
    },
    {
      text: "Dashboard",
      href: "/admin/dashboard"
    },
    {
      text: "Automate",
      href: "/admin/automate"
    },

  ]
  return (
    <div>
      <nav className="h-[96px]  lg:block  p-2  w-screen z-50 bg-accent2">
        {navItems.map((item, i) => (
          <Link key={i} href={item.href} className={`float-start h-full px-2 flex items-center mx-2 `} >
            <div className="lg:text-3xl text-lg float-start">{item.text}</div>
          </Link>
        ))}
        {/* <button onClick={() => setCount(c => c+1)}>asdhasldhlasd</button>
        {count} */}
      </nav>
      <div className="text-black">

        {children}
      </div>
    </div>
  );
}