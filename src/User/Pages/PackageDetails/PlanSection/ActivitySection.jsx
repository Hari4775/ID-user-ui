import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
const ActivitiesSection = ({ activities, isEditing, updateActivities }) => {
  const [activity_images, setActivityImages] = useState([]);
  console.log(activity_images, "activity_images");


  useEffect(() => {
    if (activities?.activity_images) {
      setActivityImages(activities.activity_images);
    }
  }, [activities]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [
        ...activities.activity_images,
        URL.createObjectURL(file),
      ];
      updateActivities(activities.activity_id, {
        activity_images: updatedImages,
      });
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = activities.activity_images.filter(
      (_, i) => i !== index
    );
    updateActivities(activities.activity_id, {
      activity_images: updatedImages,
    });
  };

  // activities?.activity_images.map((img, index) => (

  //   setActivityImages(img)
  // ))

  return (
    <div className="my-4 lg:my-12 w-10/12 mx-auto">
      <div>
          <h1 className="font-bold text-sm lg:text-xl ">{activities?.activity_name}</h1>    
      </div>

      <div className="lg:h-48 h-32 my-2 flex overflow-x-auto custom-scrollbar space-x-4">
          {activity_images.map((img, index) => (
            <div key={index} className="relative min-w-[200px] lg:min-w-[300px]">
              <img  className="h-full w-full object-cover rounded-lg border-2 border-white"  src={img.image} alt={`Hotel Image ${index + 1}`}  />
           </div>
          ))}
      </div>
      <p className="mb-2  text-[7px] lg:text-xs text-left">{activities?.activity_description}</p>
    </div>
  );
};

export default ActivitiesSection;
