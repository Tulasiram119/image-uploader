import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/ContextProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const ImageGrid = () => {
  const navigate = useNavigate();
  const { email, user } = useContext(AppContext)!;
  const [images, setImages] = useState([]);
  if (!user) {
    navigate("/signin");
  }
  const fecthImages = async () => {
    const imageRef = await getDocs(
      query(collection(db, "images"), where("email", "==", email))
    );
    console.log(imageRef);
    setImages(
      imageRef.docs.map((doc) => doc._document?.data?.value?.mapValue?.fields)
    );
  };
  useEffect(() => {
    fecthImages();
  }, []);
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3  py-96">
      {images.map((image) => (
        <li className="col-span-1 flex flex-col text-center bg-white">
          <Link to={`/pic/${image.name.stringValue}`}>
            <div className=" relative">
              <div className=" inset-0 w-full">
                <img
                  className="md:h-52 h-24 w-full"
                  src={image.url.stringValue}
                />
                <div className="flex flex-col flex-1 p-1 mx-auto">
                  <p className="text-sm font-normal tracking-normal text-gray-800 tk-brandon-grotesque bg-blue-500 p-2 rounded-md">
                    {"Views :" + image.views.integerValue}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ImageGrid;
