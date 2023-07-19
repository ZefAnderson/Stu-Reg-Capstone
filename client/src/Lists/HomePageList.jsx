import { useContext, useState } from "react";
import { RegistrationContext } from "../RegistrationContext";

export default function HomePageList () {
    const registration = useContext(RegistrationContext);
    return (
        <>
            <p>Sample Text</p>
        </>
    )
}