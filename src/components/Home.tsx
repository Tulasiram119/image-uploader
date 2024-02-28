import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app, db } from "../firebase";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/ContextProvider";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState("");
  const { user } = useContext(AppContext)!;
  const CLIENT_URL = "http://localhost:5173/pic/";
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }
  }, []);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    app;
    if (file) {
      const storageRef = getStorage();
      const fileRef = ref(storageRef, file.name);
      uploadBytes(fileRef, file)
        .then((snapshot) => {
          // Get the download URL for the uploaded file
          getDownloadURL(fileRef).then((downloadURL: string) => {
            setImageURL(CLIENT_URL + file.name);
            if (user) {
              const collectionName = "images";
              const documentData = {
                url: downloadURL,
                email: user.email,
                views: 0,
                name: file.name,
              };

              const collectionRef = collection(db, collectionName);

              const newDocumentRef = addDoc(collectionRef, documentData)
                .then(() => {
                  console.log("Image added to database");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          });
        })
        .catch((error: unknown) => {
          console.error("Error uploading file:", error);
        });

      setFile(null);
    }
  };
  const handleCopy = () => {
    const textToCopy = imageURL; // Replace this with the text you want to copy
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setImageURL("");
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
        // Optionally, you can show an error message or perform other actions here
      });
  };

  return (
    <div className="flex w-full h-screen items-center justify-center bg-grey-lighter flex-col">
      <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
        <svg
          className="w-8 h-8"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span className="mt-2 text-base leading-normal">Select a file</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      <button
        className="bg-blue-600 p-2 rounded-lg mt-3 text-white"
        onClick={handleSubmit}
      >
        Add images
      </button>
      {imageURL && (
        <button
          onClick={handleCopy}
          className="bg-green-400 p-2 rounded-md mt-3"
        >
          Click here to copy the link
        </button>
      )}
    </div>
  );
};

export default Home;
