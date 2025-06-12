"use client";
import { useSearchParams } from "next/navigation";
import useRequestData from "../hooks/useRequestData";
import { useEffect, useState } from "react";
import Link from "next/link";
import charStyle from "./char.module.scss";
import Image from "next/image";
import Parse from "html-react-parser";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";

const page = () => {
  const { makeRequest, loading, data, error } = useRequestData();

  const searchParams = useSearchParams();
  const query = searchParams.get("id");
  const id = Number(query);

  console.log(id);

  useEffect(() => {
    try {
      makeRequest(`/assets/data/data.json`);
    } catch (err) {
      throw new Error("Fejl -" + err);
    }
  }, []);

  console.log(data?.content[id]);

  const [imgAnim, SetImgAnim] = useState(false);
  const [textAnim, SetTextAnim] = useState(false);

  return (
    <main>
      <Link href="/">Gå tilbage</Link>
      {data && data?.content[id] && (
        <section id={charStyle.container}>
          <motion.div
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "circIn", type: "spring" }}
            onAnimationComplete={() => SetImgAnim(true)}
          >
            <article className={charStyle.chapTitle}>
              <h1> {data?.content[id].title} </h1>
            </article>
          </motion.div>

          <div id={charStyle.contentContainer}>
            {imgAnim && (
              <motion.div
                initial={{ x: -300, opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "circIn", type: "spring" }}
                onAnimationComplete={() => SetTextAnim(true)}
              >
                <div className={charStyle.imageCon}>
                  <Image
                    src={data?.content[id].imageSub}
                    alt="Picture"
                    width={250}
                    height={500}
                  ></Image>
                </div>
              </motion.div>
            )}

            <div id={charStyle.textContainer}>
              {textAnim && (
                <motion.div
                initial={{x: 300, opacity: 0}}
                animate={{x: 0, opacity: 1}}
                transition={{duration: 0.8, ease: "circIn", type: "spring"}}
                >
                  <h2 style={{ color: data?.content[id].color[2].Color }}>
                    {data?.content[id].chapterTitle}
                  </h2>

                  <article>{Parse(data?.content[id].content)}</article>

                  <section>
                    {data?.content[id].color.map((item, index) => (
                      <div key={index} style={{ background: item.Color }}></div>
                    ))}
                  </section>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default page;
