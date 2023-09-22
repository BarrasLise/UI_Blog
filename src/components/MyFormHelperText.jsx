import { FormHelperText, useFormControl } from "@mui/material";
import { useMemo } from "react";

const MyFormHelperText = ({}) => {
    const {focused, filled} = useFormControl() || {};
    // console.log(focused);

    const helperText = useMemo(()=> {
        
        return <p>
            {filled ? 'complété': "vide"}&nbsp;|&nbsp;
            {focused ? "champs actif" : "champ inactif"}
        
        </p>

    }, [focused,  filled])


    return ( 
        <FormHelperText>{helperText}</FormHelperText>
     );
}
 
export default MyFormHelperText;