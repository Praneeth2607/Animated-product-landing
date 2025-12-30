import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Performance.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Performance() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const stats = statsRef.current.filter(Boolean);

    /* Phase 1: visible entry */
    const introTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });

    introTl
      .from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out"
      })
      .from(
        textRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 1.0,
          ease: "power2.out"
        },
        "-=0.3"
      )
      .from(
        stats,
        {
          y: 40,
          opacity: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: "power2.out"
        },
        "-=0.2"
      );

    /* Phase 2: subtle scroll separation */
    gsap.to(stats, {
      y: -20,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top 0%",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
  <div className={styles.left}>
    <h2 ref={headingRef} className={styles.title}>
      Performance, refined
    </h2>

    <p ref={textRef} className={styles.description}>
      Apex One delivers instant electric torque without sacrificing balance,
      comfort, or everyday usability.
    </p>
  </div>

  <div className={styles.right}>
    {[
      { value: "3.2s", label: "0–100 km/h" },
      { value: "AWD", label: "Dual motor" },
      { value: "520 km", label: "Range" },
      { value: "0 g CO₂", label: "Emissions" }
    ].map((item, i) => (
      <div
        key={i}
        ref={(el) => (statsRef.current[i] = el)}
        className={styles.stat}
      >
        <div className={styles.statValue}>{item.value}</div>
        <div className={styles.statLabel}>{item.label}</div>
      </div>
    ))}
  </div>
</div>
    </section>
  );
}
