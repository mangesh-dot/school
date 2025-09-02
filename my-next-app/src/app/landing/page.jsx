"use client";
import Link from "next/link";
import styles from "./landing.module.css";

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <Link href="/">Home</Link>
        <Link href="/addSchool">Add School</Link>
        <Link href="/showSchools">View Schools</Link>
        <Link href="/test-api">Test API</Link>
      </nav>

      <main className={styles.content}>
        <h2>Welcome to School Management System</h2>
        <p>Select a section above to continue.</p>
      </main>
    </div>
  );
}
