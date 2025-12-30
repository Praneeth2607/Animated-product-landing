import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const bg = bgRef.current;

    gsap.to(bg, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, []);

  return (
    <section ref={heroRef} className={styles.hero}>
      <div
        ref={bgRef}
        className={styles.heroBg}
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2)"
        }}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <span className={styles.eyebrow}>Electric Performance</span>
        <h1 className={styles.title}>Apex One</h1>
        <p className={styles.text}>
          A next-generation electric performance car built around balance,
          restraint, and precise control.
        </p>
      </div>
    </section>
  );
}
