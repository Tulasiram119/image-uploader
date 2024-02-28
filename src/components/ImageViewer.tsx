import React, { useState, useEffect, useContext } from "react";

import "firebase/firestore";
import "firebase/storage";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { AppContext } from "../context/ContextProvider";

const ImageViewer: React.FC = () => {
  const [imageURL, setImageURL] = useState<string>("");
  const [viewCount, setViewCount] = useState<number>(0);
  const { imageName } = useParams();
  const { user } = useContext(AppContext)!;

  const fecthImageUrl = async () => {
    const imageRef = await getDocs(
      query(collection(db, "images"), where("name", "==", imageName))
    );
    // @ts-expect-error : _document is present on the object 
    const fields = imageRef?.docs[0]?._document.data.value?.mapValue?.fields;
    setImageURL(fields.url.stringValue);
    setViewCount(fields.views.integerValue);
    if (user?.email !== fields.email.stringValue || user === null) {
      await updateDoc(doc(db, "images", imageRef.docs[0].id), {
        views: (parseInt(fields.views.integerValue) + 1).toString(),
      });
    }
  };

  useEffect(() => {
    fecthImageUrl();
  }, []);

  return (
    <section className="relative flex justify-center items-center m-10">
      <div className="h-auto z-10">
        <img src={imageURL} alt="" className="object-fit-cover" />
        <h2 className="text-white bg-gray-500 p-5 mt-2 rounded-md">
          Views: {viewCount}
        </h2>
      </div>
    </section>
  );
};

export default ImageViewer;
