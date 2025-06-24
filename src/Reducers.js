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
            };
        case "HOUR_FORECAST":
            return {
                ...state,
                today_forecast: true,
                forecast_day_index: action.forecast_day_index,
            };
        case "NO_HOURLY_FORECAST":
            return {
                ...state,
                today_forecast: false,
            };
        case "LOADING":
            return {
                ...state,
                loading: true,
            };
    }
}
