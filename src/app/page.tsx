"use client";
import Image from "next/image";
import homeStyle from "./home.module.scss";
import useRequestData from "./hooks/useRequestData";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const { makeRequest, loading, data, error } = useRequestData();

  useEffect(() => {
    makeRequest(`/assets/data/data.json`);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error has occured!</div>;
  }

  return (
    <main>
      {data && data.content && (
        <section id={homeStyle.container}>
          <h1>A Story About Anything...</h1>
          {data.content.map((item, index:number) => 
            <div className={homeStyle.imgCon}>
              <Link href={{ pathname: "/characters", query: { id: index } }}>
                <Image
                  src={data.content[index].image}
                  alt="Picture"
                  width={250}
                  height={250}
                ></Image>
              </Link>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
