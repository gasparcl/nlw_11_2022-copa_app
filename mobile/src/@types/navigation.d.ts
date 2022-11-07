// the routes that don't receive params, can be declared as undefined:
export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            new: undefined
            polls: undefined
            findPolls: undefined
            details: {
                id: string
            }
        }
    }
}
