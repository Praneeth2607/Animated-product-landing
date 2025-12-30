import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./BrandStatement.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function BrandStatement() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const dividerRef = useRef(null);
  const bodyRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    /* Hybrid text animation */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        end: "top 30%",
        scrub: 0.6
      }
    });

    tl.from(headlineRef.current, {
      y: 80,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      immediateRender: false
    })
      .from(
        dividerRef.current,
        {
          scaleX: 0,
          duration: 0.4,
          transformOrigin: "left center",
          ease: "power2.out",
          immediateRender: false
        },
        "-=0.3"
      )
      .from(
        bodyRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          immediateRender: false

        },
        "-=0.25"
      );

    /* Ambient image parallax */
    gsap.to(imageRef.current, {
      y: -30,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
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
        {/* LEFT: Text */}
        <div className={styles.textCol}>
          <span className={styles.label}>Brand philosophy</span>

          <h2 ref={headlineRef} className={styles.headline}>
            Built for balance.
            <span className={styles.light}> Not noise.</span>
          </h2>

          <div ref={dividerRef} className={styles.divider} />

          <p ref={bodyRef} className={styles.body}>
            Apex One is engineered around restraint. Electric performance shaped
            for clarity, control, and everyday roads.
          </p>
        </div>

        {/* RIGHT: HQ image */}
        <div className={styles.imageCol}>
          <div
            ref={imageRef}
            className={styles.image}
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d)"
            }}
          />
        </div>
      </div>
    </section>
  );
}
