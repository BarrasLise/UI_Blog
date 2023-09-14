import { useParams } from "react-router-dom";
import EntityProvider from "../contexts/EntityContext";
import BlogDetails from "./BlogDetails";

const BlogDetailsView = () => {
    const {id} = useParams("");

    return ( 
        <>
        {/* entityID est un paramètre(=props) de l'entityProvider qui permet de récupérer l'id  */}
        <EntityProvider entityId={id} > 
            <BlogDetails />
        </EntityProvider></>
     );
}
 
export default BlogDetailsView;