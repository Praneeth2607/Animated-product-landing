import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./DesignInterior.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function DesignInterior() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    /* Ambient image parallax */
    gsap.to(imageRef.current, {
      y: -40,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    /* Soft text entrance */
    gsap.from(textRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.imageCol}>
          <div
            ref={imageRef}
            className={styles.image}
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1583573278124-e8d4fd3edf3c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
            }}
          />
        </div>

        <div ref={textRef} className={styles.textCol}>
          <span className={styles.label}>Design & Interior</span>
          <h2 className={styles.title}>Crafted for the driver</h2>
          <p className={styles.body}>
            Every surface, control, and interface inside Apex One is designed to
            reduce distraction and enhance focus. The interior balances modern
            technology with tactile materials and restrained lighting.
          </p>
        </div>
      </div>
    </section>
  );
}
