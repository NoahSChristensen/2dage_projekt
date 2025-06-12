"use client";
import Image from "next/image";
import homeStyle from "./home.module.scss";
import useRequestData from "./hooks/useRequestData";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { makeRequest, loading, data, error } = useRequestData();
  const [cardAnim, setCardAnim] = useState(false);
  const [cardRotate, setCardRotate] = useState(false);

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
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "circIn", type: "spring" }}
            onAnimationComplete={() => setCardAnim(true)}
          >
            <h1>A Story About Anything...</h1>
          </motion.div>
          
          <AnimatePresence mode="wait">
            {cardAnim && (
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "circIn", type: "spring" }}
                onAnimationComplete={() => setCardRotate(true)}
              >
                <div className={homeStyle.grid}>
                  {
                    data.content.map((item, index: number) => (
                      <motion.div
                        key={index}
                        animate={{ rotate: index % 2 === 0 ? 10 * (index + 1) : -10 * (index + 1), }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      >
                        <div className={homeStyle.imgCon}>
                          <Link
                            href={{
                              pathname: "/characters",
                              query: { id: index },
                            }}
                          >
                            <Image
                              src={data.content[index].imageFront}
                              alt="Picture"
                              width={250}
                              height={250}
                            ></Image>
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}
    </main>
  );
}
