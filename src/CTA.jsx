import styles from "./CTA.module.css";

export default function CTA() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.label}>Experience Apex One</span>

        <h2 className={styles.title}>Designed to move you.</h2>

        <p className={styles.body}>
          Explore the full specifications or schedule a test drive to experience
          Apex One firsthand.
        </p>

        <button className={styles.button}>Request a test drive</button>
      </div>
    </section>
  );
}
