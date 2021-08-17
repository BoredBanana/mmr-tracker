export const locationReducer = (state, action) => {
    return state.map((location) => {
        if(location.LocationId === action.id) {
            switch(action.type) {
                case 'CHECK':
                    location.Checked = true;
                    break;
                case 'UNCHECK':
                    location.Checked = false;
                    break;
                default:
                    throw new Error('Action Type ' + action.type + ' does not exist in itemReducer');
            }
        }

        return location;
    });

}