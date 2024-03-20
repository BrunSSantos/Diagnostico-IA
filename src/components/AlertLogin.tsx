import React from "react";
import { Alert, Button } from "@material-tailwind/react";


interface ListProps {
   
}

export const AlertLogin = (props: ListProps) =>{

    

    const [open, setOpen] = React.useState(true);

    return (
        <>
            
      <Alert
        open={open}
        onClose={() => setOpen(false)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        color="red"
      >
        Credenciais Inválidas
      </Alert>
        
        </>
    )
}