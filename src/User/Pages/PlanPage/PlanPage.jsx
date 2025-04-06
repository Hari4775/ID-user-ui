import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlan } from "../../../api/DayPlan/DayPlanApi";
import PlanCard from "./PlanSection/PlanCard";
import { FaArrowLeft } from "react-icons/fa";
import { getCategory } from "../../../api/Category/Category";

const PlanPage = () => {
  const { category_id } = useParams();
  const [planData, setPlanData] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Modal state
  const [selectedCategory, setSelectedCategory] = useState([]);
  const basePrice = selectedCategory?.categoryDiscountedPrice || 0;
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(basePrice);
  const [totalAmount, setTotalAmount] = useState(basePrice);
  const [savingsPerPerson, setSavingsPerPerson] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let pricePerAdult = basePrice;
    let savings = 0;

    const totalCount = adultCount;
    if (totalCount >= 4 && totalCount < 6) {
      savings = 1000;
      pricePerAdult = basePrice - savings;
    } else if (totalCount >= 6 && totalCount < 8) {
      savings = 2000;
      pricePerAdult = basePrice - savings;
    } else if (totalCount >= 8 && totalCount < 12) {
      savings = 3000;
      pricePerAdult = basePrice - savings;
    } else if (totalCount >= 12) {
      savings = 5000;
      pricePerAdult = basePrice - savings;
    }
    const pricePerChild = pricePerAdult / 2;

    setSavingsPerPerson(savings);
    setDiscountedPrice(pricePerAdult);
    const total = adultCount * pricePerAdult + childCount * pricePerChild;
    setTotalAmount(total);
  }, [adultCount, childCount, basePrice]);

  const increase = (type) =>
    type === "adult"
      ? setAdultCount((prev) => prev + 1)
      : setChildCount((prev) => prev + 1);

  const decrease = (type) =>
    type === "adult"
      ? setAdultCount((prev) => (prev > 1 ? prev - 1 : 1))
      : setChildCount((prev) => (prev > 0 ? prev - 1 : 0));

  const handleCardClick = () => {
    // your payment logic here
    navigate("/contact-us");
  };

  const fetchDayPlan = async () => {
    try {
      if (category_id) {
        const response = await getPlan(category_id);
        if (response?.data) {
          // Ensure planData is an array
          setPlanData(
            Array.isArray(response.data) ? response.data : [response.data]
          );
        }
      }
    } catch (err) {
      console.log(err, "error getting the planData");
    }
  };
 

  
  const fetchCategory = async () => {
    try {
      if (category_id) {
        const response = await  getCategory(category_id);
        if (response?.data) {
          // Ensure planData is an array
          setSelectedCategory(response?.data);
        }
      }
    } catch (err) {
      console.log(err, "error getting the category Data");
    }
  };

  useEffect(()=>{
  fetchCategory();
  },[category_id]);

  useEffect(() => {
    fetchDayPlan();
  }, [category_id]);

  return (
    <div>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center  w-full h-screen "
        onAnimationEnd={(e) => {
          if (!isOpen) e.target.classList.add("animate-fade-out");
        }}
      >
        <div
          className="rounded-lg w-full pt-24 lg:px-2   animate-slide-in  h-screen relative"
          style={{
            background:
              "linear-gradient(to bottom, #e0f7ff, #b3eaff, #66c2ff, #338fcc, #004080)",
          }}
        >
        <div className="flex items-center lg:m-3">
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 text-blue-950 font-semibold text-sm lg:text-base bg-blue-100 hover:bg-blue-200 border border-blue-300 px-3 py-1 rounded-full transition-all duration-200 shadow-sm ml-3 lg:ml-0"
        >
          <FaArrowLeft className="text-blue-800 text-2xl font-extrabold " />
          
        </button>
       </div>
          <div className="flex  h-full">
            <div className=" lg:w-9/12 md:w-11/12  md:mx-auto w-full lg:mr-2  ">
              {/* <div className="left-inner-heading-container w-full  "> */}
                {planData.length > 0 && (
                  <div className="w-full  mx-auto lg:h-[480px]  h-4/6 ">
                    {planData.map((plan) => (
                      <PlanCard
                        key={plan.plan_id || plan._id}
                        planData={plan.plans}
                      />
                    ))}
                  </div>
                )}

                 {/* mobile payment section */}
                 <div className="w-full mx-auto block lg:hidden rounded-lg my-2">
  <div className="payment-section image-container text-white rounded-xl p-3 shadow-lg flex flex-col">

    {/* Fixed-height Scrollable Yellow Section */}
    <div className="rounded-md p-2 h-[65px] overflow-y-auto">

      {/* Adults Section */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <p className="text-[11px] font-medium mb-1">Adults</p>
          <div className="flex items-center bg-white text-black rounded-md overflow-hidden shadow">
            <button
              className="px-3 py-1 text-sm font-bold bg-gray-100 hover:bg-gray-300 transition rounded-l"
              onClick={() => decrease("adult")}
            >
              −
            </button>
            <span className="px-4 py-1 text-[11px]">{adultCount} Adults</span>
            <button
              className="px-3 py-1 text-sm font-bold bg-gray-100 hover:bg-gray-300 transition rounded-r"
              onClick={() => increase("adult")}
            >
              +
            </button>
          </div>
          {savingsPerPerson > 0 && (
            <p className="text-[10px] mt-1 text-green-700">
              Save ₹{savingsPerPerson}/adult
            </p>
          )}
        </div>
        <div className="text-right w-1/2">
          {savingsPerPerson > 0 && (
            <p className="line-through text-red-600 text-[11px]">
              ₹{basePrice}
            </p>
          )}
          <p className="text-green-400 font-semibold text-sm mt-1">
            ₹{discountedPrice} <span className="text-[10px]">/Adult</span>
          </p>
        </div>
      </div>

      {/* Children Section */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-[11px] font-medium mb-1">Children</p>
          <div className="flex items-center bg-white text-black rounded-md overflow-hidden shadow">
            <button
              className="px-3 py-1 text-sm font-bold bg-gray-100 hover:bg-gray-300 transition rounded-l"
              onClick={() => decrease("child")}
            >
              −
            </button>
            <span className="px-4 py-1 text-[11px]">{childCount} Children</span>
            <button
              className="px-3 py-1 text-sm font-bold bg-gray-100 hover:bg-gray-300 transition rounded-r"
              onClick={() => increase("child")}
            >
              +
            </button>
          </div>
        </div>
        <p className="text-[11px] text-green-400 mt-4 text-right w-1/2">
          ₹{discountedPrice / 2} / Child
        </p>
      </div>
    </div>

    {/* Sticky Footer */}
    <div className="px-3 shadow-inner pb-2 flex justify-between items-center mt-2">
      <div className="my-1">
        {savingsPerPerson > 0 && adultCount > 0 && (
          <p className="text-[10px] text-green-200 mb-1">
            Total Savings: ₹{savingsPerPerson * adultCount}
          </p>
        )}
        <p className="text-white text-base font-extrabold drop-shadow-md tracking-wide">
  Total: ₹{totalAmount}
</p>

      </div>

      <button
        className="bg-yellow-400 hover:bg-yellow-300 text-black text-sm font-bold py-2 px-4 rounded-xl shadow-md ml-auto"
        onClick={handleCardClick}
      >
        PAY NOW
      </button>
    </div>

  </div>
</div>



              {/* </div> */}
            </div>

            <div className="left-inner-container w-3/12 mr-auto hidden lg:block mb-20">
              <div className="payment-section  shadow-inner image-container p-5 rounded-2xl text-white">
                {/* Adult Section */}
                <div className="text-center mb-1">
                  <p className="text-xl font-bold text-green-700">
                    ₹{" "}
                    {savingsPerPerson > 0 && (
                      <span className="line-through text-red-800 mr-2">
                        {basePrice}
                      </span>
                    )}
                    {discountedPrice}
                    <span className="text-lg font-light ml-1">/Adult</span>
                  </p>
                  {savingsPerPerson > 0 && (
                    <p className="text-sm text-green-200 ">
                      You save ₹{savingsPerPerson} per adult!
                    </p>
                  )}
                </div>

                {/* Adult Count Control */}
                <div className="mb-3">
                  {/* <h2 className='text-lg font-semibold mb-1'>Adults</h2> */}
                  <div className="flex items-center justify-center gap-2">
                    <button
                      className="bg-white text-black font-bold px-3 py-1 rounded-l hover:bg-gray-200"
                      onClick={() => decrease("adult")}
                    >
                      –
                    </button>
                    <span className="px-5 py-1 bg-white text-black font-semibold rounded">
                      {adultCount} Adults
                    </span>
                    <button
                      className="bg-white text-black font-bold px-3 py-1 rounded-r hover:bg-gray-200"
                      onClick={() => increase("adult")}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Child Section */}
                <div className="mb-3 mt-5">
                  {/* <h2 className='text-lg font-semibold mb-1'>Children</h2> */}
                  <p className="text-sm text-gray-100 mb-1">
                    ₹ {discountedPrice / 2} / Child (50% of adult fare)
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      className="bg-white text-black font-bold px-3 py-1 rounded-l hover:bg-gray-200"
                      onClick={() => decrease("child")}
                    >
                      –
                    </button>
                    <span className="px-5 py-1 bg-white text-black font-semibold rounded">
                      {childCount} Children
                    </span>
                    <button
                      className="bg-white text-black font-bold px-3 py-1 rounded-r hover:bg-gray-200"
                      onClick={() => increase("child")}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Discount Info */}
                <div className="text-xs  text-black rounded px-3 py-2 mt-4 mx-3 text-center">
                  <p className="mb-1 font-medium">Discount Info:</p>

                  {/* <div className='flex'>

           <img className='w-5 h-5 border-green-800 ' src={ticIcon}/>
           <p>4–6 adults: Save ₹1000 per adult</p>
          </div> */}
                  <ul className="list-disc list-inside text-left text-xs">
                    <li>4–6 adults: Save ₹1000 per adult</li>
                    <li>6–8 adults: Save ₹2000 per adult</li>
                    <li>8–12 adults: Save ₹3000 per adult</li>
                    <li>12+ adults: Save ₹5000 per adult</li>
                    {/* <li>Children: Always 50% of adult fare</li> */}
                  </ul>
                </div>

                {/* Total Calculation */}
                <div className="text-center mb-2 mt-4">
                  {/* <p className='text-md'>Excluding applicable taxes</p> */}
                  <p className="text-lg font-semibold mt-1">
                    Total: ₹ {totalAmount}
                  </p>
                  {savingsPerPerson > 0 && adultCount > 0 && (
                    <p className="text-sm text-green-100">
                      Total Adult Savings: ₹ {savingsPerPerson * adultCount}
                    </p>
                  )}
                </div>

                {/* Proceed Button */}
                <div className=" ">
                  <button
                    className="no-button mx-3 mt-3 w-11/12 bg-yellow-300 text-black font-bold py-2 rounded-xl"
                    onClick={handleCardClick}
                  >
                    PROCEED TO PAYMENT
                  </button>
                </div>
              </div>
            </div>

            {/* test */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
