import { useParams } from "react-router-dom";
import EntityProvider from "../contexts/EntityContext";
import BlogDetails from "./BlogDetails";
import PostProvider from "../contexts/PostContext";

const BlogDetailsView = () => {
    const {id} = useParams("");

    return ( 
        <>
        {/* entityID est un paramètre(=props) de l'entityProvider qui permet de récupérer l'id  */}
        <EntityProvider entityId={id} > 
            <PostProvider>
                <BlogDetails />
            </PostProvider>
        </EntityProvider></>
     );
}
 
export default BlogDetailsView;