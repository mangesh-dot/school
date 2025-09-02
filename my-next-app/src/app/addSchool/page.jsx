// "use client";
// import { useForm } from "react-hook-form";
// import { useEffect, useState } from "react";
// import styles from "./addSchool.module.css";

// export default function AddSchool() {
//   const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();

//   const [stateSearch, setStateSearch] = useState("");
//   const [citySearch, setCitySearch] = useState("");
//   const [filteredStates, setFilteredStates] = useState([]);
//   const [filteredCities, setFilteredCities] = useState([]);
  
//   const selectedState = watch("state");

//   // // Fetch all states on component mount
//   // useEffect(() => {
//   //   fetch("/api/cities")
//   //     .then(res => res.json())
//   //     .then(data => {
//   //       setAllStates(data);
//   //       setFilteredStates(data);
//   //     })
//   //     .catch(err => console.error("Error fetching states:", err));
//   // }, []);

//   // // Fetch cities when state is selected
//   // useEffect(() => {
//   //   if (selectedState) {
//   //     fetch(`/api/cities?state=${selectedState}`)
//   //       .then(res => res.json())
//   //       .then(data => {
//   //         setAllCities(data);
//   //         setFilteredCities(data);
//   //       })
//   //       .catch(err => console.error("Error fetching cities:", err));
//   //   } else {
//   //     setAllCities([]);
//   //     setFilteredCities([]);
//   //   }
//   // }, [selectedState]);

//   // Filter states based on search input
//   useEffect(() => {
//     if (stateSearch) {
//       const filtered = allStates.filter(state =>
//         state.toLowerCase().includes(stateSearch.toLowerCase())
//       );
//       setFilteredStates(filtered);
//     } else {
//       setFilteredStates(allStates);
//     }
//   }, [stateSearch, allStates]);

//   // Filter cities based on search input
//   useEffect(() => {
//     if (citySearch) {
//       const filtered = allCities.filter(city =>
//         city.toLowerCase().includes(citySearch.toLowerCase())
//       );
//       setFilteredCities(filtered);
//     } else {
//       setFilteredCities(allCities);
//     }
//   }, [citySearch, allCities]);



//     // Track touched fields for better validation UX

//     const [touchedFields, setTouchedFields] = useState({});

//     const handleInputBlur = (fieldName) => {
//       setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
//     };

//     // Add onBlur to each input
//     onBlur={() => handleInputBlur("contact")}

//     // Show validation only after field is touched
//     {errors.contact && touchedFields.contact && (
//       <span className={styles.error}>{errors.contact.message}</span>
//     )}

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => {
//         if (key === "image" && data.image[0]) {
//           formData.append(key, data.image[0]);
//         } else {
//           formData.append(key, data[key]);
//         }
//       });

//       const response = await fetch("/api/schools", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         alert("School added successfully!");
//         // Reset form
//         setStateSearch("");
//         setCitySearch("");
//         setValue("state", "");
//         setValue("city", "");
//         setValue("name", "");
//         setValue("address", "");
//         setValue("contact", "");
//         setValue("email_id", "");
//         setValue("image", "");
//       } else {
//         alert("Error adding school");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Error adding school");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Add School</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className={styles.form} encType="multipart/form-data">

// <input 
//   {...register("name", { 
//     required: "School name is required",
//     minLength: {
//       value: 3,
//       message: "School name must be at least 3 characters"
//     },
//     maxLength: {
//       value: 100,
//       message: "School name must be less than 100 characters"
//     },
//     pattern: {
//       value: /^[a-zA-Z0-9\s\-&.,()]+$/,
//       message: "School name contains invalid characters"
//     }
//   })} 
//   placeholder="School Name" 
//   className={styles.input} 
// />
// {errors.name && <span className={styles.error}>{errors.name.message}</span>}

// <input 
//   {...register("address", { 
//     required: "Address is required",
//     minLength: {
//       value: 5,
//       message: "Address must be at least 5 characters"
//     },
//     maxLength: {
//       value: 200,
//       message: "Address must be less than 200 characters"
//     }
//   })} 
//   placeholder="Full Address" 
//   className={styles.input} 
// />
// {errors.address && <span className={styles.error}>{errors.address.message}</span>}

//         {/* State Autocomplete */}
//         <div className={styles.autocompleteContainer}>
//           <input
//             {...register("state", { required: true })}
//             placeholder="Search State"
//             className={styles.input}
//             value={stateSearch}
//             onChange={(e) => {
//               setStateSearch(e.target.value);
//               setValue("state", e.target.value);
//             }}
//             list="states"
//           />
//           <datalist id="states">
//             {filteredStates.map(state => (
//               <option key={state} value={state} />
//             ))}
//           </datalist>
//           {errors.state && <span className={styles.error}>State is required</span>}
//         </div>

//         {/* City Autocomplete */}
//         <div className={styles.autocompleteContainer}>
//           <input
//             {...register("city", { required: true })}
//             placeholder="Search City"
//             className={styles.input}
//             value={citySearch}
//             onChange={(e) => {
//               setCitySearch(e.target.value);
//               setValue("city", e.target.value);
//             }}
//             list="cities"
//             disabled={!selectedState}
//           />
//           <datalist id="cities">
//             {filteredCities.map(city => (
//               <option key={city} value={city} />
//             ))}
//           </datalist>
//           {errors.city && <span className={styles.error}>City is required</span>}
//           {!selectedState && (
//             <span className={styles.hint}>Please select a state first</span>
//           )}
//         </div>

//        <input 
//   type="tel" 
//   {...register("contact", { 
//     required: "Contact number is required",
//     pattern: {
//       value: /^[0-9]{10}$/,
//       message: "Please enter a valid 10-digit phone number"
//     },
//     minLength: {
//       value: 10,
//       message: "Phone number must be 10 digits"
//     },
//     maxLength: {
//       value: 10,
//       message: "Phone number must be 10 digits"
//     }
//   })} 
//   placeholder="Contact Number (10 digits)" 
//   className={styles.input} 
//   onInput={(e) => {
//     // Allow only numbers
//     e.target.value = e.target.value.replace(/[^0-9]/g, '');
//     // Limit to 10 digits
//     if (e.target.value.length > 10) {
//       e.target.value = e.target.value.slice(0, 10);
//     }
//   }}
// />
// {errors.contact && <span className={styles.error}>{errors.contact.message}</span>}

// <input 
//   type="email" 
//   {...register("email_id", { 
//     required: "Email is required",
//     pattern: {
//       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//       message: "Please enter a valid email address"
//     }
//   })} 
//   placeholder="Email address" 
//   className={styles.input} 
// />
// {errors.email_id && <span className={styles.error}>{errors.email_id.message}</span>}

// <input 
//   type="file" 
//   {...register("image", { 
//     required: "School image is required",
//     validate: {
//       checkFileType: (value) => {
//         if (value && value[0]) {
//           const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
//           return allowedTypes.includes(value[0].type) || "Only JPEG, PNG, GIF, and WebP images are allowed";
//         }
//         return true;
//       },
//       checkFileSize: (value) => {
//         if (value && value[0]) {
//           return value[0].size <= 5 * 1024 * 1024 || "File size must be less than 5MB";
//         }
//         return true;
//       }
//     }
//   })} 
//   className={styles.input} 
//   accept=".jpg,.jpeg,.png,.gif,.webp"
// />
// {errors.image && <span className={styles.error}>{errors.image.message}</span>}

//         <button type="submit" className={styles.button}>Submit</button>
//       </form>
//     </div>
//   );
// }


"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import styles from "./addSchool.module.css";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const [touchedFields, setTouchedFields] = useState({});
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [stateSearch, setStateSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  
  const selectedState = watch("state");
  const imageFile = watch("image");

  const handleInputBlur = (fieldName) => {
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
  };


  // Fetch all states on component mount
  useEffect(() => {
    fetch("/api/cities")
      .then(res => res.json())
      .then(data => {
        setAllStates(data);
        setFilteredStates(data);
      })
      .catch(err => console.error("Error fetching states:", err));
  }, []);

  // Fetch cities when state is selected
  useEffect(() => { 
    if (selectedState) {
      fetch(`/api/cities?state=${selectedState}`)
        .then(res => res.json())
        .then(data => {
          setAllCities(data);
          setFilteredCities(data);
        })
        .catch(err => console.error("Error fetching cities:", err));
    } else {      
      setAllCities([]);
      setFilteredCities([]);
    }
  }, [selectedState]);



   // Filter states based on search input
  useEffect(() => {
    if (stateSearch) {
      const filtered = allStates.filter(state =>
        state.toLowerCase().includes(stateSearch.toLowerCase())
      );
      setFilteredStates(filtered);
    } else {
      setFilteredStates(allStates);
    }
  }, [stateSearch, allStates]);

  // Filter cities based on search input
  useEffect(() => {
    if (citySearch) {
      const filtered = allCities.filter(city =>
        city.toLowerCase().includes(citySearch.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities(allCities);
    }
  }, [citySearch, allCities]);




  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key === "image" && data.image[0]) {
          formData.append(key, data.image[0]);
        } else {
          formData.append(key, data[key]);
        }
      });

      const response = await fetch("/api/schools", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("School added successfully!");
        // Reset form
        setStateSearch("");
        setCitySearch("");
        setValue("state", "");
        setValue("city", "");
        setValue("name", "");
        setValue("address", "");
        setValue("contact", "");
        setValue("email_id", "");
        setValue("image", "");
      } else {
        alert("Error adding school");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error adding school");
    }
  };

  // ... rest of your existing code for states and cities ...

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add School</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} encType="multipart/form-data">

        <input 
          {...register("name", { 
            required: "School name is required",
            minLength: { value: 3, message: "Must be at least 3 characters" },
            maxLength: { value: 100, message: "Must be less than 100 characters" }
          })} 
          placeholder="School Name" 
          className={styles.input}
          onBlur={() => handleInputBlur("name")}
        />
        {errors.name && touchedFields.name && (
          <span className={styles.error}>{errors.name.message}</span>
        )}

        <input 
          {...register("address", { 
            required: "Address is required",
            minLength: { value: 5, message: "Must be at least 5 characters" }
          })} 
          placeholder="Full Address" 
          className={styles.input}
          onBlur={() => handleInputBlur("address")}
        />
        {errors.address && touchedFields.address && (
          <span className={styles.error}>{errors.address.message}</span>
        )}

        {/* State and City fields... */}

                {/* State Autocomplete */}
        <div className={styles.autocompleteContainer}>
          <input
            {...register("state", { required: true })}
            placeholder="Search State"
            className={styles.input}
            value={stateSearch}
            onChange={(e) => {
              setStateSearch(e.target.value);
              setValue("state", e.target.value);
            }}
            list="states"
          />
          <datalist id="states">
            {filteredStates.map(state => (
              <option key={state} value={state} />
            ))}
          </datalist>
          {errors.state && <span className={styles.error}>State is required</span>}
        </div>

        {/* City Autocomplete */}
        <div className={styles.autocompleteContainer}>
          <input
            {...register("city", { required: true })}
            placeholder="Search City"
            className={styles.input}
            value={citySearch}
            onChange={(e) => {
              setCitySearch(e.target.value);
              setValue("city", e.target.value);
            }}
            list="cities"
            disabled={!selectedState}
          />
          <datalist id="cities">
            {filteredCities.map(city => (
              <option key={city} value={city} />
            ))}
          </datalist>
          {errors.city && <span className={styles.error}>City is required</span>}
          {!selectedState && (
            <span className={styles.hint}> Please select a state first </span>
          )}
        </div>

        <input 
          type="tel" 
          {...register("contact", { 
            required: "Contact number is required",
            pattern: { value: /^[0-9]{10}$/, message: "Must be 10 digits" }
          })} 
          placeholder="Contact Number (10 digits)" 
          className={styles.input}
          onBlur={() => handleInputBlur("contact")}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
            if (e.target.value.length > 10) {
              e.target.value = e.target.value.slice(0, 10);
            }
          }}
        />
        {errors.contact && touchedFields.contact && (
          <span className={styles.error}>{errors.contact.message}</span>
        )}

        <input 
          type="email" 
          {...register("email_id", { 
            required: "Email is required",
            pattern: { 
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
              message: "Invalid email format" 
            }
          })} 
          placeholder="Email address" 
          className={styles.input}
          onBlur={() => handleInputBlur("email_id")}
        />
        {errors.email_id && touchedFields.email_id && (
          <span className={styles.error}>{errors.email_id.message}</span>
        )}

        <div>
          <input 
            type="file" 
            {...register("image", { 
              required: "School image is required",
              validate: {
                checkType: (v) => 
                  !v[0] || ['image/jpeg', 'image/png', 'image/gif'].includes(v[0].type) 
                  || "Only images allowed",
                checkSize: (v) => 
                  !v[0] || v[0].size <= 5 * 1024 * 1024 
                  || "File must be less than 5MB"
              }
            })} 
            className={styles.input}
            accept=".jpg,.jpeg,.png,.gif"
            onBlur={() => handleInputBlur("image")}
          />
          {errors.image && touchedFields.image && (
            <span className={styles.error}>{errors.image.message}</span>
          )}
          {imageFile && imageFile[0] && !errors.image && (
            <span className={styles.success}>✓ File selected: {imageFile[0].name}</span>
          )}
          <div className={styles.fileInputInfo}>
            Supported formats: JPG, PNG, GIF | Max size: 5MB
          </div>
        </div>

        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
}