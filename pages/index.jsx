import Head from "next/head";
import Todo from "@/components/Todo";


export default function Home() {

  return (
    <>
      <Head>
        <title>TODOs</title>
      </Head>

      <main className="h-60  bg-pink-500 ">
       <Todo/>
      
      </main>
    </>
  );
}
