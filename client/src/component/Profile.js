import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react"
import { useSelector } from 'react-redux'
const Profile = () => {

    const Auth = useSelector(state => state.auth)
    const { user } = Auth
    return (
        <Table className='max-w-[600px] m-4' hideHeader aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>ROLE</TableColumn>
            </TableHeader>
            <TableBody>
                <TableRow key="1">
                    <TableCell>Username</TableCell>
                    <TableCell>{user.name}</TableCell>
                </TableRow>
                <TableRow key="2">
                    <TableCell>Email</TableCell>
                    <TableCell>{user.email}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default Profile