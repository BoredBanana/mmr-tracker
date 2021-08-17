export const locationReducer = (state, action) => {
    if(action.type === 'CHECK') {
        return state.map((location) => 
            location.LocationId === action.id
                ? {
                      ...location,
                      Checked: true
                  }
                : location
        );
    }
    else if(action.type === 'UNCHECK') {
        return state.map((location) => 
            location.LocationId === action.id
                ? {
                      ...location,
                      Checked: false
                  }
                : location
        );
    }
    else {
        console.log("how");
    }
}