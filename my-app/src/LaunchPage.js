import {Stack, Button} from "@mui/material"

export const LaunchPage = () => {
    return (
        <Stack spacing={2} direction='column' justifyContent='center' alignitems='center'>
            <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>Launch Page</h1>
            <Button variant='outlined' href="/Cashier">Cashier</Button>
            <Button variant='outlined' href="/Customer">Customer</Button>
            <Button variant='outlined' href="/Manager">Manager</Button>
        </Stack >
    )
}