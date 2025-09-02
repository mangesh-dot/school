"use client";
import { useState, useEffect } from "react";
import styles from "./testAPI.module.css";

export default function TestAPI() {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const testEndpoints = async () => {
    setLoading(true);
    const endpoints = [
      { name: "Test API", url: "/api/test" },
      { name: "Cities API (no param)", url: "/api/cities" },
      { name: "Cities API (with state)", url: "/api/cities?state=bihar" },
      { name: "Schools API", url: "/api/schools" }
    ];

    const results = {};
    
    for (const endpoint of endpoints) {
      try {
        console.log(`Testing: ${endpoint.name}`);
        const response = await fetch(endpoint.url);
        const data = await response.json();
        results[endpoint.name] = {
          status: response.status,
          statusText: response.statusText,
          data: data,
          error: null
        };
      } catch (error) {
        results[endpoint.name] = {
          status: "Error",
          statusText: error.message,
          data: null,
          error: error.toString()
        };
      }
    }

    setResults(results);
    setLoading(false);
  };

  useEffect(() => {
    testEndpoints();
  }, []);

  return (
    <div className={styles.container}>
      <h1>API Test Page</h1>
      <button 
        onClick={testEndpoints} 
        disabled={loading}
        className={styles.button}
      >
        {loading ? "Testing..." : "Test All APIs"}
      </button>

      <div className={styles.results}>
        {Object.entries(results).map(([name, result]) => (
          <div key={name} className={styles.resultCard}>
            <h3>{name}</h3>
            <p className={result.status === 200 ? styles.success : styles.error}>
              Status: {result.status} {result.statusText}
            </p>
            {result.error ? (
              <p className={styles.error}>Error: {result.error}</p>
            ) : (
              <pre className={styles.data}>
                {JSON.stringify(result.data, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}