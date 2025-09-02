// "use client";
// import { useEffect, useState } from "react";
// import styles from "./showSchools.module.css";

// export default function ShowSchools() {
//   const [schools, setSchools] = useState([]);

//   useEffect(() => {
//     fetch("/api/schools")
//       .then((res) => res.json())
//       .then((data) => setSchools(data));
//   }, []);

//   // Function to get correct image path
//   const getImagePath = (imagePath) => {
//     if (!imagePath) return "/default-school.jpg"; // fallback image
//     if (imagePath.startsWith("http")) return imagePath; // external URLs
//     return imagePath; // local paths
//   };

//   return (


//     <div className={styles.schoolsContainer}>
//       {schools.length === 0 ? (
//         <div className={styles.emptyState}>
//           <p>No schools found. Add some schools to get started!</p>
//         </div>
//       ) : (
//         schools.map((school) => (
//           <article key={school.id} className={styles.schoolCard}>
//             <div className={styles.schoolImageContainer}>
//               <img 
//                 src={getImagePath(school.image)} 
//                 alt={school.name} 
//                 className={styles.schoolImage}
//                 onError={(e) => {
//                   e.target.src = "/default-school.jpg"; // fallback on error
//                 }}
//               />
//             </div>
            
//             <div className={styles.schoolContent}>
//               <h2 className={styles.schoolName}>{school.name}</h2>
//               <p className={styles.schoolAddress}>{school.address}</p>
//               <p className={styles.schoolCity}>{school.city}, {school.state}</p>
              
//               <button className={styles.schoolDetailsBtn}>
//                 View Details
//                 <span className={styles.hoverEffect}></span>
//               </button>
//             </div>
//           </article>
//         ))
//       )}
//     </div>
//   );
// }


















"use client";
import { useEffect, useState } from "react";
import { Search,Plus } from "lucide-react";
import Link from "next/link";

import styles from "./showSchools.module.css";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Component rendering...");
  console.log("Schools data:", schools);
  console.log("Filtered schools:", filteredSchools);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching schools from API...");
      
      const response = await fetch("/api/schools");
      console.log("API response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("API data received:", data);
      
      setSchools(data);
      setFilteredSchools(data);
      
    } catch (error) {
      console.error("Error fetching schools:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Filtering schools with search term:", searchTerm);
    
    if (!searchTerm.trim()) {
      setFilteredSchools(schools);
      return;
    }

    const filtered = schools.filter(school =>
      school.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.state?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log("Filtered results:", filtered);
    setFilteredSchools(filtered);
  }, [searchTerm, schools]);

  const getImagePath = (imagePath) => {
    if (!imagePath) return "/default-school.jpg";
    if (imagePath.startsWith("http")) return imagePath;
    // Ensure local paths start with /
    return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading schools...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h3>Error Loading Schools</h3>
        <p>{error}</p>
        <button onClick={fetchSchools} className={styles.retryBtn}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Search Header */}
      <div className={styles.searchHeader}>
        <h1 className={styles.pageTitle}></h1>
        
        <div className={styles.searchBox}>
          <div className={styles.searchInputContainer}>
        <span className={styles.searchIcon}>
          <Search size={22} />
        </span>
            <input
              type="text"
              placeholder="Search schools by name, address, city, or state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className={styles.clearButton}
              >
                ✕
              </button>
            )}
          </div>
        </div>

  </div>

      {/* Schools Grid */}
      <div className={styles.schoolsContainer}>
        {filteredSchools.length === 0 && schools.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No schools found. Add some schools to get started!</p>
          </div>
        ) : (
          filteredSchools.map((school) => (
            <article key={school.id || school.school_id} className={styles.schoolCard}>
              <div className={styles.schoolImageContainer}>
                <img 
                  src={getImagePath(school.image)} 
                  alt={school.name} 
                  className={styles.schoolImage}
                  onError={(e) => {
                    console.log("Image failed to load:", school.image);
                    e.target.src = "/default-school.jpg";
                  }}
                />
              </div>
              
              <div className={styles.schoolContent}>
                <h2 className={styles.schoolName}>{school.name || "Unnamed School"}</h2>
                <p className={styles.schoolAddress}>{school.address || "No address"}</p>
                <p className={styles.schoolCity}>{school.city || "Unknown"}, {school.state || "Unknown"}</p>
                
                <button className={styles.schoolDetailsBtn}>
                  View Details
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

