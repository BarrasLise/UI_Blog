import { FormHelperText, Typography, useFormControl } from "@mui/material";
import { useContext,    useMemo } from "react";
import { AuthContext } from "../contexts/AuthContext";

const MyFormHelperText = ({ fieldCode, charCount }) => {
    const {focused, filled } = useFormControl() || {};
    const { entity, info}=useContext(AuthContext);

    const validEmail = entity?.Email.match(/^\S+@\S+\.\S+$/) ? true : false;
    const passwordStrength = entity?.Password?.length > 10 ? true : false;
   
    
    const passwordMatch = entity?.Password === entity?.CheckPassword;
    // console.log("password : " + passwordMatch);

    const helperText = useMemo(() => {
       
        if (fieldCode === 'Email') {
          
          return (
            <Typography component={'span'}  variant="body2" color={validEmail ? "" : "error"}>
              {focused || info ===true ?  (
                <>
                  {filled ? 'complété' : 'vide'}&nbsp;|&nbsp;
                  {validEmail ? 'Email valide'  :  'Email non valide'}
                </>
              ) : null}
            </Typography>
          );

        } else if (fieldCode === 'Password') {

            return (

              <Typography component={'span'}  variant="body2" color={passwordStrength?  "" : "error"} >
              {focused || info ===true ?  (
                <>
                  {filled ? 'complété' : 'vide'}&nbsp;|&nbsp;
                  {passwordStrength ? "bon" : "faible" }
                </>
              ) :null}
            </Typography>

            );
          
        } else if (fieldCode === 'CheckPassword') {

            return (
                <Typography component={'span'}  variant="body2" color={!passwordMatch? "error" : ""}>
                  {focused || info ===true ?  (
                    <>
                      {filled ? 'complété' : 'vide'}&nbsp;|&nbsp;
                      {!passwordMatch ? "Les mots de passe ne correspondent pas" : "Les mots de passe correspondent"}
                    </>
                  ) : null}
                </Typography>
              );
          
        } 
        else if (fieldCode === 'Title') {

          return (
              <Typography component={'span'}  variant="body2" color={charCount >= 70 ? "error" : ""}>
                {focused  ?  (
                  <>
                    {charCount}/{70}
                  </>
                  ) : null} 
              </Typography>
            );
        
      } else {
          // Texte d'aide par défaut pour les autres champs
          return(
            <Typography component={'span'}  variant="body2">
          {focused || info ===true  ? (
            <>
              {filled ? 'complété' : 'vide'}
            </>
          ) : null}
        </Typography>
          )  
        } 
      }, [focused, filled, fieldCode, validEmail, info, passwordMatch, passwordStrength, charCount ]);

    return ( 
        <FormHelperText>{helperText}</FormHelperText>
     );
}
 
export default MyFormHelperText;