import Head from "next/head";
import Header from "@/components/layouts/Header";

export default function Layout(props: { children: any }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="max-w-lg mx-auto px-5 pb-10">{props.children}</main>
    </>
  );
}