export function weatherReducer(state, action) {
    switch (action.type) {
        case "IS_DAY":
            return {
                ...state,
                isDay: action.isDay,
            };
        case "SET_DATA":
            return {
                ...state,
                weather: action.weather,
                loading: false,
                time: action.weather.location.localtime,
                timezone: action.weather.location.tz_id,
            };
        case "HOUR_FORECAST":
            return {
                ...state,
                forecast_day_index: action.forecast_day_index,
            };

        case "LOADING":
            return {
                ...state,
                loading: true,
            };
    }
}
