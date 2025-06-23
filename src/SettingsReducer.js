export function settingsReducer(state, action) {
    switch (action.type) {
        case "IS_DAY":
            return {
                ...state,
                isDay: action.isDay,
            };
    }
}
