import { configureStore } from "@reduxjs/toolkit";
import packageReducer from "./Slices/PackageSlice";
import categoryRedducer from "./Slices/CategorySlice";
import planReducer from "./Slices/PlanSlice";

const store = configureStore({
    reducer:{
        package:packageReducer,
        category:categoryRedducer,
        plan:planReducer,
    }
});

export default store;

