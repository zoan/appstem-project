import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={(e) => {
          alert("asdf");
        }}
      >
        <label>Search</label>
        <input />
        <button type="submit">Submit!!</button>
      </form>
    </main>
  );
}
