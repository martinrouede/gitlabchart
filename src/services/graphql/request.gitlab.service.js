/*
curl "https://git.fi.mdn.unp.edu.ar/api/graphql" --header "Authorization: Bearer VHtQTLxfARnHo48yhTaE" --header "Content-Type: application/json" --request POST --data "{\"query\": \"query {currentUser{publicEmail}}\"}"
*/
import axios from 'axios';

const fetchAllIssues = async (user) => {
    try {
        let response = await axios.post(user.url + 'api/graphql/?access_token=' + user.token, {
            query: `query{
                project(fullPath: "covid-19/unpsjb/cuidAR-unpsjb") {
                    issues {
                        nodes {
                          title
                        }
                      }
                    }
            }`
        });
        return response.data;
    } catch (error) {
        if (error.response)
            throw new Error(error.response.data.message);
        else
            throw new Error(error);
    }
}

const service = {
    fetchAllIssues
}

export default service;