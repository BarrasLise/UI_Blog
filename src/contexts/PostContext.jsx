import { createContext, useContext } from "react";
import { EntityContext } from "./EntityContext";

export const PostContext = createContext({});

const PostProvider = ({children}) => {
    const {entityId, baseURL} = useContext(EntityContext);
    // console.log(entityId);
    // console.log("coucou");
    
    const savePost = () => {  
        console.log("test savePost de PostsContext : " + entityId + " et baseURL : " + baseURL);    
    }

    const value = {
        savePost
    }

    return ( 
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>

    );
}
 
export default PostProvider;