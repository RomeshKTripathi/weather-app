import { useEffect, useReducer, useState } from "react";

import useFetchData, { useAutoUpdateLocation } from "./Hooks.js";
import Background from "./Background.jsx";
import { ErrorOccured } from "./Utilities.jsx";
import { weatherReducer } from "./Reducers.js";
import { Actions, Weather } from "./Context.js";
import MainPage from "./MainPage.jsx";

function App() {
    const { update } = useAutoUpdateLocation();
    const [store, dispatch] = useReducer(weatherReducer, {
        isDay: 0,
        loading: true,
        weather: null,
        today_forecast: true,
        forecast_day_index: 0,
        query: "new delhi",
    });
    const {
        data,
        loading: dataLoading,
        error,
        clearError,
    } = useFetchData("/forecast.json", {
        query: store.query,
        days: 5,
    });

    useEffect(() => {
        if (dataLoading == false && data != null) {
            dispatch({ type: "IS_DAY", isDay: data.current.is_day });
            dispatch({ type: "SET_DATA", weather: { ...data } });
        }
        return () => {
            dispatch({ type: "LOADING" });
        };
    }, [data]);

    useEffect(() => {
        update(dispatch);
    }, []);

    return store.loading ? null : (
        <Weather value={store}>
            <Actions value={dispatch}>
                <div className="relative w-screen h-dvh select-none overflow-x-hidden">
                    <Background />
                    <ErrorOccured
                        clearError={clearError}
                        message={error?.message}
                    />
                    <MainPage />
                </div>
            </Actions>
        </Weather>
    );
}

export default App;
