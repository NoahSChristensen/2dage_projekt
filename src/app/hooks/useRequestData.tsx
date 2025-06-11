import axios from "axios"
import { useState } from "react"
import { Data } from "../types/type";

const useRequestData = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Data | undefined>(undefined);
    const [error, setError] = useState(false);
    // Request metoder der er tilladt:
    const allowedMethods = ["GET", "POST", "PATCH", "DELETE"];

    const makeRequest = async (url: string, method = "GET", body = null, params = {}, headers = {}) => {

        // Oversætter små bogstaver til store bogstaver:
        const methodUpper = method.toUpperCase(); // get bliver til GET, og pOsT bliver til POST

        try {
            if(!allowedMethods.includes(methodUpper)) {
                throw new Error ("Fejl - Ukendt request")
            };

            setLoading(true);
            setError(false);



            let response;

            const config = {
                method: methodUpper,
                url,
                params: params,
                headers: headers,
                ...(["POST", "PUT", "PATCH"].includes(methodUpper) && body ? { data: body } : {})
            };


            response = await axios(config);

            setData(response.data);
        }
        catch (err) {
            setError(true);
            console.log(err);
            throw err
        }

        finally {
            setLoading(false);
        }
    }

    return {makeRequest, loading, data, error};
}

export default useRequestData