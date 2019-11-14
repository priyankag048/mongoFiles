export const image = (state="",action)=>{
    if(action.type === '@user/saga_action/image'){
        state = action.picture
    }
    return state;
}

export const attachments = (state=[],action)=>{
    if(action.type === '@user/saga_action/attachments'){
        state = action.attachments
    }
    return state;
}